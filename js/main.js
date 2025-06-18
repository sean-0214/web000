// Main JavaScript functionality for Sean Chiang's website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTerminalAnimation();
    initScrollAnimations();
    initProjectCards();
});

// Navigation functionality
function initNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Terminal animation functionality
function initTerminalAnimation() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    if (terminalLines.length === 0) return;

    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, (index + 1) * 500);
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Project card functionality
function initProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Add click handler for project navigation
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            if (projectId) {
                navigateToProject(projectId);
            }
        });
    });

    // Add click handlers for experience timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', function() {
            const experienceId = this.getAttribute('data-experience-id');
            if (experienceId) {
                navigateToExperience(experienceId);
            }
        });
        
        // Add hover effect for experience items
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.cursor = 'pointer';
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'translateX(0)';
        });
    });
}

// Project navigation
function navigateToProject(projectId) {
    // Check if we're on the main page or a project page
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/projects/')) {
        // We're already in a project page, navigate relative to projects folder
        window.location.href = `${projectId}.html`;
    } else {
        // We're on the main page, navigate to projects folder
        window.location.href = `projects/${projectId}.html`;
    }
}

// Experience navigation
function navigateToExperience(experienceId) {
    // Check if we're on the main page or an experience page
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/experience/')) {
        // We're already in an experience page, navigate relative to experience folder
        window.location.href = `${experienceId}.html`;
    } else {
        // We're on the main page, navigate to experience folder
        window.location.href = `experience/${experienceId}.html`;
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '6px',
        color: '#fff',
        fontWeight: '500',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s ease'
    });

    // Set background color based on type
    const colors = {
        info: '#3498db',
        success: '#2ecc71',
        warning: '#f39c12',
        error: '#e74c3c'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Form handling (for contact forms)
function handleContactForm(formData) {
    // This would typically send data to a server
    // For now, we'll just show a notification
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
}

// Media upload placeholder functionality
function initMediaUpload() {
    const uploadAreas = document.querySelectorAll('.media-placeholder');
    
    uploadAreas.forEach(area => {
        area.addEventListener('click', function() {
            const mediaType = this.getAttribute('data-media-type') || 'image';
            showNotification(`Click to upload ${mediaType}. This is a placeholder for future media upload functionality.`, 'info');
        });

        area.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#3498db';
            this.style.backgroundColor = '#f8f9fa';
        });

        area.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#e1e5e9';
            this.style.backgroundColor = '#f8f9fa';
        });

        area.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#e1e5e9';
            this.style.backgroundColor = '#f8f9fa';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                showNotification(`${files.length} file(s) ready for upload. Upload functionality will be implemented.`, 'info');
            }
        });
    });
}

// Initialize media upload functionality when DOM is ready
document.addEventListener('DOMContentLoaded', initMediaUpload);

// Export functions for use in other scripts
window.SeanChiangWebsite = {
    navigateToProject,
    showNotification,
    handleContactForm,
    updateActiveNavLink
};

