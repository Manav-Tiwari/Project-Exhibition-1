// Dashboard JavaScript - handles data loading, charts, and interactions
import { 
    getCurrentUser, 
    getRecommendedJobs, 
    getApplicationsByUser, 
    getDashboardMetrics,
    getAnalyticsData 
} from '../services/api.js';

class Dashboard {
    constructor() {
        this.currentUser = null;
        this.skillsChart = null;
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
            console.error('Failed to initialize dashboard:', error);
            this.showError('Failed to load dashboard data');
        }
    }

    async initializeDashboard() {
        try {
            // Load dashboard metrics
            const metrics = await getDashboardMetrics(this.currentUser.id);
            this.updateDashboardMetrics(metrics);
            
            // Load recommended jobs
            const recommendedJobs = await getRecommendedJobs(this.currentUser.id, 5);
            this.renderRecommendedJobs(recommendedJobs);
            
            // Load recent applications
            const applications = await getApplicationsByUser(this.currentUser.id);
            this.renderRecentApplications(applications.slice(0, 5));
            
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        }
    }

    updateDashboardMetrics(metrics) {
        // Update stats cards
        const totalApplications = document.getElementById('total-applications');
        const interviewsScheduled = document.getElementById('interviews-scheduled');
        const averageMatchScore = document.getElementById('average-match-score');
        const profileViews = document.getElementById('profile-views');
        
        if (totalApplications) totalApplications.textContent = metrics.totalApplications;
        if (interviewsScheduled) interviewsScheduled.textContent = metrics.interviewsScheduled;
        if (averageMatchScore) averageMatchScore.textContent = `${metrics.averageMatchScore}%`;
        if (profileViews) profileViews.textContent = metrics.profileViews;
    }

    renderRecommendedJobs(jobs) {
        const container = document.getElementById('recommended-jobs-list');
        if (!container) return;
        
        if (jobs.length === 0) {
            container.innerHTML = `
                <div class="no-jobs">
                    <i data-lucide="briefcase" style="width: 48px; height: 48px; color: var(--gray-400);"></i>
                    <h3>No recommendations yet</h3>
                    <p>Complete your profile and skills assessment to get personalized job recommendations</p>
                    <a href="profile.html" class="btn btn-primary">Complete Profile</a>
                </div>
            `;
            return;
        }
        
        const jobsHTML = jobs.map(job => this.createJobCard(job)).join('');
        container.innerHTML = jobsHTML;
        
        // Initialize icons for new elements
        this.initializeIcons();
    }

    createJobCard(job) {
        const skillsHTML = job.requiredSkills.slice(0, 3).map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('');
        
        const remainingSkills = job.requiredSkills.length - 3;
        if (remainingSkills > 0) {
            skillsHTML += `<span class="skill-tag">+${remainingSkills} more</span>`;
        }
        
        return `
            <div class="job-card" data-job-id="${job.id}">
                <div class="job-header">
                    <div class="job-title-section">
                        <h3>${job.title}</h3>
                        <p class="job-company">${job.company}</p>
                        <div class="job-location">
                            <i data-lucide="map-pin"></i>
                            <span>${job.location}</span>
                        </div>
                    </div>
                    <div class="match-score">${job.matchScore}%</div>
                </div>
                
                <div class="job-details">
                    <div class="job-detail">
                        <i data-lucide="clock"></i>
                        <span>${job.type}</span>
                    </div>
                    <div class="job-detail">
                        <i data-lucide="dollar-sign"></i>
                        <span>${job.salary}</span>
                    </div>
                    <div class="job-detail">
                        <i data-lucide="user"></i>
                        <span>${job.experience}</span>
                    </div>
                </div>
                
                <div class="job-skills">
                    ${skillsHTML}
                </div>
                
                <div class="job-actions">
                    <button class="btn btn-primary apply-btn" data-job-id="${job.id}">
                        <i data-lucide="send"></i>
                        Apply Now
                    </button>
                    <button class="btn btn-outline view-btn" data-job-id="${job.id}">
                        <i data-lucide="eye"></i>
                        View Details
                    </button>
                </div>
            </div>
        `;
    }

    renderRecentApplications(applications) {
        const container = document.getElementById('recent-applications-list');
        if (!container) return;
        
        if (applications.length === 0) {
            container.innerHTML = `
                <div class="no-applications">
                    <i data-lucide="file-text" style="width: 48px; height: 48px; color: var(--gray-400);"></i>
                    <h3>No applications yet</h3>
                    <p>Start applying to jobs to see your application history here</p>
                    <a href="jobs.html" class="btn btn-primary">Browse Jobs</a>
                </div>
            `;
            return;
        }
        
        const applicationsHTML = applications.map(app => this.createApplicationItem(app)).join('');
        container.innerHTML = applicationsHTML;
        
        // Initialize icons for new elements
        this.initializeIcons();
    }

    createApplicationItem(application) {
        const job = this.getJobById(application.jobId);
        if (!job) return '';
        
        const statusClass = this.getStatusClass(application.status);
        const statusText = application.status.charAt(0).toUpperCase() + application.status.slice(1);
        
        return `
            <div class="application-item">
                <div class="application-info">
                    <h4>${job.title}</h4>
                    <p>${job.company} • Applied ${this.formatDate(application.appliedDate)}</p>
                </div>
                <div class="application-status">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                    <span class="match-score">${application.matchScore}%</span>
                </div>
            </div>
        `;
    }

    getJobById(jobId) {
        // This would typically come from a jobs cache or API call
        // For now, we'll return a mock job object
        return {
            title: 'Job Title',
            company: 'Company Name'
        };
    }

    getStatusClass(status) {
        const statusMap = {
            'applied': 'applied',
            'screened': 'applied',
            'interviewing': 'interviewing',
            'shortlisted': 'shortlisted',
            'offered': 'shortlisted',
            'hired': 'shortlisted',
            'rejected': 'rejected'
        };
        return statusMap[status] || 'applied';
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
            // Load skills demand data
            const skillsData = await getAnalyticsData('skillsDemand');
            this.createSkillsChart(skillsData);
        } catch (error) {
            console.error('Failed to load chart data:', error);
        }
    }

    createSkillsChart(data) {
        const ctx = document.getElementById('skills-chart');
        if (!ctx) return;
        
        // Get user skills for comparison
        const userSkills = this.currentUser.resumeData.skills;
        const userSkillLevels = data.labels.map(skill => {
            const userSkill = userSkills.find(s => 
                s.toLowerCase().includes(skill.toLowerCase()) ||
                skill.toLowerCase().includes(s.toLowerCase())
            );
            return userSkill ? 85 : 30; // High level if user has skill, low if not
        });
        
        this.skillsChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Market Demand',
                        data: data.demand,
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        pointBackgroundColor: 'rgb(59, 130, 246)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(59, 130, 246)'
                    },
                    {
                        label: 'Your Skills',
                        data: userSkillLevels,
                        borderColor: 'rgb(16, 185, 129)',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        pointBackgroundColor: 'rgb(16, 185, 129)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(16, 185, 129)'
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
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            font: {
                                size: 10
                            }
                        },
                        pointLabels: {
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 4,
                        hoverRadius: 6
                    },
                    line: {
                        borderWidth: 2
                    }
                }
            }
        });
    }

    setupEventListeners() {
        // Job card interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.apply-btn')) {
                const jobId = e.target.closest('.apply-btn').dataset.jobId;
                this.handleJobApply(jobId);
            } else if (e.target.closest('.view-btn')) {
                const jobId = e.target.closest('.view-btn').dataset.jobId;
                this.handleJobView(jobId);
            } else if (e.target.closest('.job-card')) {
                const jobId = e.target.closest('.job-card').dataset.jobId;
                this.handleJobClick(jobId);
            }
        });
        
        // Quick action buttons
        const uploadResumeBtn = document.querySelector('.btn[data-action="upload-resume"]');
        if (uploadResumeBtn) {
            uploadResumeBtn.addEventListener('click', () => this.handleUploadResume());
        }
        
        const browseJobsBtn = document.querySelector('.btn[data-action="browse-jobs"]');
        if (browseJobsBtn) {
            browseJobsBtn.addEventListener('click', () => this.handleBrowseJobs());
        }
    }

    handleJobApply(jobId) {
    // Navigate to job details page with apply intent
    window.location.href = `job-details.html?id=${jobId}&apply=true`;
    }

    handleJobView(jobId) {
    // Navigate to job details page
    window.location.href = `job-details.html?id=${jobId}`;
    }

    handleJobClick(jobId) {
    // Navigate to job details page
    window.location.href = `job-details.html?id=${jobId}`;
    }

    handleUploadResume() {
        // Show file upload dialog or navigate to resume upload page
        alert('Resume upload functionality would be implemented here');
    }

    handleBrowseJobs() {
    // Navigate to jobs page
    window.location.href = 'jobs.html';
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

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});

// Export for use in other modules
export { Dashboard };
