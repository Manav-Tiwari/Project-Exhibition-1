export const applications = [
    {
        id: 'app001',
        jobId: 'job101',
        applicantId: 'user001',
        status: 'Interviewing',
        appliedDate: '2024-01-20',
        lastUpdated: '2024-01-25',
        matchScore: 92,
        matchAnalysis: {
            skills: {
                matched: ['React', 'CSS', 'JavaScript', 'HTML', 'Git'],
                missing: ['TypeScript', 'Tailwind CSS'],
                score: 85
            },
            experience: {
                matched: true,
                years: 3,
                required: '2-5 years',
                score: 90
            },
            location: {
                matched: true,
                applicant: 'San Francisco, CA',
                job: 'San Francisco, CA',
                score: 100
            },
            remote: {
                matched: true,
                applicant: true,
                job: true,
                score: 100
            },
            overall: {
                score: 92,
                strengths: ['Strong frontend development experience', 'Perfect location match', 'Remote work preference aligned'],
                areas: ['Could benefit from TypeScript experience', 'Tailwind CSS knowledge would be a plus'],
                recommendation: 'Strong candidate with excellent technical skills and perfect location/remote alignment'
            }
        },
        recruiterNotes: 'Excellent technical background, strong communication skills. Moving to technical assessment.',
        nextStep: 'Technical Assessment',
        scheduledDate: '2024-01-30'
    },
    {
        id: 'app002',
        jobId: 'job102',
        applicantId: 'user002',
        status: 'Shortlisted',
        appliedDate: '2024-01-18',
        lastUpdated: '2024-01-22',
        matchScore: 95,
        matchAnalysis: {
            skills: {
                matched: ['Python', 'SQL', 'PyTorch', 'NLP', 'Machine Learning', 'Data Analysis'],
                missing: [],
                score: 100
            },
            experience: {
                matched: true,
                years: 5,
                required: '3-7 years',
                score: 95
            },
            location: {
                matched: true,
                applicant: 'New York, NY',
                job: 'New York, NY',
                score: 100
            },
            remote: {
                matched: true,
                applicant: true,
                job: true,
                score: 100
            },
            overall: {
                score: 95,
                strengths: ['Perfect skill match', 'Strong experience level', 'Excellent location alignment'],
                areas: ['Could showcase more leadership experience'],
                recommendation: 'Exceptional candidate with perfect skill alignment and strong experience'
            }
        },
        recruiterNotes: 'Outstanding candidate with perfect skill match. Strong technical background and communication.',
        nextStep: 'Take-home Project',
        scheduledDate: '2024-01-28'
    },
    {
        id: 'app003',
        jobId: 'job103',
        applicantId: 'user003',
        status: 'Applied',
        appliedDate: '2024-01-19',
        lastUpdated: '2024-01-19',
        matchScore: 88,
        matchAnalysis: {
            skills: {
                matched: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'AWS'],
                missing: ['Microservices'],
                score: 80
            },
            experience: {
                matched: true,
                years: 7,
                required: '5-10 years',
                score: 95
            },
            location: {
                matched: false,
                applicant: 'Austin, TX',
                job: 'Austin, TX',
                score: 100
            },
            remote: {
                matched: false,
                applicant: true,
                job: false,
                score: 50
            },
            overall: {
                score: 88,
                strengths: ['Strong technical skills', 'Excellent experience level', 'Perfect location match'],
                areas: ['Microservices experience could be stronger', 'Remote work preference mismatch'],
                recommendation: 'Strong technical candidate with excellent experience, but remote work preference may be a concern'
            }
        },
        recruiterNotes: 'Strong technical background, but remote work preference may be an issue for this role.',
        nextStep: 'Phone Screen',
        scheduledDate: '2024-01-26'
    },
    {
        id: 'app004',
        jobId: 'job101',
        applicantId: 'user002',
        status: 'Rejected',
        appliedDate: '2024-01-16',
        lastUpdated: '2024-01-20',
        matchScore: 45,
        matchAnalysis: {
            skills: {
                matched: ['JavaScript', 'CSS', 'HTML'],
                missing: ['React', 'TypeScript', 'Tailwind CSS'],
                score: 30
            },
            experience: {
                matched: false,
                years: 5,
                required: '2-5 years',
                score: 70
            },
            location: {
                matched: false,
                applicant: 'New York, NY',
                job: 'San Francisco, CA',
                score: 60
            },
            remote: {
                matched: true,
                applicant: true,
                job: true,
                score: 100
            },
            overall: {
                score: 45,
                strengths: ['Remote work preference aligned', 'Basic web development skills'],
                areas: ['Missing key frontend framework experience', 'Location mismatch', 'Overqualified for role'],
                recommendation: 'Candidate has strong data science background but lacks frontend development experience needed for this role'
            }
        },
        recruiterNotes: 'Candidate is overqualified and lacks required frontend development experience. Better fit for data science roles.',
        nextStep: 'Rejected',
        scheduledDate: null
    },
    {
        id: 'app005',
        jobId: 'job102',
        applicantId: 'user001',
        status: 'Applied',
        appliedDate: '2024-01-21',
        lastUpdated: '2024-01-21',
        matchScore: 35,
        matchAnalysis: {
            skills: {
                matched: ['JavaScript', 'SQL'],
                missing: ['Python', 'PyTorch', 'NLP', 'Machine Learning', 'Data Analysis'],
                score: 20
            },
            experience: {
                matched: false,
                years: 3,
                required: '3-7 years',
                score: 60
            },
            location: {
                matched: false,
                applicant: 'San Francisco, CA',
                job: 'New York, NY',
                score: 60
            },
            remote: {
                matched: true,
                applicant: true,
                job: true,
                score: 100
            },
            overall: {
                score: 35,
                strengths: ['Remote work preference aligned', 'Basic programming knowledge'],
                areas: ['Missing data science skills', 'Insufficient experience', 'Location mismatch'],
                recommendation: 'Candidate lacks the required data science background and experience for this role'
            }
        },
        recruiterNotes: 'Candidate does not meet the minimum requirements for this data science position.',
        nextStep: 'Rejected',
        scheduledDate: null
    },
    {
        id: 'app006',
        jobId: 'job104',
        applicantId: 'user001',
        status: 'Applied',
        appliedDate: '2024-01-22',
        lastUpdated: '2024-01-22',
        matchScore: 25,
        matchAnalysis: {
            skills: {
                matched: [],
                missing: ['Product Management', 'Agile', 'Data Analysis', 'User Research', 'Strategy'],
                score: 0
            },
            experience: {
                matched: false,
                years: 3,
                required: '4-8 years',
                score: 40
            },
            location: {
                matched: false,
                applicant: 'San Francisco, CA',
                job: 'Seattle, WA',
                score: 60
            },
            remote: {
                matched: true,
                applicant: true,
                job: true,
                score: 100
            },
            overall: {
                score: 25,
                strengths: ['Remote work preference aligned'],
                areas: ['No product management experience', 'Insufficient years of experience', 'Location mismatch'],
                recommendation: 'Candidate lacks the required product management background and experience for this role'
            }
        },
        recruiterNotes: 'Candidate does not have the required product management experience.',
        nextStep: 'Rejected',
        scheduledDate: null
    }
];
