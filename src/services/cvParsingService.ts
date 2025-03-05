import { Candidate } from '../types';

// This would be replaced with a real API call in production
const API_ENDPOINT = '/api/parse-cv';

/**
 * Parses a CV file and extracts candidate information
 */
export async function parseCV(file: File): Promise<Partial<Candidate>> {
  // In a real implementation, you would upload the file to a server
  // and get back structured data. For now, we'll simulate this process.
  
  if (process.env.NODE_ENV === 'production') {
    // In production, make a real API call
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Failed to parse CV: ${response.statusText}`);
    }
    
    return await response.json();
  } else {
    // In development, simulate parsing with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Extract filename without extension to use as name
        const fileName = file.name.replace(/\.[^/.]+$/, "");
        const name = fileName
          .split(/[-_]/)
          .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
          .join(' ');
        
        // Generate random data based on the file
        resolve({
          id: Math.random().toString(36).substring(2, 11),
          name,
          email: `${name.toLowerCase().replace(/\s/g, '.')}@example.com`,
          phone: `+27 ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 9000 + 1000)}`,
          uploadDate: new Date(),
          status: 'new',
          score: Math.floor(Math.random() * 30) + 70, // Score between 70-100
          skills: [
            'Customer Service',
            'Sales',
            'Communication',
            'Problem Solving',
            'Microsoft Office'
          ].sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 2)),
          experience: [
            {
              company: ['Webhelp', 'Teleperformance', 'Merchants', 'CCI Global', 'iContact BPO'][Math.floor(Math.random() * 5)],
              position: ['Sales Representative', 'Customer Service Agent', 'Team Leader', 'Technical Support Specialist'][Math.floor(Math.random() * 4)],
              startDate: new Date(2018 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), 1),
              endDate: Math.random() > 0.7 ? null : new Date(2022, Math.floor(Math.random() * 12), 1),
              description: 'Handled customer interactions for international clients.'
            }
          ],
          education: [
            {
              institution: ['University of Cape Town', 'University of Johannesburg', 'Stellenbosch University', 'Durban University of Technology'][Math.floor(Math.random() * 4)],
              degree: ['Bachelor', 'Diploma', 'Certificate'][Math.floor(Math.random() * 3)],
              field: ['Business Administration', 'Marketing', 'Communications', 'Information Technology'][Math.floor(Math.random() * 4)],
              graduationDate: new Date(2015 + Math.floor(Math.random() * 7), Math.floor(Math.random() * 12), 15)
            }
          ],
          resumeUrl: URL.createObjectURL(file), // Create a local URL for the file
          salesExperience: `${1 + Math.floor(Math.random() * 5)}+ years in ${['sales', 'customer service', 'account management'][Math.floor(Math.random() * 3)]}`,
          internationalExperience: Math.random() > 0.3 ? 'Worked with international clients' : 'Limited international exposure'
        });
      }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    });
  }
}

/**
 * Batch processes multiple CV files
 */
export async function parseCVs(files: File[]): Promise<Partial<Candidate>[]> {
  const results: Partial<Candidate>[] = [];
  
  for (const file of files) {
    try {
      const candidate = await parseCV(file);
      results.push(candidate);
    } catch (error) {
      console.error(`Error parsing ${file.name}:`, error);
      // Continue with other files even if one fails
    }
  }
  
  return results;
} 