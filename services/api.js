import { users, jobs, applications, analytics } from '../mock-data/index.js';

// Simulate network delay
const simulateDelay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate API errors (5% chance)
const simulateError = () => {
    if (Math.random() < 0.05) {
        throw new Error('Simulated API error');
    }
};

// User-related API calls
export async function getCurrentUser() {
    await simulateDelay();
    simulateError();
    // Simulate logged-in user (Manav Tiwari)
    return users.find(user => user.id === 'user001');
}

export async function getUserById(userId) {
    await simulateDelay();
    simulateError();
    return users.find(user => user.id === userId);
}

export async function updateUserProfile(userId, updates) {
    await simulateDelay();
    simulateError();
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        return users[userIndex];
    }
    throw new Error('User not found');
}

// Job-related API calls
export async function getJobs(filters = {}) {
    await simulateDelay();
    simulateError();
    
    let filteredJobs = [...jobs];
    
    if (filters.location) {
        filteredJobs = filteredJobs.filter(job => 
            job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
    }
    
    if (filters.type) {
        filteredJobs = filteredJobs.filter(job => job.type === filters.type);
    }
    
    if (filters.remote !== undefined) {
        filteredJobs = filteredJobs.filter(job => job.remote === filters.remote);
    }
    
    if (filters.skills && filters.skills.length > 0) {
        filteredJobs = filteredJobs.filter(job =>
            filters.skills.some(skill => 
                job.requiredSkills.some(requiredSkill => 
                    requiredSkill.toLowerCase().includes(skill.toLowerCase())
                )
            )
        );
    }
    
    return filteredJobs;
}

export async function getJobById(jobId) {
    await simulateDelay();
    simulateError();
    return jobs.find(job => job.id === jobId);
}

export async function getRecommendedJobs(userId, limit = 5) {
    await simulateDelay();
    simulateError();
    
    const user = users.find(u => u.id === userId);
    if (!user || user.role !== 'Job Seeker') {
        return [];
    }
    
    const userSkills = user.resumeData.skills;
    
    // Calculate match scores for each job
    const scoredJobs = jobs.map(job => {
        const skillMatch = userSkills.filter(skill => 
            job.requiredSkills.some(requiredSkill => 
                requiredSkill.toLowerCase().includes(skill.toLowerCase())
            )
        ).length;
        
        const skillScore = (skillMatch / job.requiredSkills.length) * 100;
        
        // Bonus for location match
        const locationBonus = user.location === job.location ? 20 : 0;
        
        // Bonus for remote work preference
        const remoteBonus = user.preferences.remoteWork === job.remote ? 15 : 0;
        
        const totalScore = Math.min(100, skillScore + locationBonus + remoteBonus);
        
        return { ...job, matchScore: Math.round(totalScore) };
    });
    
    // Sort by match score and return top matches
    return scoredJobs
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, limit);
}

export async function searchJobs(query, filters = {}) {
    await simulateDelay();
    simulateError();
    
    let results = [...jobs];
    
    if (query) {
        const searchTerms = query.toLowerCase().split(' ');
        results = results.filter(job =>
            searchTerms.some(term =>
                job.title.toLowerCase().includes(term) ||
                job.company.toLowerCase().includes(term) ||
                job.description.toLowerCase().includes(term) ||
                job.requiredSkills.some(skill => skill.toLowerCase().includes(term))
            )
        );
    }
    
    // Apply additional filters
    if (filters.location) {
        results = results.filter(job => 
            job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
    }
    
    if (filters.type) {
        results = results.filter(job => job.type === filters.type);
    }
    
    if (filters.remote !== undefined) {
        results = results.filter(job => job.remote === filters.remote);
    }
    
    if (filters.salary) {
        results = results.filter(job => {
            const jobSalary = parseInt(job.salary.split('-')[1].replace(/[$,]/g, ''));
            return jobSalary >= filters.salary;
        });
    }
    
    return results;
}

// Application-related API calls
export async function getApplicationsByUser(userId) {
    await simulateDelay();
    simulateError();
    return applications.filter(app => app.applicantId === userId);
}

export async function getApplicationsByJob(jobId) {
    await simulateDelay();
    simulateError();
    return applications.filter(app => app.jobId === jobId);
}

export async function getApplicantsForJob(jobId) {
    await simulateDelay();
    simulateError();
    
    const jobApplications = applications.filter(app => app.jobId === jobId);
    
    // Enrich applications with user data and sort by match score
    const enrichedApplications = jobApplications.map(app => {
        const user = users.find(u => u.id === app.applicantId);
        return {
            ...app,
            user: user,
            job: jobs.find(j => j.id === jobId)
        };
    });
    
    return enrichedApplications.sort((a, b) => b.matchScore - a.matchScore);
}

export async function submitApplication(jobId, userId, coverLetter = '') {
    await simulateDelay();
    simulateError();
    
    // Check if application already exists
    const existingApp = applications.find(app => 
        app.jobId === jobId && app.applicantId === userId
    );
    
    if (existingApp) {
        throw new Error('Application already submitted');
    }
    
    // Create new application
    const newApplication = {
        id: `app${Date.now()}`,
        jobId,
        applicantId: userId,
        status: 'Applied',
        appliedDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        coverLetter,
        matchScore: 0, // Will be calculated by AI
        matchAnalysis: null,
        recruiterNotes: '',
        nextStep: 'Screening',
        scheduledDate: null
    };
    
    applications.push(newApplication);
    return newApplication;
}

export async function updateApplicationStatus(applicationId, status, notes = '') {
    await simulateDelay();
    simulateError();
    
    const appIndex = applications.findIndex(app => app.id === applicationId);
    if (appIndex === -1) {
        throw new Error('Application not found');
    }
    
    applications[appIndex] = {
        ...applications[appIndex],
        status,
        lastUpdated: new Date().toISOString().split('T')[0],
        recruiterNotes: notes
    };
    
    return applications[appIndex];
}

// Analytics and dashboard data
export async function getDashboardMetrics(userId) {
    await simulateDelay();
    simulateError();
    
    const user = users.find(u => u.id === userId);
    if (!user) {
        throw new Error('User not found');
    }
    
    if (user.role === 'Recruiter') {
        return {
            totalCandidates: analytics.recruiter.totalCandidates,
            activeJobs: analytics.recruiter.activeJobs,
            applicationsThisMonth: analytics.recruiter.applicationsThisMonth,
            averageTimeToHire: analytics.recruiter.averageTimeToHire,
            candidateQuality: analytics.recruiter.candidateQuality,
            interviewScheduled: analytics.recruiter.interviewScheduled,
            offersSent: analytics.recruiter.offersSent,
            hires: analytics.recruiter.hires
        };
    } else {
        // Job seeker metrics
        const userApplications = applications.filter(app => app.applicantId === userId);
        const activeApplications = userApplications.filter(app => 
            ['Applied', 'Screened', 'Interviewing', 'Shortlisted'].includes(app.status)
        );
        
        return {
            totalApplications: userApplications.length,
            activeApplications: activeApplications.length,
            interviewsScheduled: userApplications.filter(app => 
                app.status === 'Interviewing' || app.status === 'Shortlisted'
            ).length,
            averageMatchScore: userApplications.length > 0 
                ? Math.round(userApplications.reduce((sum, app) => sum + app.matchScore, 0) / userApplications.length)
                : 0,
            recentActivity: userApplications
                .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
                .slice(0, 5)
        };
    }
}

export async function getAnalyticsData(type, filters = {}) {
    await simulateDelay();
    simulateError();
    
    switch (type) {
        case 'candidateFunnel':
            return analytics.candidateFunnel;
        case 'skillsDemand':
            return analytics.skillsDemand;
        case 'applicationTrends':
            return analytics.applicationTrends;
        case 'geographicData':
            return analytics.geographicData;
        case 'industryBreakdown':
            return analytics.industryBreakdown;
        case 'matchScoreDistribution':
            return analytics.matchScoreDistribution;
        case 'timeToHire':
            return analytics.timeToHire;
        case 'candidateSatisfaction':
            return analytics.candidateSatisfaction;
        case 'recruiterSatisfaction':
            return analytics.recruiterSatisfaction;
        case 'costPerHire':
            return analytics.costPerHire;
        case 'aiMatching':
            return analytics.aiMatching;
        default:
            throw new Error('Invalid analytics type');
    }
}

export async function getJobAnalytics(jobId) {
    await simulateDelay();
    simulateError();
    
    return analytics.jobAnalytics[jobId] || null;
}

// Match analysis
export async function getMatchAnalysis(jobId, userId) {
    await simulateDelay();
    simulateError();
    
    const application = applications.find(app => 
        app.jobId === jobId && app.applicantId === userId
    );
    
    if (!application) {
        throw new Error('Application not found');
    }
    
    return application.matchAnalysis;
}

// Notifications
export async function getNotifications(userId) {
    await simulateDelay();
    simulateError();
    
    // Simulate notifications based on user activity
    const user = users.find(u => u.id === userId);
    if (!user) return [];
    
    if (user.role === 'Job Seeker') {
        const userApplications = applications.filter(app => app.applicantId === userId);
        return userApplications
            .filter(app => app.status !== 'Applied')
            .map(app => ({
                id: `notif_${app.id}`,
                type: 'application_update',
                title: `Application Update: ${app.status}`,
                message: `Your application for ${jobs.find(j => j.id === app.jobId)?.title} has been updated to ${app.status}`,
                timestamp: new Date().toISOString(),
                read: false,
                applicationId: app.id
            }));
    } else {
        // Recruiter notifications
        return [
            {
                id: 'notif_001',
                type: 'new_application',
                title: 'New Application Received',
                message: 'A new candidate has applied for Frontend Developer position',
                timestamp: new Date().toISOString(),
                read: false
            },
            {
                id: 'notif_002',
                type: 'interview_scheduled',
                title: 'Interview Scheduled',
                message: 'Interview scheduled with Manav Tiwari for tomorrow',
                timestamp: new Date().toISOString(),
                read: false
            }
        ];
    }
}

// Search and filters
export async function getSearchSuggestions(query) {
    await simulateDelay();
    simulateError();
    
    if (!query || query.length < 2) return [];
    
    const suggestions = [];
    
    // Job title suggestions
    const jobTitles = [...new Set(jobs.map(job => job.title))];
    jobTitles.forEach(title => {
        if (title.toLowerCase().includes(query.toLowerCase())) {
            suggestions.push({ type: 'job_title', value: title });
        }
    });
    
    // Company suggestions
    const companies = [...new Set(jobs.map(job => job.company))];
    companies.forEach(company => {
        if (company.toLowerCase().includes(query.toLowerCase())) {
            suggestions.push({ type: 'company', value: company });
        }
    });
    
    // Skill suggestions
    const allSkills = [...new Set(jobs.flatMap(job => job.requiredSkills))];
    allSkills.forEach(skill => {
        if (skill.toLowerCase().includes(query.toLowerCase())) {
            suggestions.push({ type: 'skill', value: skill });
        }
    });
    
    return suggestions.slice(0, 10);
}
