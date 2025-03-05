import { Candidate } from '../types';

// API key should be in .env file
const AFFINDA_API_KEY = process.env.REACT_APP_AFFINDA_API_KEY;
const AFFINDA_ENDPOINT = 'https://api.affinda.com/v3/documents';

export class CVParser {
  public static async parseCV(file: File): Promise<Partial<Candidate>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('wait', 'true'); // Wait for processing to complete
    formData.append('identifier', file.name); // Help identify the document

    const response = await fetch(AFFINDA_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${AFFINDA_API_KEY}`,
        // Don't set Content-Type header when using FormData
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to parse CV: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    
    // Affinda v3 returns data in a slightly different structure
    const parsed = data.data;
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: parsed.name?.raw,
      email: parsed.emails?.[0]?.raw,
      phone: parsed.phoneNumbers?.[0]?.raw,
      uploadDate: new Date(),
      status: 'new',
      skills: parsed.skills?.map((skill: any) => skill.name) || [],
      experience: parsed.workExperience?.map((exp: any) => ({
        company: exp.organization,
        position: exp.jobTitle,
        startDate: exp.datesEmployed?.start ? new Date(exp.datesEmployed.start) : null,
        endDate: exp.datesEmployed?.end ? new Date(exp.datesEmployed.end) : null,
        description: exp.jobDescription
      })) || [],
      education: parsed.education?.map((edu: any) => ({
        institution: edu.organization,
        degree: edu.accreditation?.education,
        field: edu.accreditation?.inputStr,
        graduationDate: edu.dates?.completionDate ? new Date(edu.dates.completionDate) : null
      })) || [],
      resumeUrl: URL.createObjectURL(file),
      salesExperience: this.extractSalesExperience(parsed.workExperience),
      internationalExperience: this.extractInternationalExperience(parsed.workExperience),
      score: this.calculateScore(parsed)
    };
  }

  private static extractSalesExperience(experience: any[]): string {
    const salesRoles = experience?.filter(exp => 
      exp.jobTitle?.toLowerCase().includes('sales') || 
      exp.jobDescription?.toLowerCase().includes('sales')
    );
    
    if (salesRoles?.length > 0) {
      const years = salesRoles.reduce((total, role) => {
        const start = new Date(role.startDate);
        const end = role.endDate ? new Date(role.endDate) : new Date();
        return total + (end.getFullYear() - start.getFullYear());
      }, 0);
      
      return `${years}+ years in sales at ${salesRoles[0].organization}`;
    }
    
    return 'No direct sales experience';
  }

  private static extractInternationalExperience(experience: any[]): string {
    const internationalRoles = experience?.filter(exp =>
      exp.location?.country !== 'South Africa' ||
      exp.jobDescription?.toLowerCase().includes('international') ||
      exp.jobDescription?.toLowerCase().includes('global')
    );

    return internationalRoles?.length > 0
      ? `Worked ${internationalRoles.length > 1 ? 'internationally' : `in ${internationalRoles[0].location?.country}`}`
      : 'Limited international exposure';
  }

  private static calculateScore(data: any): number {
    let score = 70; // Base score
    
    // Skills score (max 10 points)
    score += Math.min((data.skills?.length || 0) * 2, 10);
    
    // Experience score (max 10 points)
    const yearsExperience = data.workExperience?.length || 0;
    score += Math.min(yearsExperience * 2, 10);
    
    // Sales experience score (max 5 points)
    if (data.workExperience?.some((exp: any) => 
      exp.jobTitle?.toLowerCase().includes('sales') ||
      exp.jobDescription?.toLowerCase().includes('sales')
    )) {
      score += 5;
    }
    
    // International experience score (max 5 points)
    if (data.workExperience?.some((exp: any) => 
      exp.location?.country !== 'South Africa' ||
      exp.jobDescription?.toLowerCase().includes('international')
    )) {
      score += 5;
    }

    return Math.min(score, 100);
  }
} 