# Sean Chiang Personal Website with Decap CMS

A modern, responsive personal website with integrated Content Management System (CMS) for easy content updates and media management.

## 🌟 Features

### 📝 Content Management System
- **Decap CMS Integration**: Visual editor for easy content management
- **Real-time Editing**: Live preview of changes in the admin interface
- **Media Management**: Easy upload and management of images, videos, and documents
- **Markdown Support**: Rich text editing with Markdown support
- **Version Control**: Git-based content versioning and backup

### 🚀 Technical Features
- **Static Site Generation**: Fast loading times and excellent SEO
- **Git-based Workflow**: Content stored in Git for version control
- **Netlify Identity**: Secure authentication for content editors
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML

## 📁 Project Structure

```
sean_chiang_cms_website/
├── admin/                          # Decap CMS admin interface
│   ├── config.yml                 # CMS configuration
│   └── index.html                 # Admin interface
├── _data/                         # Site configuration data
│   ├── settings.yml              # Site settings (title, contact info, etc.)
│   ├── about.yml                 # About page content and skills
│   └── gallery.yml               # Media gallery configuration
├── content/                       # Content files (Markdown)
│   ├── projects/                 # Project case studies
│   │   ├── international-quant-championship.md
│   │   ├── point72-competition.md
│   │   └── [other project files]
│   └── experience/               # Professional experience
│       ├── research-assistant.md
│       ├── oakcean-capital.md
│       └── [other experience files]
├── assets/                       # Static assets
│   ├── images/                   # Image files
│   ├── videos/                   # Video files
│   └── documents/                # Document files (PDFs, etc.)
├── css/                          # Stylesheets
│   └── styles.css               # Main stylesheet
├── js/                           # JavaScript files
│   └── cms-main.js              # Main JavaScript with CMS integration
├── index.html                    # Main website file
└── README.md                     # This file
```

## 🛠️ CMS Configuration

### Content Types

#### 1. Site Settings
- Site title and description
- Author information
- Contact details (email, LinkedIn, GitHub)
- Profile image

#### 2. Projects
- Title and subtitle
- Organization and achievement
- Date and featured status
- Tags and technologies
- Short and long descriptions
- Media gallery (images, videos, documents)
- Project links

#### 3. Experience
- Position and organization
- Date range and location
- Responsibilities and achievements
- Skills developed
- Media documentation

#### 4. About Page
- Introduction text
- Terminal commands for animation
- Skills categorization
- Interests and hobbies

### Media Management
- **Images**: Automatic optimization and responsive serving
- **Videos**: Support for embedded videos and file uploads
- **Documents**: PDF and document file management
- **Gallery**: Organized media collections with metadata

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)
1. **Create Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **Connect Git Repository**: 
   - Upload project to GitHub/GitLab
   - Connect repository to Netlify
3. **Configure Build Settings**:
   - Build command: (leave empty for static site)
   - Publish directory: `/` (root)
4. **Enable Netlify Identity**:
   - Go to Site Settings > Identity
   - Enable Identity service
   - Configure registration preferences
5. **Enable Git Gateway**:
   - In Identity settings, enable Git Gateway
   - This allows CMS to commit changes to Git

### Option 2: Vercel
1. **Create Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Import Project**: Import from Git repository
3. **Configure Settings**: Use default settings for static site
4. **Set up Authentication**: Configure external authentication service

### Option 3: GitHub Pages
1. **Upload to GitHub**: Create repository and upload files
2. **Enable Pages**: Go to Settings > Pages
3. **Configure Source**: Select source branch (usually main)
4. **Custom Domain**: (Optional) Configure custom domain

### Option 4: Traditional Web Hosting
1. **Upload Files**: Upload entire project folder to web server
2. **Configure Server**: Ensure server supports static files
3. **Set up Authentication**: Configure external authentication for CMS

## 📝 Content Management

### Accessing the CMS
1. **Navigate to Admin**: Go to `yoursite.com/admin/`
2. **Login**: Use Netlify Identity or configured authentication
3. **Edit Content**: Use the visual editor to update content
4. **Publish Changes**: Changes are automatically saved and deployed

### Adding New Projects
1. **Go to Projects Section**: In CMS admin
2. **Click "New Project"**: Create new project entry
3. **Fill in Details**: Add title, description, media, etc.
4. **Set Featured Status**: Mark important projects as featured
5. **Save and Publish**: Changes go live automatically

### Managing Media
1. **Upload Images**: Drag and drop or browse to upload
2. **Organize Files**: Use folders and tags for organization
3. **Optimize Images**: Automatic optimization for web delivery
4. **Link to Content**: Easy linking from content editor

### Updating Experience
1. **Edit Experience Entries**: Update job descriptions and achievements
2. **Add New Positions**: Create entries for new roles
3. **Update Skills**: Modify skills and technologies
4. **Document Growth**: Add new accomplishments and projects

## 🎨 Customization

### Visual Customization
- **Colors**: Edit CSS variables in `styles.css`
- **Fonts**: Modify font families and sizes
- **Layout**: Adjust spacing, margins, and grid layouts
- **Animations**: Customize terminal animation and transitions

### Content Customization
- **Terminal Commands**: Edit in `_data/about.yml`
- **Skills Categories**: Modify skills organization
- **Contact Information**: Update in `_data/settings.yml`
- **Navigation**: Adjust menu items and links

### CMS Customization
- **Fields**: Add or modify content fields in `admin/config.yml`
- **Widgets**: Change input types and validation rules
- **Collections**: Add new content types or modify existing ones
- **Media Settings**: Configure upload restrictions and formats

## 🔧 Technical Details

### Dependencies
- **Decap CMS**: Content management system
- **Netlify Identity**: Authentication service
- **Git Gateway**: Git integration for CMS
- **Vanilla JavaScript**: No framework dependencies
- **Modern CSS**: Flexbox and Grid layouts

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Basic functionality without JavaScript
- **Accessibility**: WCAG 2.1 AA compliance

### Performance
- **Static Generation**: Fast loading times
- **Image Optimization**: Automatic image compression
- **Minimal JavaScript**: Lightweight and fast
- **CDN Delivery**: Global content delivery network
- **Caching**: Aggressive caching for static assets

## 📱 Mobile Optimization

### Responsive Design
- **Mobile-First**: Designed for mobile devices first
- **Touch-Friendly**: Large touch targets and gestures
- **Fast Loading**: Optimized for mobile networks
- **Readable Text**: Appropriate font sizes and contrast

### Mobile CMS
- **Mobile Admin**: CMS admin interface works on mobile
- **Touch Editing**: Touch-friendly content editing
- **Image Upload**: Mobile camera integration
- **Offline Support**: Basic offline functionality

## 🔒 Security

### Authentication
- **Secure Login**: Industry-standard authentication
- **Role-Based Access**: Different permission levels
- **Session Management**: Secure session handling
- **Password Security**: Strong password requirements

### Content Security
- **Git Versioning**: All changes tracked in Git
- **Backup Strategy**: Automatic backups via Git
- **Content Validation**: Input validation and sanitization
- **XSS Protection**: Cross-site scripting prevention

## 📊 Analytics & SEO

### SEO Optimization
- **Meta Tags**: Proper title and description tags
- **Structured Data**: Schema.org markup
- **Semantic HTML**: Proper heading hierarchy
- **Image Alt Text**: Descriptive alt text for images
- **URL Structure**: Clean, descriptive URLs

### Analytics Integration
- **Google Analytics**: Easy integration setup
- **Performance Monitoring**: Core Web Vitals tracking
- **User Behavior**: Interaction and engagement tracking
- **Conversion Tracking**: Goal and conversion setup

## 🚀 Getting Started

### Quick Start
1. **Download**: Download the project files
2. **Upload**: Upload to your preferred hosting platform
3. **Configure**: Set up authentication and CMS access
4. **Customize**: Update content and styling as needed
5. **Launch**: Your website is ready to go!

### Development Setup
1. **Local Server**: Use a local web server for development
2. **Git Repository**: Initialize Git repository for version control
3. **CMS Testing**: Test CMS functionality locally
4. **Content Migration**: Import existing content
5. **Deployment**: Deploy to production environment

## 📞 Support & Maintenance

### Regular Updates
- **Content Updates**: Regular content and media updates
- **Security Updates**: Keep CMS and dependencies updated
- **Performance Monitoring**: Regular performance checks
- **Backup Verification**: Ensure backups are working
- **Analytics Review**: Regular analytics and SEO review

### Troubleshooting
- **CMS Issues**: Check authentication and Git gateway
- **Performance Issues**: Optimize images and code
- **Mobile Issues**: Test on various devices and browsers
- **SEO Issues**: Validate markup and meta tags
- **Security Issues**: Review access logs and permissions

This CMS-enabled website provides a perfect balance of professional presentation and easy content management, allowing you to maintain an up-to-date, impressive online presence without technical complexity.

