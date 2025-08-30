// Recruiter Dashboard JavaScript - handles analytics, charts, and recruiter-specific functionality
import { 
    getCurrentUser, 
    getJobs, 
    getAnalyticsData,
    getDashboardMetrics 
} from '../services/api.js';

class RecruiterDashboard {
    constructor() {
        this.currentUser = null;
        this.funnelChart = null;
        this.skillsDemandChart = null;
        this.init();
    }

    async init() {
        try {
            // Load current user
            this.currentUser = await getCurrentUser();
            
            // Initialize dashboard
            await this.initializeDashboard();
            
            // Initialize charts
            this.initializeCharts();
            
            // Set up event listeners
            this.setupEventListeners();
            
        } catch (error) {
            console.error('Failed to initialize recruiter dashboard:', error);
            this.showError('Failed to load dashboard data');
        }
    }

    async initializeDashboard() {
        try {
            // Load dashboard metrics
            const metrics = await getDashboardMetrics(this.currentUser.id);
            this.updateDashboardMetrics(metrics);
            
            // Load active jobs
            const activeJobs = await getJobs({ status: 'Active' });
            this.renderActiveJobs(activeJobs.slice(0, 5));
            
            // Load recent applications (mock data for now)
            this.renderRecentApplications();
            
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        }
    }

    updateDashboardMetrics(metrics) {
        // Update stats cards
        const totalCandidates = document.getElementById('total-candidates');
        const activeJobs = document.getElementById('active-jobs');
        const interviewsScheduled = document.getElementById('interviews-scheduled');
        const hires = document.getElementById('hires');
        
        if (totalCandidates) totalCandidates.textContent = metrics.totalCandidates?.toLocaleString() || '12,450';
        if (activeJobs) activeJobs.textContent = metrics.activeJobs || '892';
        if (interviewsScheduled) interviewsScheduled.textContent = metrics.interviewScheduled || '156';
        if (hires) hires.textContent = metrics.hires || '67';
    }

    renderActiveJobs(jobs) {
        const container = document.getElementById('active-jobs-list');
        if (!container) return;
        
        if (jobs.length === 0) {
            container.innerHTML = `
                <div class="no-jobs">
                    <i data-lucide="briefcase" style="width: 48px; height: 48px; color: var(--gray-400);"></i>
                    <h3>No active jobs</h3>
                    <p>Post your first job to start receiving applications</p>
                    <a href="post-job.html" class="btn btn-primary">Post New Job</a>
                </div>
            `;
            return;
        }
        
        const jobsHTML = jobs.map(job => this.createJobPostingCard(job)).join('');
        container.innerHTML = jobsHTML;
        
        // Initialize icons for new elements
        this.initializeIcons();
    }

    createJobPostingCard(job) {
        return `
            <div class="job-posting-card" data-job-id="${job.id}">
                <div class="job-posting-header">
                    <div class="job-posting-title">
                        <h3>${job.title}</h3>
                        <p class="job-posting-company">${job.company}</p>
                        <div class="job-posting-location">
                            <i data-lucide="map-pin"></i>
                            <span>${job.location}</span>
                        </div>
                    </div>
                    <div class="job-posting-status">
                        <span class="status-badge active">Active</span>
                    </div>
                </div>
                
                <div class="job-posting-stats">
                    <div class="job-posting-stat">
                        <i data-lucide="eye"></i>
                        <span>${job.applicationCount || 0} views</span>
                    </div>
                    <div class="job-posting-stat">
                        <i data-lucide="users"></i>
                        <span>${job.applicationCount || 0} applications</span>
                    </div>
                    <div class="job-posting-stat">
                        <i data-lucide="calendar"></i>
                        <span>Posted ${this.formatDate(job.postedDate)}</span>
                    </div>
                </div>
                
                <div class="job-posting-actions">
                    <button class="btn btn-primary view-applications-btn" data-job-id="${job.id}">
                        <i data-lucide="users"></i>
                        View Applications
                    </button>
                    <button class="btn btn-outline edit-job-btn" data-job-id="${job.id}">
                        <i data-lucide="edit"></i>
                        Edit Job
                    </button>
                </div>
            </div>
        `;
    }

    renderRecentApplications() {
        const container = document.getElementById('recent-applications-list');
        if (!container) return;
        
        // Mock recent applications data
        const recentApplications = [
            {
                id: 'app001',
                candidateName: 'Manav Tiwari',
                candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face',
                jobTitle: 'Frontend Developer',
                company: 'Tech Solutions Inc.',
                status: 'Interviewing',
                matchScore: 92,
                appliedDate: '2024-01-20'
            },
            {
                id: 'app002',
                candidateName: 'Sarah Chen',
                candidateAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&crop=face',
                jobTitle: 'Data Scientist',
                company: 'Data Insights LLC',
                status: 'Shortlisted',
                matchScore: 95,
                appliedDate: '2024-01-18'
            },
            {
                id: 'app003',
                candidateName: 'Michael Rodriguez',
                candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
                jobTitle: 'Senior Backend Engineer',
                company: 'InnovateCorp',
                status: 'Applied',
                matchScore: 88,
                appliedDate: '2024-01-19'
            }
        ];
        
        const applicationsHTML = recentApplications.map(app => this.createRecruiterApplicationItem(app)).join('');
        container.innerHTML = applicationsHTML;
        
        // Initialize icons for new elements
        this.initializeIcons();
    }

    createRecruiterApplicationItem(application) {
        const statusClass = this.getStatusClass(application.status);
        const statusIcon = this.getStatusIcon(application.status);
        
        return `
            <div class="recruiter-application-item" data-application-id="${application.id}">
                <div class="recruiter-application-info">
                    <img src="${application.candidateAvatar}" alt="${application.candidateName}" class="recruiter-application-avatar">
                    <div class="recruiter-application-details">
                        <h4>${application.candidateName}</h4>
                        <p>${application.jobTitle} at ${application.company}</p>
                        <small>Applied ${this.formatDate(application.appliedDate)}</small>
                    </div>
                </div>
                
                <div class="recruiter-application-metrics">
                    <div class="recruiter-application-metric">
                        <div class="recruiter-application-metric-label">Match Score</div>
                        <div class="recruiter-application-metric-value">${application.matchScore}%</div>
                    </div>
                    <div class="recruiter-application-metric">
                        <div class="recruiter-application-metric-label">Status</div>
                        <span class="recruiter-status-badge ${statusClass}">
                            <i data-lucide="${statusIcon}"></i>
                            ${application.status}
                        </span>
                    </div>
                </div>
                
                <div class="recruiter-application-actions">
                    <button class="btn btn-primary view-profile-btn" data-application-id="${application.id}">
                        <i data-lucide="eye"></i>
                        View Profile
                    </button>
                    <button class="btn btn-outline schedule-interview-btn" data-application-id="${application.id}">
                        <i data-lucide="calendar"></i>
                        Schedule
                    </button>
                </div>
            </div>
        `;
    }

    getStatusClass(status) {
        const statusMap = {
            'applied': 'applied',
            'screened': 'screened',
            'interviewing': 'interviewing',
            'shortlisted': 'shortlisted',
            'offered': 'offered',
            'hired': 'hired',
            'rejected': 'rejected'
        };
        return statusMap[status] || 'applied';
    }

    getStatusIcon(status) {
        const iconMap = {
            'applied': 'file-text',
            'screened': 'check-circle',
            'interviewing': 'calendar',
            'shortlisted': 'star',
            'offered': 'gift',
            'hired': 'check',
            'rejected': 'x-circle'
        };
        return iconMap[status] || 'file-text';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    }

    async initializeCharts() {
        try {
            // Load candidate funnel data
            const funnelData = await getAnalyticsData('candidateFunnel');
            this.createFunnelChart(funnelData);
            
            // Load skills demand data
            const skillsData = await getAnalyticsData('skillsDemand');
            this.createSkillsDemandChart(skillsData);
            
        } catch (error) {
            console.error('Failed to load chart data:', error);
        }
    }

    createFunnelChart(data) {
        const ctx = document.getElementById('funnel-chart');
        if (!ctx) return;
        
        this.funnelChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.data,
                    backgroundColor: data.colors,
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                            }
                        }
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 2
                    }
                }
            }
        });
    }

    createSkillsDemandChart(data) {
        const ctx = document.getElementById('skills-demand-chart');
        if (!ctx) return;
        
        this.skillsDemandChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Market Demand',
                        data: data.demand,
                        backgroundColor: 'rgba(59, 130, 246, 0.8)',
                        borderColor: 'rgb(59, 130, 246)',
                        borderWidth: 1
                    },
                    {
                        label: 'Growth Rate',
                        data: data.growth,
                        backgroundColor: 'rgba(16, 185, 129, 0.8)',
                        borderColor: 'rgb(16, 185, 129)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            font: {
                                size: 10
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 10
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                elements: {
                    bar: {
                        borderRadius: 4
                    }
                }
            }
        });
    }

    setupEventListeners() {
        // Job posting interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.view-applications-btn')) {
                const jobId = e.target.closest('.view-applications-btn').dataset.jobId;
                this.handleViewApplications(jobId);
            } else if (e.target.closest('.edit-job-btn')) {
                const jobId = e.target.closest('.edit-job-btn').dataset.jobId;
                this.handleEditJob(jobId);
            } else if (e.target.closest('.job-posting-card')) {
                const jobId = e.target.closest('.job-posting-card').dataset.jobId;
                this.handleJobPostingClick(jobId);
            }
        });
        
        // Application interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.view-profile-btn')) {
                const applicationId = e.target.closest('.view-profile-btn').dataset.applicationId;
                this.handleViewProfile(applicationId);
            } else if (e.target.closest('.schedule-interview-btn')) {
                const applicationId = e.target.closest('.schedule-interview-btn').dataset.applicationId;
                this.handleScheduleInterview(applicationId);
            } else if (e.target.closest('.recruiter-application-item')) {
                const applicationId = e.target.closest('.recruiter-application-item').dataset.applicationId;
                this.handleApplicationClick(applicationId);
            }
        });
        
        // Quick action buttons
        const postNewJobBtn = document.querySelector('.btn[data-action="post-new-job"]');
        if (postNewJobBtn) {
            postNewJobBtn.addEventListener('click', () => this.handlePostNewJob());
        }
        
        const viewCandidatesBtn = document.querySelector('.btn[data-action="view-candidates"]');
        if (viewCandidatesBtn) {
            viewCandidatesBtn.addEventListener('click', () => this.handleViewCandidates());
        }
    }

    handleViewApplications(jobId) {
        // Navigate to applications page for this job
        window.location.href = `applicants.html?jobId=${jobId}`;
    }

    handleEditJob(jobId) {
        // Navigate to job edit page
        window.location.href = `edit-job.html?id=${jobId}`;
    }

    handleJobPostingClick(jobId) {
        // Navigate to job details page
        window.location.href = `job-details.html?id=${jobId}`;
    }

    handleViewProfile(applicationId) {
        // Navigate to candidate profile page
        window.location.href = `candidate-profile.html?applicationId=${applicationId}`;
    }

    handleScheduleInterview(applicationId) {
        // Navigate to interview scheduling page
        window.location.href = `schedule-interview.html?applicationId=${applicationId}`;
    }

    handleApplicationClick(applicationId) {
        // Navigate to application details page
        window.location.href = `application-details.html?id=${applicationId}`;
    }

    handlePostNewJob() {
        // Navigate to job posting page
        window.location.href = 'post-job.html';
    }

    handleViewCandidates() {
        // Navigate to candidates page
        window.location.href = 'candidates.html';
    }

    showError(message) {
        // Create and show error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i data-lucide="alert-circle"></i>
                <span>${message}</span>
                <button class="error-close">
                    <i data-lucide="x"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
        
        // Initialize icons
        this.initializeIcons();
    }

    initializeIcons() {
        // Initialize Lucide icons for newly added elements
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Initialize recruiter dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RecruiterDashboard();
});

// Export for use in other modules
export { RecruiterDashboard };
