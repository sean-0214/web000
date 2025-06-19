/* Global Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #333;
    --secondary-color: #666;
    --accent-color: #000;
    --background-color: #fff;
    --light-gray: #f8f9fa;
    --border-color: #e1e5e9;
    --text-color: #333;
    --text-light: #555;
    --text-muted: #666;
    --terminal-bg: #2d3748;
    --terminal-header: #4a5568;
    --terminal-text: #e2e8f0;
    --terminal-prompt: #68d391;
    --terminal-command: #90cdf4;
    --terminal-output: #fbb6ce;
    --terminal-highlight: #ffd700;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
}

/* Header Navigation */
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-color);
    z-index: 1000;
    padding: 15px 0;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    color: var(--text-color);
    text-decoration: none;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 30px;
}

.nav-menu a {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
}

.nav-menu a:hover,
.nav-menu a.active {
    color: var(--accent-color);
}

.nav-menu a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
}

.nav-menu a:hover::after,
.nav-menu a.active::after {
    width: 100%;
}

/* Hero Section */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 20px 20px;
    background: linear-gradient(135deg, var(--light-gray) 0%, var(--background-color) 100%);
}

.hero-container {
    max-width: 1200px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}

.hero-content h1 {
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--accent-color);
    margin-bottom: 20px;
    line-height: 1.2;
}

.hero-subtitle {
    font-size: 1.5rem;
    color: var(--text-muted);
    margin-bottom: 30px;
    font-weight: 300;
}

.hero-description {
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 40px;
    line-height: 1.7;
}

.social-links {
    display: flex;
    gap: 20px;
}

.social-links a.social-link {
    display: inline-block;
    padding: 10px 20px;
    background-color: var(--accent-color);
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
    font-weight: 500;
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
}

.social-links a:hover {
    background-color: var(--primary-color);
    color: var(--background-color);
    transform: translateY(-2px);
}

/* Terminal/Code Block */
.terminal-container {
    background: var(--terminal-bg);
    border-radius: 12px;
    padding: 0;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    overflow: hidden;
    position: relative;
}

.terminal-header {
    background: var(--terminal-header);
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.terminal-button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 6px;
}

.terminal-button.close { background: #ff5f56; }
.terminal-button.minimize { background: #ffbd2e; }
.terminal-button.maximize { background: #27ca3f; }

.terminal-title {
    margin-left: 10px;
    color: var(--terminal-text);
    font-size: 14px;
    font-weight: 500;
}

.terminal-content {
    padding: 20px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 14px;
    line-height: 1.6;
    color: var(--terminal-text);
    background: var(--terminal-bg);
}

.terminal-line {
    margin-bottom: 8px;
    opacity: 0;
    animation: fadeInUp 0.8s ease forwards;
}

.terminal-line:nth-child(1) { animation-delay: 0.5s; }
.terminal-line:nth-child(2) { animation-delay: 1s; }
.terminal-line:nth-child(3) { animation-delay: 1.5s; }
.terminal-line:nth-child(4) { animation-delay: 2s; }
.terminal-line:nth-child(5) { animation-delay: 2.5s; }
.terminal-line:nth-child(6) { animation-delay: 3s; }

.terminal-prompt {
    color: var(--terminal-prompt);
}

.terminal-command {
    color: var(--terminal-command);
}

.terminal-output {
    color: var(--terminal-output);
    margin-bottom: 15px;
}

.terminal-highlight {
    color: var(--terminal-highlight);
    font-weight: bold;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.typing-cursor::after {
    content: '|';
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

/* Sections */
.section {
    padding: 80px 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.light-section {
    background-color: var(--light-gray);
}

.section.visible {
    opacity: 1;
    transform: translateY(0);
}

.section h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--accent-color);
    margin-bottom: 50px;
    text-align: center;
}

/* Projects Grid */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    margin-top: 40px;
}

.project-card-link {
    text-decoration: none;
    color: inherit;
    display: block;
    height: 100%;
}

.project-card {
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 30px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.project-card:hover::before {
    transform: scaleX(1);
}

.project-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
}

.project-link {
    font-weight: 500;
    color: var(--primary-color);
    text-decoration: none;
    transition: all 0.3s ease;
}

.project-link:hover {
    color: var(--accent-color);
    text-decoration: underline;
}

.project-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--accent-color);
    margin-bottom: 10px;
}

.project-subtitle {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 15px;
    font-weight: 500;
}

.project-description {
    color: var(--text-light);
    line-height: 1.6;
    margin-bottom: 20px;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    background: var(--light-gray);
    color: var(--text-color);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid var(--border-color);
}

/* Experience Timeline */
.timeline {
    position: relative;
    padding-left: 30px;
    max-width: 900px;
    margin: 0 auto;
}

.timeline-item-link {
    text-decoration: none;
    color: inherit;
    display: block;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--border-color);
}

.timeline-item {
    position: relative;
    margin-bottom: 40px;
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 25px;
    margin-left: 30px;
    transition: all 0.3s ease;
}

.timeline-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.timeline-item::before {
    content: '';
    position: absolute;
    left: -46px;
    top: 25px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary-color);
    border: 3px solid var(--background-color);
    box-shadow: 0 0 0 2px var(--primary-color);
}

.timeline-marker {
    position: absolute;
    left: -46px;
    top: 25px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary-color);
    border: 3px solid var(--background-color);
    box-shadow: 0 0 0 2px var(--primary-color);
}

.timeline-content {
    position: relative;
}

.timeline-date {
    font-size: 0.9rem;
    color: var(--text-muted);
    font-weight: 500;
    margin-bottom: 8px;
}

.timeline-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--accent-color);
    margin-bottom: 5px;
}

.timeline-company {
    font-size: 1rem;
    color: var(--text-muted);
    margin-bottom: 15px;
}

.timeline-description {
    color: var(--text-light);
    line-height: 1.6;
}

/* Skills Section */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
}

.skill-category {
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 25px;
    transition: all 0.3s ease;
}

.skill-category:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.08);
}

.skill-category h3 {
    font-size: 1.2rem;
    color: var(--accent-color);
    margin-bottom: 15px;
    position: relative;
    padding-bottom: 10px;
}

.skill-category h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: var(--primary-color);
}

.skill-list {
    list-style-type: none;
    margin-left: 0;
    padding-left: 0;
}

.skill-list li {
    margin-bottom: 8px;
    color: var(--text-light);
    position: relative;
    padding-left: 20px;
}

.skill-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-weight: bold;
}

/* Interests Section */
.interests-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    max-width: 800px;
    margin: 0 auto;
}

.interest-item {
    background: var(--background-color);
    border: 1px solid var(--border-color);
    padding: 10px 20px;
    border-radius: 30px;
    font-size: 0.9rem;
    color: var(--text-light);
    transition: all 0.3s ease;
}

.interest-item:hover {
    background: var(--primary-color);
    color: var(--background-color);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

/* Contact Section */
.contact-section {
    padding: 80px 20px;
    background-color: var(--light-gray);
}

.contact-description {
    text-align: center;
    max-width: 600px;
    margin: 0 auto 40px;
    color: var(--text-light);
}

.contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    max-width: 900px;
    margin: 0 auto;
}

.contact-card {
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 25px;
    text-align: center;
    transition: all 0.3s ease;
}

.contact-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.contact-card h3 {
    font-size: 1.2rem;
    color: var(--accent-color);
    margin-bottom: 12px;
}

.contact-card p a {
    color: var(--text-light);
    text-decoration: none;
    transition: color 0.3s ease;
}

.contact-card p a:hover {
    color: var(--primary-color);
    text-decoration: underline;
}

.contact-section h2 {
    margin-bottom: 20px;
}

.contact-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.contact-btn {
    display: inline-block;
    padding: 15px 30px;
    background: var(--primary-color);
    color: var(--background-color);
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.contact-btn:hover {
    background: var(--accent-color);
    transform: translateY(-2px);
}

.contact-btn.secondary {
    background: var(--background-color);
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.contact-btn.secondary:hover {
    background: var(--primary-color);
    color: var(--background-color);
}

/* Footer */
.footer {
    padding: 30px 0;
    text-align: center;
    background-color: var(--light-gray);
}

.copyright {
    color: var(--text-muted);
    font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-container {
        flex-direction: column;
        gap: 20px;
    }

    .nav-menu {
        gap: 20px;
    }

    .hero-container {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
    }

    .hero-content h1 {
        font-size: 2.5rem;
    }

    .hero-subtitle {
        font-size: 1.2rem;
    }

    .projects-grid {
        grid-template-columns: 1fr;
    }

    .skills-grid {
        grid-template-columns: 1fr;
    }

    .timeline {
        padding-left: 20px;
    }

    .timeline-item {
        margin-left: 20px;
    }

    .timeline-item::before {
        left: -36px;
    }

    .contact-buttons {
        flex-direction: column;
        align-items: center;
    }
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}

/* Loading animation */
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Project Detail Page Styles */
.project-detail-hero {
    padding: 120px 20px 60px;
    background: linear-gradient(135deg, var(--light-gray) 0%, var(--background-color) 100%);
    text-align: center;
}

.project-detail-hero h1 {
    font-size: 3rem;
    font-weight: 700;
    color: var(--accent-color);
    margin-bottom: 20px;
}

.project-detail-hero .subtitle {
    font-size: 1.2rem;
    color: var(--text-muted);
    margin-bottom: 30px;
}

.project-detail-hero .achievement {
    font-size: 1.1rem;
    color: var(--primary-color);
    font-weight: 600;
    margin-bottom: 40px;
}

.project-detail-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 20px;
}

.project-detail-section {
    margin-bottom: 50px;
}

.project-detail-section h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--accent-color);
    margin-bottom: 20px;
    text-align: left;
}

.project-detail-section p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--text-light);
    margin-bottom: 20px;
}

.media-placeholder {
    background: var(--light-gray);
    border: 2px dashed var(--border-color);
    border-radius: 12px;
    padding: 40px;
    text-align: center;
    margin: 30px 0;
    color: var(--text-muted);
}

.media-placeholder h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.media-placeholder p {
    font-size: 0.9rem;
    margin: 0;
}

.back-button {
    display: inline-block;
    padding: 12px 24px;
    background: var(--primary-color);
    color: var(--background-color);
    text-decoration: none;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.3s ease;
    margin-bottom: 40px;
}

.back-button:hover {
    background: var(--accent-color);
    transform: translateY(-2px);
}

.project-links {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin-top: 30px;
}

.project-link {
    display: inline-block;
    padding: 10px 20px;
    background: var(--light-gray);
    color: var(--primary-color);
    text-decoration: none;
    border-radius: 6px;
    font-weight: 500;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.project-link:hover {
    background: var(--primary-color);
    color: var(--background-color);
}

.project-link.primary {
    background: var(--primary-color);
    color: var(--background-color);
}

.project-link.primary:hover {
    background: var(--accent-color);
}
