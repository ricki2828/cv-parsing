import { Candidate, JobDescription } from '../types';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Thabo Mbeki',
    email: 'thabo.mbeki@example.com',
    phone: '+27 71 234 5678',
    uploadDate: new Date('2023-05-15'),
    status: 'new',
    score: 85,
    skills: ['Customer Service', 'Sales', 'CRM Software', 'Problem Solving'],
    experience: [
      {
        company: 'Dash BPO',
        position: 'Sales Representative',
        startDate: new Date('2020-03-01'),
        endDate: null,
        description: 'Handled outbound sales calls for international clients including AT&T.'
      },
      {
        company: 'Teleperformance',
        position: 'Customer Service Agent',
        startDate: new Date('2018-06-01'),
        endDate: new Date('2020-02-28'),
        description: 'Provided customer support for a major UK telecom company.'
      }
    ],
    education: [
      {
        institution: 'University of Cape Town',
        degree: 'Bachelor',
        field: 'Business Administration',
        graduationDate: new Date('2018-04-30')
      }
    ],
    resumeUrl: '/resumes/thabo-mbeki.pdf',
    salesExperience: '3+ years at Dash BPO',
    internationalExperience: 'Handled AT&T as a client'
  },
  {
    id: '2',
    name: 'Lerato Khumalo',
    email: 'lerato.khumalo@example.com',
    phone: '+27 82 345 6789',
    uploadDate: new Date('2023-05-16'),
    status: 'yet-to-review',
    score: 78,
    skills: ['Call Center Operations', 'Microsoft Office', 'Conflict Resolution'],
    experience: [
      {
        company: 'Merchants',
        position: 'Team Leader',
        startDate: new Date('2019-01-15'),
        endDate: null,
        description: 'Led a team of 15 agents handling customer queries for Amazon.'
      },
      {
        company: 'CCI Global',
        position: 'Call Center Agent',
        startDate: new Date('2017-03-01'),
        endDate: new Date('2018-12-31'),
        description: 'Handled inbound customer service calls for Vodacom.'
      }
    ],
    education: [
      {
        institution: 'University of Johannesburg',
        degree: 'Diploma',
        field: 'Marketing',
        graduationDate: new Date('2017-01-30')
      }
    ],
    resumeUrl: '/resumes/lerato-khumalo.pdf',
    salesExperience: '2+ years at Merchants',
    internationalExperience: 'Worked with Amazon'
  },
  {
    id: '3',
    name: 'Sipho Nkosi',
    email: 'sipho.nkosi@example.com',
    phone: '+27 63 456 7890',
    uploadDate: new Date('2023-05-17'),
    status: 'reviewed',
    score: 92,
    skills: ['Sales', 'Customer Retention', 'Negotiation', 'Salesforce CRM'],
    experience: [
      {
        company: 'Webhelp',
        position: 'Senior Sales Consultant',
        startDate: new Date('2018-07-01'),
        endDate: null,
        description: 'Managed high-value customer accounts for British Airways and Virgin Atlantic.'
      },
      {
        company: 'iContact BPO',
        position: 'Sales Agent',
        startDate: new Date('2016-02-01'),
        endDate: new Date('2018-06-30'),
        description: 'Conducted outbound sales calls for various UK and US clients.'
      }
    ],
    education: [
      {
        institution: 'Stellenbosch University',
        degree: 'Bachelor',
        field: 'Communications',
        graduationDate: new Date('2015-12-15')
      }
    ],
    resumeUrl: '/resumes/sipho-nkosi.pdf',
    salesExperience: '5+ years across multiple BPOs',
    internationalExperience: 'Worked with UK and US clients'
  },
  {
    id: '4',
    name: 'Nomsa Dlamini',
    email: 'nomsa.dlamini@example.com',
    phone: '+27 74 567 8901',
    uploadDate: new Date('2023-05-18'),
    status: 'shortlisted',
    score: 88,
    skills: ['Customer Service', 'Technical Support', 'Troubleshooting', 'Zendesk'],
    experience: [
      {
        company: 'Outworx',
        position: 'Technical Support Specialist',
        startDate: new Date('2019-09-01'),
        endDate: null,
        description: 'Provided technical support for Telkom customers.'
      },
      {
        company: 'Capita',
        position: 'Customer Service Representative',
        startDate: new Date('2017-05-01'),
        endDate: new Date('2019-08-31'),
        description: 'Handled customer queries for O2, a UK mobile network operator.'
      }
    ],
    education: [
      {
        institution: 'Durban University of Technology',
        degree: 'Diploma',
        field: 'Information Technology',
        graduationDate: new Date('2017-03-30')
      }
    ],
    resumeUrl: '/resumes/nomsa-dlamini.pdf',
    salesExperience: '1+ year at Capita',
    internationalExperience: 'Worked with O2 (UK)'
  },
  {
    id: '5',
    name: 'Mandla Zulu',
    email: 'mandla.zulu@example.com',
    phone: '+27 65 678 9012',
    uploadDate: new Date('2023-05-19'),
    status: 'not-suitable-role',
    score: 65,
    skills: ['Data Entry', 'Administrative Support', 'Microsoft Excel'],
    experience: [
      {
        company: 'Sigma Connected',
        position: 'Administrative Assistant',
        startDate: new Date('2020-01-15'),
        endDate: null,
        description: 'Provided administrative support to the operations team.'
      },
      {
        company: 'WNS Global Services',
        position: 'Data Entry Clerk',
        startDate: new Date('2018-08-01'),
        endDate: new Date('2019-12-31'),
        description: 'Processed customer data for insurance clients.'
      }
    ],
    education: [
      {
        institution: 'Tshwane University of Technology',
        degree: 'Certificate',
        field: 'Office Administration',
        graduationDate: new Date('2018-06-30')
      }
    ],
    resumeUrl: '/resumes/mandla-zulu.pdf',
    salesExperience: 'No direct sales experience',
    internationalExperience: 'Limited international client exposure'
  }
];

export const mockJobDescriptions: JobDescription[] = [
  {
    id: '1',
    title: 'Sales Representative - Outbound',
    description: 'We are seeking motivated Sales Representatives to join our outbound sales team. The ideal candidate will have excellent communication skills and a passion for sales.',
    requirements: [
      'Minimum 1 year of sales experience',
      'Excellent communication skills',
      'Ability to work in shifts',
      'Computer literacy',
      'Matric certificate'
    ],
    responsibilities: [
      'Make outbound sales calls to potential customers',
      'Meet and exceed sales targets',
      'Maintain accurate records of all sales activities',
      'Follow up with customers to ensure satisfaction',
      'Stay updated on product knowledge'
    ],
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-05-10')
  },
  {
    id: '2',
    title: 'Customer Service Agent - Inbound',
    description: 'Join our team of customer service professionals handling inbound calls for international clients. This role requires excellent problem-solving skills and patience.',
    requirements: [
      'Previous customer service experience preferred',
      'Excellent communication skills in English',
      'Problem-solving abilities',
      'Ability to work in shifts including weekends',
      'Computer literacy'
    ],
    responsibilities: [
      'Handle inbound customer queries professionally',
      'Resolve customer complaints and issues',
      'Process customer requests according to procedures',
      'Maintain high quality standards in all customer interactions',
      'Document all call information according to standards'
    ],
    createdAt: new Date('2023-05-12'),
    updatedAt: new Date('2023-05-14')
  }
];