// Main JavaScript file - handles component loading and global functionality
import { getCurrentUser, getNotifications, getSearchSuggestions } from '../services/api.js';

class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.currentUser = null;
        this.init();
    }

    async init() {
        try {
            // Load current user data
            this.currentUser = await getCurrentUser();
            
            // Load components
            await this.loadComponents();
            
            // Initialize global functionality
            this.initializeGlobalFeatures();
            
            // Initialize Lucide icons
            this.initializeIcons();
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
        }
    }

    async loadComponents() {
        try {
            // Determine the correct path based on current location
            const isInPagesFolder = window.location.pathname.includes('/pages/');
            const basePath = isInPagesFolder ? '../' : '';
            
            // Load header component
            const headerResponse = await fetch(`${basePath}components/header.html`);
            if (!headerResponse.ok) {
                throw new Error(`Failed to load header: ${headerResponse.status} ${headerResponse.statusText}`);
            }
            const headerHTML = await headerResponse.text();
            this.components.set('header', headerHTML);
            
            // Load sidebar component
            const sidebarResponse = await fetch(`${basePath}components/sidebar.html`);
            if (!sidebarResponse.ok) {
                throw new Error(`Failed to load sidebar: ${sidebarResponse.status} ${sidebarResponse.statusText}`);
            }
            const sidebarHTML = await sidebarResponse.text();
            this.components.set('sidebar', sidebarHTML);
            
            // Inject components into DOM
            this.injectComponents();
            
        } catch (error) {
            console.error('Failed to load components:', error);
        }
    }

    injectComponents() {
        // Inject header
        const headerContainer = document.getElementById('header-container');
        if (headerContainer && this.components.has('header')) {
            headerContainer.innerHTML = this.components.get('header');
        }
        
        // Inject sidebar
        const sidebarContainer = document.getElementById('sidebar-container');
        if (sidebarContainer && this.components.has('sidebar')) {
            sidebarContainer.innerHTML = this.components.get('sidebar');
        }
    }

    initializeGlobalFeatures() {
        // Initialize search functionality
        this.initializeSearch();
        
        // Initialize notifications
        this.initializeNotifications();
        
        // Initialize user menu
        this.initializeUserMenu();
        
        // Initialize mobile menu
        this.initializeMobileMenu();
        
        // Initialize sidebar toggle
        this.initializeSidebarToggle();
        
        // Update user information in components
        this.updateUserInfo();
    }

    initializeSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchSuggestions = document.getElementById('search-suggestions');
        const searchClear = document.querySelector('.search-clear');
        
        if (!searchInput) return;
        
        let searchTimeout;
        
        searchInput.addEventListener('input', async (e) => {
            const query = e.target.value.trim();
            
            // Clear previous timeout
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            
            // Show/hide clear button
            if (searchClear) {
                searchClear.style.display = query ? 'block' : 'none';
            }
            
            if (query.length < 2) {
                this.hideSearchSuggestions();
                return;
            }
            
            // Debounce search
            searchTimeout = setTimeout(async () => {
                try {
                    const suggestions = await getSearchSuggestions(query);
                    this.showSearchSuggestions(suggestions);
                } catch (error) {
                    console.error('Search failed:', error);
                }
            }, 300);
        });
        
        // Handle search clear
        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchInput.focus();
                this.hideSearchSuggestions();
                searchClear.style.display = 'none';
            });
        }
        
        // Handle search suggestions click
        if (searchSuggestions) {
            searchSuggestions.addEventListener('click', (e) => {
                const suggestion = e.target.closest('.search-suggestion');
                if (suggestion) {
                    const value = suggestion.dataset.value;
                    searchInput.value = value;
                    this.hideSearchSuggestions();
                    // Trigger search or navigation
                    this.handleSearch(value);
                }
            });
        }
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSearchSuggestions();
            }
        });
    }

    showSearchSuggestions(suggestions) {
        const searchSuggestions = document.getElementById('search-suggestions');
        if (!searchSuggestions) return;
        
        if (suggestions.length === 0) {
            searchSuggestions.innerHTML = '<div class="no-suggestions">No suggestions found</div>';
        } else {
            const suggestionsHTML = suggestions.map(suggestion => `
                <div class="search-suggestion" data-value="${suggestion.value}">
                    <i data-lucide="${this.getSuggestionIcon(suggestion.type)}"></i>
                    <span>${suggestion.value}</span>
                    <small>${suggestion.type}</small>
                </div>
            `).join('');
            
            searchSuggestions.innerHTML = suggestionsHTML;
        }
        
        searchSuggestions.style.display = 'block';
        this.initializeIcons();
    }

    hideSearchSuggestions() {
        const searchSuggestions = document.getElementById('search-suggestions');
        if (searchSuggestions) {
            searchSuggestions.style.display = 'none';
        }
    }

    getSuggestionIcon(type) {
        const iconMap = {
            'job_title': 'briefcase',
            'company': 'building',
            'skill': 'target'
        };
        return iconMap[type] || 'search';
    }

    handleSearch(query) {
        // Navigate to jobs page with search query
        if (window.location.pathname.includes('jobs.html')) {
            // If already on jobs page, trigger search
            window.dispatchEvent(new CustomEvent('searchJobs', { detail: { query } }));
        } else {
            // Navigate to jobs page with search
            const isInPagesFolder = window.location.pathname.includes('/pages/');
            const basePath = isInPagesFolder ? '' : 'pages/';
            window.location.href = `pages/${basePath}jobs.html?search=${encodeURIComponent(query)}`;
        }
    }

    async initializeNotifications() {
        const notificationBtn = document.querySelector('.notification-btn');
        const notificationsDropdown = document.getElementById('notifications-dropdown');
        const notificationsList = document.getElementById('notifications-list');
        const markAllRead = document.querySelector('.mark-all-read');
        
        if (!notificationBtn) return;
        
        // Load notifications
        try {
            const notifications = await getNotifications(this.currentUser?.id);
            this.renderNotifications(notifications);
        } catch (error) {
            console.error('Failed to load notifications:', error);
        }
        
        // Toggle notifications dropdown
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationsDropdown.classList.toggle('show');
        });
        
        // Mark all as read
        if (markAllRead) {
            markAllRead.addEventListener('click', () => {
                this.markAllNotificationsAsRead();
            });
        }
        
        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notifications')) {
                notificationsDropdown.classList.remove('show');
            }
        });
    }

    renderNotifications(notifications) {
        const notificationsList = document.getElementById('notifications-list');
        const notificationBadge = document.querySelector('.notification-badge');
        
        if (!notificationsList) return;
        
        if (notifications.length === 0) {
            notificationsList.innerHTML = '<div class="no-notifications">No new notifications</div>';
            if (notificationBadge) {
                notificationBadge.style.display = 'none';
            }
        } else {
            const notificationsHTML = notifications.map(notification => `
                <div class="notification-item ${notification.read ? 'read' : 'unread'}" data-id="${notification.id}">
                    <div class="notification-icon">
                        <i data-lucide="${this.getNotificationIcon(notification.type)}"></i>
                    </div>
                    <div class="notification-content">
                        <h4>${notification.title}</h4>
                        <p>${notification.message}</p>
                        <small>${this.formatTimestamp(notification.timestamp)}</small>
                    </div>
                    <button class="notification-close" type="button">
                        <i data-lucide="x"></i>
                    </button>
                </div>
            `).join('');
            
            notificationsList.innerHTML = notificationsHTML;
            
            if (notificationBadge) {
                notificationBadge.textContent = notifications.filter(n => !n.read).length;
                notificationBadge.style.display = notifications.filter(n => !n.read).length > 0 ? 'block' : 'none';
            }
        }
        
        this.initializeIcons();
    }

    getNotificationIcon(type) {
        const iconMap = {
            'application_update': 'file-text',
            'new_application': 'user-plus',
            'interview_scheduled': 'calendar',
            'offer_received': 'gift',
            'application_rejected': 'x-circle'
        };
        return iconMap[type] || 'bell';
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 48) return 'Yesterday';
        return date.toLocaleDateString();
    }

    markAllNotificationsAsRead() {
        const notificationItems = document.querySelectorAll('.notification-item');
        notificationItems.forEach(item => {
            item.classList.remove('unread');
            item.classList.add('read');
        });
        
        const notificationBadge = document.querySelector('.notification-badge');
        if (notificationBadge) {
            notificationBadge.style.display = 'none';
        }
    }

    initializeUserMenu() {
        const userMenuBtn = document.getElementById('user-menu-btn');
        const userDropdown = document.getElementById('user-dropdown');
        
        if (!userMenuBtn) return;
        
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        
        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu')) {
                userDropdown.classList.remove('show');
            }
        });
    }

    initializeMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');
        const mobileNavClose = document.querySelector('.mobile-nav-close');
        
        if (!mobileMenuBtn) return;
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('show');
        });
        
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', () => {
                mobileNav.classList.remove('show');
            });
        }
        
        // Close mobile nav when clicking on a link
        const mobileNavLinks = mobileNav?.querySelectorAll('a');
        if (mobileNavLinks) {
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileNav.classList.remove('show');
                });
            });
        }
    }

    initializeSidebarToggle() {
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        
        if (!sidebarToggle || !sidebar) return;
        
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            
            // Update toggle button icon
            const icon = sidebarToggle.querySelector('i');
            if (sidebar.classList.contains('collapsed')) {
                icon.setAttribute('data-lucide', 'chevron-right');
            } else {
                icon.setAttribute('data-lucide', 'chevron-left');
            }
            
            this.initializeIcons();
        });
    }

    updateUserInfo() {
        if (!this.currentUser) return;
        
        // Update user name and avatar in components
        const userNames = document.querySelectorAll('.user-name, .sidebar-user-info h4, .mobile-user-info h4');
        const userAvatars = document.querySelectorAll('.user-avatar, .sidebar-avatar, .mobile-user-avatar');
        const userRoles = document.querySelectorAll('.sidebar-user-info p, .mobile-user-info p');
        
        userNames.forEach(name => {
            name.textContent = this.currentUser.name;
        });
        
        userAvatars.forEach(avatar => {
            avatar.src = this.currentUser.avatar;
            avatar.alt = `${this.currentUser.name} Avatar`;
        });
        
        userRoles.forEach(role => {
            role.textContent = this.currentUser.role;
        });
    }

    initializeIcons() {
        // Initialize Lucide icons for newly added elements
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ComponentLoader();
});

// Export for use in other modules
export { ComponentLoader };
