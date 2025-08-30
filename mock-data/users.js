export const users = [
    {
        id: 'user001',
        name: 'Manav Tiwari',
        email: 'manav.tiwari@email.com',
        role: 'Job Seeker',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        location: 'San Francisco, CA',
        experience: '3 years',
        education: 'Bachelor in Computer Science',
        resumeData: {
            skills: ['React', 'JavaScript', 'CSS', 'Node.js', 'SQL', 'TypeScript', 'Git', 'REST APIs'],
            experience: [
                {
                    company: 'TechCorp',
                    position: 'Frontend Developer',
                    duration: '2 years',
                    description: 'Built responsive web applications using React and modern JavaScript.'
                },
                {
                    company: 'StartupXYZ',
                    position: 'Junior Developer',
                    duration: '1 year',
                    description: 'Developed features for a SaaS platform using Node.js and React.'
                }
            ],
            education: [
                {
                    degree: 'Bachelor of Science',
                    field: 'Computer Science',
                    school: 'University of California',
                    year: '2021'
                }
            ],
            certifications: ['AWS Certified Developer', 'React Certification'],
            languages: ['English', 'Hindi'],
            interests: ['Machine Learning', 'Open Source', 'Web Development']
        },
        preferences: {
            remoteWork: true,
            relocation: false,
            salaryRange: '$80,000 - $120,000',
            jobTypes: ['Full-time', 'Contract'],
            industries: ['Technology', 'SaaS', 'E-commerce']
        }
    },
    {
        id: 'user002',
        name: 'Sarah Chen',
        email: 'sarah.chen@email.com',
        role: 'Job Seeker',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        location: 'New York, NY',
        experience: '5 years',
        education: 'Master in Data Science',
        resumeData: {
            skills: ['Python', 'SQL', 'PyTorch', 'NLP', 'Machine Learning', 'Data Analysis', 'Pandas', 'Scikit-learn'],
            experience: [
                {
                    company: 'DataInsights Inc',
                    position: 'Senior Data Scientist',
                    duration: '3 years',
                    description: 'Led machine learning projects and developed predictive models.'
                },
                {
                    company: 'Analytics Corp',
                    position: 'Data Analyst',
                    duration: '2 years',
                    description: 'Performed data analysis and created dashboards for business insights.'
                }
            ],
            education: [
                {
                    degree: 'Master of Science',
                    field: 'Data Science',
                    school: 'Columbia University',
                    year: '2019'
                }
            ],
            certifications: ['Google Data Analytics', 'AWS Machine Learning'],
            languages: ['English', 'Mandarin'],
            interests: ['AI Research', 'Data Visualization', 'Ethical AI']
        },
        preferences: {
            remoteWork: true,
            relocation: true,
            salaryRange: '$100,000 - $150,000',
            jobTypes: ['Full-time'],
            industries: ['Technology', 'Finance', 'Healthcare']
        }
    },
    {
        id: 'user003',
        name: 'Michael Rodriguez',
        email: 'michael.rodriguez@email.com',
        role: 'Job Seeker',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        location: 'Austin, TX',
        experience: '7 years',
        education: 'Bachelor in Engineering',
        resumeData: {
            skills: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Agile'],
            experience: [
                {
                    company: 'Enterprise Solutions',
                    position: 'Senior Backend Engineer',
                    duration: '4 years',
                    description: 'Designed and implemented microservices architecture for enterprise applications.'
                },
                {
                    company: 'Tech Startup',
                    position: 'Full Stack Developer',
                    duration: '3 years',
                    description: 'Built scalable web applications using Java and modern frameworks.'
                }
            ],
            education: [
                {
                    degree: 'Bachelor of Engineering',
                    field: 'Computer Engineering',
                    school: 'University of Texas',
                    year: '2017'
                }
            ],
            certifications: ['AWS Solutions Architect', 'Kubernetes Administrator'],
            languages: ['English', 'Spanish'],
            interests: ['System Design', 'Cloud Architecture', 'DevOps']
        },
        preferences: {
            remoteWork: false,
            relocation: true,
            salaryRange: '$120,000 - $180,000',
            jobTypes: ['Full-time'],
            industries: ['Technology', 'Finance', 'Healthcare']
        }
    },
    {
        id: 'recruiter001',
        name: 'Jane Recruiter',
        email: 'jane.recruiter@techsolutions.com',
        role: 'Recruiter',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        company: 'Tech Solutions Inc.',
        position: 'Senior Technical Recruiter',
        department: 'Human Resources',
        permissions: ['view_candidates', 'manage_jobs', 'view_analytics', 'send_messages']
    },
    {
        id: 'recruiter002',
        name: 'David Kim',
        email: 'david.kim@datainsights.com',
        role: 'Recruiter',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        company: 'Data Insights LLC',
        position: 'Talent Acquisition Specialist',
        department: 'Recruitment',
        permissions: ['view_candidates', 'manage_jobs', 'view_analytics']
    },
    {
        id: 'recruiter003',
        name: 'Emily Watson',
        email: 'emily.watson@innovatecorp.com',
        role: 'Recruiter',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        company: 'InnovateCorp',
        position: 'HR Manager',
        department: 'Human Resources',
        permissions: ['view_candidates', 'manage_jobs', 'view_analytics', 'manage_users', 'send_messages']
    }
];
