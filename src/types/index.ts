export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  uploadDate: Date;
  status: CandidateStatus;
  score: number;
  skills: string[];
  experience: Experience[];
  education: Education[];
  resumeUrl: string;
  salesExperience: string;
  internationalExperience: string;
}

export type CandidateStatus = 
  | 'new'
  | 'yet-to-review'
  | 'reviewed'
  | 'shortlisted'
  | 'not-suitable-role'
  | 'not-suitable-any'
  | 'potential-star';

export interface Experience {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationDate: Date;
}

export interface JobDescription {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ScoringCriteria {
  salesExperience: number;
  internationalExperience: number;
  tenure: number;
  technicalSkills: number;
  softSkills: number;
}