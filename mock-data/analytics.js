export const analytics = {
    // Overall platform metrics
    platform: {
        totalUsers: 15420,
        totalJobs: 892,
        totalApplications: 12450,
        activeRecruiters: 156,
        averageResponseTime: '2.3 days',
        successRate: '78%'
    },
    
    // Recruiter dashboard metrics
    recruiter: {
        totalCandidates: 12450,
        activeJobs: 892,
        applicationsThisMonth: 2340,
        averageTimeToHire: '18 days',
        candidateQuality: '8.7/10',
        interviewScheduled: 156,
        offersSent: 89,
        hires: 67
    },
    
    // Job-specific analytics
    jobAnalytics: {
        'job101': {
            views: 1240,
            applications: 24,
            qualifiedCandidates: 18,
            averageMatchScore: 76.5,
            timeToFill: '12 days',
            sourceBreakdown: {
                'ResumeBERT AI': 45,
                'Direct Application': 30,
                'Referral': 15,
                'Other': 10
            }
        },
        'job102': {
            views: 890,
            applications: 18,
            qualifiedCandidates: 14,
            averageMatchScore: 82.3,
            timeToFill: '15 days',
            sourceBreakdown: {
                'ResumeBERT AI': 60,
                'Direct Application': 25,
                'Referral': 10,
                'Other': 5
            }
        },
        'job103': {
            views: 650,
            applications: 15,
            qualifiedCandidates: 12,
            averageMatchScore: 79.1,
            timeToFill: '20 days',
            sourceBreakdown: {
                'ResumeBERT AI': 50,
                'Direct Application': 35,
                'Referral': 10,
                'Other': 5
            }
        }
    },
    
    // Candidate funnel data for charts
    candidateFunnel: {
        labels: ['Applied', 'Screened', 'Interviewed', 'Shortlisted', 'Offered', 'Hired'],
        data: [12450, 8900, 4450, 1780, 890, 670],
        colors: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#059669']
    },
    
    // Skills demand analysis
    skillsDemand: {
        labels: ['React', 'Python', 'Java', 'Machine Learning', 'AWS', 'Docker', 'TypeScript', 'SQL'],
        demand: [85, 78, 72, 68, 65, 58, 55, 52],
        growth: [12, 18, 8, 25, 15, 22, 20, 10]
    },
    
    // Application trends over time
    applicationTrends: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        applications: [1200, 1350, 1420, 1580, 1680, 1750, 1820, 1890, 1950, 2010, 2080, 2150],
        hires: [85, 92, 98, 105, 112, 118, 125, 132, 138, 145, 152, 158]
    },
    
    // Geographic distribution
    geographicData: {
        labels: ['San Francisco', 'New York', 'Austin', 'Seattle', 'Los Angeles', 'Boston', 'Chicago', 'Denver'],
        applications: [2850, 2340, 1890, 1650, 1420, 1280, 1150, 980],
        hires: [198, 164, 132, 115, 99, 89, 80, 68]
    },
    
    // Industry breakdown
    industryBreakdown: {
        labels: ['Technology', 'Finance', 'Healthcare', 'E-commerce', 'Education', 'Manufacturing', 'Consulting', 'Other'],
        data: [45, 18, 15, 12, 6, 3, 2, 1]
    },
    
    // Match score distribution
    matchScoreDistribution: {
        labels: ['90-100%', '80-89%', '70-79%', '60-69%', '50-59%', '40-49%', '30-39%', '20-29%', '10-19%', '0-9%'],
        data: [15, 25, 30, 20, 8, 2, 0, 0, 0, 0]
    },
    
    // Time to hire by role
    timeToHire: {
        labels: ['Frontend Dev', 'Backend Dev', 'Data Scientist', 'Product Manager', 'UX Designer', 'DevOps Engineer'],
        averageDays: [14, 18, 22, 25, 16, 20]
    },
    
    // Candidate satisfaction scores
    candidateSatisfaction: {
        overall: 8.7,
        categories: {
            'Application Process': 8.5,
            'Communication': 8.8,
            'Interview Experience': 8.6,
            'Job Match Quality': 8.9,
            'Platform Usability': 8.7
        }
    },
    
    // Recruiter satisfaction scores
    recruiterSatisfaction: {
        overall: 8.9,
        categories: {
            'Candidate Quality': 9.1,
            'AI Matching': 8.8,
            'Platform Features': 8.7,
            'Support': 9.0,
            'Time Savings': 9.2
        }
    },
    
    // Cost per hire analysis
    costPerHire: {
        average: 4500,
        byRole: {
            'Frontend Developer': 3800,
            'Backend Developer': 4200,
            'Data Scientist': 5200,
            'Product Manager': 4800,
            'UX Designer': 3900
        },
        savings: {
            'Traditional Method': 8500,
            'ResumeBERT': 4500,
            'Savings': '47%'
        }
    },
    
    // AI matching accuracy
    aiMatching: {
        overallAccuracy: '87%',
        byCategory: {
            'Skills Match': '92%',
            'Experience Match': '89%',
            'Location Match': '95%',
            'Culture Fit': '78%',
            'Salary Alignment': '82%'
        },
        improvement: {
            'Traditional Screening': '45%',
            'ResumeBERT AI': '87%',
            'Improvement': '93%'
        }
    }
};
