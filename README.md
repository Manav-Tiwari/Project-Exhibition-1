# ResumeBERT - AI-Powered Recruitment Platform

A modern, interactive, and data-driven user interface prototype for an AI-powered recruitment platform built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

### For Job Seekers
- **AI-Powered Job Recommendations** - Personalized job suggestions based on skills and preferences
- **Skills Analysis Dashboard** - Visual representation of skills vs. market demand
- **Application Tracking** - Monitor application status and progress
- **Profile Management** - Comprehensive profile and resume builder
- **Market Insights** - Industry trends and salary information

### For Recruiters
- **Candidate Funnel Analytics** - Visual recruitment pipeline tracking
- **AI Matching Accuracy** - Performance metrics and insights
- **Application Management** - Streamlined candidate review process
- **Performance KPIs** - Time-to-hire, cost-per-hire, and quality metrics
- **Skills Demand Analysis** - Market trends and skill requirements

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Lucide Icons (CDN)
- **Charts**: Chart.js (CDN)
- **Architecture**: ES Modules with import/export
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## 📁 Project Structure

```
resumebert/
├── index.html                 # Landing page
├── dashboard.html            # Job seeker dashboard
├── recruiter-dashboard.html  # Recruiter dashboard
├── css/
│   ├── main.css             # Global styles and CSS variables
│   ├── landing.css          # Landing page specific styles
│   ├── dashboard.css        # Dashboard styles
│   ├── components.css       # Header, sidebar, and component styles
│   └── recruiter-dashboard.css # Recruiter specific styles
├── js/
│   ├── main.js              # Main application logic and component loading
│   ├── dashboard.js         # Job seeker dashboard functionality
│   └── recruiter-dashboard.js # Recruiter dashboard functionality
├── mock-data/
│   ├── index.js             # Data exports
│   ├── users.js             # Mock user data
│   ├── jobs.js              # Mock job postings
│   ├── applications.js      # Mock application data
│   └── analytics.js         # Mock analytics and metrics
├── services/
│   └── api.js               # Simulated API service functions
└── components/
    ├── header.html          # Reusable header component
    └── sidebar.html         # Reusable sidebar component
```

## 🎯 Key Components

### 1. Component System
- **Modular Architecture**: Reusable HTML components loaded dynamically
- **Component Loader**: JavaScript-based component injection system
- **Responsive Design**: Mobile-first approach with breakpoint optimization

### 2. Mock Data System
- **Realistic Data**: Comprehensive mock data for users, jobs, and applications
- **API Simulation**: Simulated network delays and error handling
- **Data Relationships**: Properly linked data between entities

### 3. Dashboard Features
- **Interactive Charts**: Chart.js integration for data visualization
- **Real-time Updates**: Dynamic content loading and updates
- **Search Functionality**: Intelligent search with suggestions
- **Notification System**: Real-time notifications and alerts

## 🚀 Getting Started

### Prerequisites
- Modern web browser with ES6+ support
- Local web server (for ES modules to work)

### Installation

1. **Clone or Download** the project files
2. **Start a Local Server**:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in Browser**: Navigate to `http://localhost:8000`

### File Structure Setup
Ensure all files are in the correct directory structure as shown above. The application uses ES modules, so it must be served from a web server (not opened directly as a file).

## 📱 Pages Overview

### Landing Page (`index.html`)
- Hero section with call-to-action buttons
- Feature highlights and statistics
- Responsive design for all devices

### Job Seeker Dashboard (`dashboard.html`)
- AI-powered job recommendations
- Skills analysis radar chart
- Application tracking and metrics
- Quick actions and market insights

### Recruiter Dashboard (`recruiter-dashboard.html`)
- Candidate funnel visualization
- Performance metrics and KPIs
- Active job postings management
- Recent applications overview

## 🔧 Customization

### CSS Variables
The design system uses CSS custom properties for easy theming:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --accent-color: #f59e0b;
    /* ... more variables */
}
```

### Adding New Pages
1. Create HTML file with proper structure
2. Include required CSS and JavaScript files
3. Add navigation links in header/sidebar components
4. Follow the established component pattern

### Extending Mock Data
1. Add new data to appropriate mock data files
2. Create corresponding API service functions
3. Update the data structure and relationships

## 📊 Data Flow

1. **Component Loading**: `main.js` loads reusable components
2. **Data Fetching**: Page-specific scripts call simulated API services
3. **DOM Manipulation**: Dynamic content is rendered based on fetched data
4. **User Interactions**: Event listeners handle user actions and navigation

## 🎨 Design Principles

- **Minimalist UI**: Clean, professional interface design
- **Responsive Layout**: Mobile-first responsive design
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Performance**: Optimized loading and rendering
- **User Experience**: Intuitive navigation and interactions

## 🔮 Future Enhancements

- **Real Backend Integration**: Replace mock data with actual API calls
- **Authentication System**: User login and session management
- **Real-time Features**: WebSocket integration for live updates
- **Advanced Analytics**: More sophisticated data visualization
- **Mobile App**: Progressive Web App (PWA) capabilities

## 🐛 Troubleshooting

### Common Issues

1. **ES Module Errors**: Ensure you're serving files from a web server
2. **Component Loading Issues**: Check file paths and server configuration
3. **Chart Rendering**: Verify Chart.js CDN is accessible
4. **Icon Display**: Ensure Lucide Icons CDN is working

### Browser Compatibility
- **Modern Browsers**: Chrome 80+, Firefox 75+, Safari 13+
- **ES6+ Features**: Arrow functions, async/await, template literals
- **CSS Features**: CSS Grid, CSS Custom Properties, Flexbox

## 📝 License

This project is a prototype demonstration and is provided as-is for educational and portfolio purposes.

## 🤝 Contributing

While this is a prototype, suggestions and improvements are welcome. The codebase is designed to be easily extensible and maintainable.

## 📞 Support

For questions or issues with this prototype, please refer to the code comments and documentation within the files.

---

**Note**: This is a frontend prototype that simulates backend functionality using mock data. In a production environment, you would integrate with real backend services and databases.
