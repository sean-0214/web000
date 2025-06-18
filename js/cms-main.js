// CMS-enabled main JavaScript file
// This file loads content from YAML data files and Markdown content

class CMSContentLoader {
    constructor() {
        this.settings = null;
        this.about = null;
        this.projects = [];
        this.experience = [];
        this.init();
    }

    async init() {
        try {
            await this.loadSettings();
            await this.loadAbout();
            await this.loadProjects();
            await this.loadExperience();
            this.populateContent();
            this.initializeInteractions();
        } catch (error) {
            console.error('Error loading CMS content:', error);
            this.loadFallbackContent();
        }
    }

    async loadSettings() {
        try {
            const response = await fetch('_data/settings.yml');
            const yamlText = await response.text();
            this.settings = this.parseYAML(yamlText);
        } catch (error) {
            console.error('Error loading settings:', error);
            this.settings = this.getFallbackSettings();
        }
    }

    async loadAbout() {
        try {
            const response = await fetch('_data/about.yml');
            const yamlText = await response.text();
            this.about = this.parseYAML(yamlText);
        } catch (error) {
            console.error('Error loading about data:', error);
            this.about = this.getFallbackAbout();
        }
    }

    async loadProjects() {
        const projectFiles = [
            'international-quant-championship.md',
            'point72-competition.md',
            'green-finance.md',
            'wandarwise.md',
            'neural-network.md',
            'asia-ysa.md',
            'blockchain-trading.md',
            'risk-management.md',
            'ml-trading.md',
            'esg-analytics.md',
            'derivatives-pricing.md',
            'credit-scoring.md'
        ];

        for (const file of projectFiles) {
            try {
                const response = await fetch(`content/projects/${file}`);
                if (response.ok) {
                    const content = await response.text();
                    const project = this.parseMarkdown(content);
                    this.projects.push(project);
                }
            } catch (error) {
                console.error(`Error loading project ${file}:`, error);
            }
        }

        // Sort projects by order and featured status
        this.projects.sort((a, b) => {
            if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
            if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
            return (a.frontmatter.order || 999) - (b.frontmatter.order || 999);
        });

        // Add fallback projects if none loaded
        if (this.projects.length === 0) {
            this.projects = this.getFallbackProjects();
        }
    }

    async loadExperience() {
        const experienceFiles = [
            'research-assistant.md',
            'oakcean-capital.md',
            'haitong-international.md',
            'climbing-society.md'
        ];

        for (const file of experienceFiles) {
            try {
                const response = await fetch(`content/experience/${file}`);
                if (response.ok) {
                    const content = await response.text();
                    const experience = this.parseMarkdown(content);
                    this.experience.push(experience);
                }
            } catch (error) {
                console.error(`Error loading experience ${file}:`, error);
            }
        }

        // Sort experience by start date (most recent first)
        this.experience.sort((a, b) => {
            const dateA = new Date(a.frontmatter.start_date || '2020-01-01');
            const dateB = new Date(b.frontmatter.start_date || '2020-01-01');
            return dateB - dateA;
        });

        // Add fallback experience if none loaded
        if (this.experience.length === 0) {
            this.experience = this.getFallbackExperience();
        }
    }

    parseYAML(yamlText) {
        // Simple YAML parser for basic key-value pairs and lists
        const lines = yamlText.split('\n');
        const result = {};
        let currentKey = null;
        let currentList = null;
        let currentObject = null;

        for (let line of lines) {
            line = line.trim();
            if (!line || line.startsWith('#')) continue;

            if (line.includes(':') && !line.startsWith('-')) {
                const [key, ...valueParts] = line.split(':');
                const value = valueParts.join(':').trim();
                
                if (value.startsWith('"') && value.endsWith('"')) {
                    result[key.trim()] = value.slice(1, -1);
                } else if (value === '') {
                    currentKey = key.trim();
                    result[currentKey] = [];
                    currentList = result[currentKey];
                } else {
                    result[key.trim()] = value;
                }
            } else if (line.startsWith('-') && currentList) {
                const item = line.substring(1).trim();
                if (item.includes(':')) {
                    const [itemKey, itemValue] = item.split(':');
                    if (!currentObject) {
                        currentObject = {};
                        currentList.push(currentObject);
                    }
                    currentObject[itemKey.trim()] = itemValue.trim().replace(/"/g, '');
                } else {
                    currentList.push(item.replace(/"/g, ''));
                    currentObject = null;
                }
            }
        }

        return result;
    }

    parseMarkdown(content) {
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);
        
        if (match) {
            const frontmatter = this.parseYAML(match[1]);
            const body = match[2];
            return { frontmatter, body };
        }
        
        return { frontmatter: {}, body: content };
    }

    populateContent() {
        this.populateSettings();
        this.populateAbout();
        this.populateProjects();
        this.populateExperience();
        this.populateSkills();
    }

    populateSettings() {
        if (!this.settings) return;

        // Update page title and meta
        if (this.settings.title) {
            document.getElementById('site-title').textContent = this.settings.title;
            document.title = this.settings.title;
        }
        
        if (this.settings.description) {
            document.getElementById('site-description').setAttribute('content', this.settings.description);
        }

        if (this.settings.author) {
            document.getElementById('site-logo').textContent = this.settings.author;
            document.getElementById('hero-name').textContent = this.settings.author;
        }

        // Update contact links
        if (this.settings.email) {
            const emailLinks = document.querySelectorAll('#email-link, #contact-email');
            emailLinks.forEach(link => {
                link.href = `mailto:${this.settings.email}`;
            });
        }

        if (this.settings.linkedin) {
            const linkedinLinks = document.querySelectorAll('#linkedin-link, #contact-linkedin');
            linkedinLinks.forEach(link => {
                link.href = this.settings.linkedin;
            });
        }

        if (this.settings.github) {
            const githubLinks = document.querySelectorAll('#github-link, #contact-github');
            githubLinks.forEach(link => {
                link.href = this.settings.github;
            });
        }

        if (this.settings.resume) {
            document.getElementById('resume-link').href = this.settings.resume;
        }
    }

    populateAbout() {
        if (!this.about) return;

        if (this.about.intro) {
            document.getElementById('hero-description').textContent = this.about.intro;
        }

        // Populate terminal commands
        if (this.about.terminal_commands) {
            this.startTerminalAnimation(this.about.terminal_commands);
        }
    }

    populateProjects() {
        const container = document.getElementById('projects-container');
        if (!container) return;

        container.innerHTML = '';

        // Show featured projects first, limit to 6 for main page
        const featuredProjects = this.projects.filter(p => p.frontmatter.featured).slice(0, 6);
        const displayProjects = featuredProjects.length > 0 ? featuredProjects : this.projects.slice(0, 6);

        displayProjects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            container.appendChild(projectCard);
        });
    }

    createProjectCard(project) {
        const { frontmatter } = project;
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-project-id', this.slugify(frontmatter.title || 'project'));

        card.innerHTML = `
            <h3>${frontmatter.title || 'Untitled Project'}</h3>
            <p class="project-organization">${frontmatter.organization || ''} • ${frontmatter.achievement || ''}</p>
            <p class="project-description">${frontmatter.short_description || ''}</p>
            <div class="project-tags">
                ${(frontmatter.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;

        card.addEventListener('click', () => {
            this.openProjectDetail(project);
        });

        return card;
    }

    populateExperience() {
        const container = document.getElementById('experience-container');
        if (!container) return;

        container.innerHTML = '';

        this.experience.forEach(exp => {
            const expItem = this.createExperienceItem(exp);
            container.appendChild(expItem);
        });
    }

    createExperienceItem(experience) {
        const { frontmatter } = experience;
        const item = document.createElement('div');
        item.className = 'experience-item';
        item.setAttribute('data-experience-id', this.slugify(frontmatter.title || 'experience'));

        const startDate = new Date(frontmatter.start_date || '2020-01-01');
        const endDate = frontmatter.current ? new Date() : new Date(frontmatter.end_date || '2020-12-31');
        const dateRange = this.formatDateRange(startDate, endDate, frontmatter.current);

        item.innerHTML = `
            <div class="experience-date">${dateRange}</div>
            <div class="experience-content">
                <h3>${frontmatter.title || frontmatter.position || 'Position'}</h3>
                <p class="experience-organization">${frontmatter.organization || ''}</p>
                <p class="experience-description">${frontmatter.short_description || ''}</p>
            </div>
        `;

        item.addEventListener('click', () => {
            this.openExperienceDetail(experience);
        });

        return item;
    }

    populateSkills() {
        const container = document.getElementById('skills-container');
        if (!container || !this.about || !this.about.skills) return;

        container.innerHTML = '';

        this.about.skills.forEach(skillCategory => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category';

            categoryDiv.innerHTML = `
                <h3>${skillCategory.category}</h3>
                <div class="skill-items">
                    ${skillCategory.items.map(item => `<span class="skill-item">${item}</span>`).join('')}
                </div>
            `;

            container.appendChild(categoryDiv);
        });
    }

    startTerminalAnimation(commands) {
        const terminal = document.getElementById('terminal-content');
        if (!terminal) return;

        terminal.innerHTML = '';
        let commandIndex = 0;

        const typeCommand = () => {
            if (commandIndex >= commands.length) {
                commandIndex = 0; // Loop back to start
                setTimeout(() => {
                    terminal.innerHTML = '';
                    typeCommand();
                }, 3000);
                return;
            }

            const command = commands[commandIndex];
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            
            const prompt = document.createElement('span');
            prompt.className = 'terminal-prompt';
            prompt.textContent = 'sean@quantfinance:~$ ';
            
            const commandText = document.createElement('span');
            commandText.className = 'terminal-command';
            
            commandLine.appendChild(prompt);
            commandLine.appendChild(commandText);
            terminal.appendChild(commandLine);

            // Type command
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < command.command.length) {
                    commandText.textContent += command.command[charIndex];
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    
                    // Show output
                    setTimeout(() => {
                        const outputLine = document.createElement('div');
                        outputLine.className = 'terminal-output';
                        outputLine.textContent = `> ${command.output}`;
                        terminal.appendChild(outputLine);
                        
                        commandIndex++;
                        setTimeout(typeCommand, 1500);
                    }, 500);
                }
            }, 50);
        };

        typeCommand();
    }

    openProjectDetail(project) {
        // Create modal or navigate to detail page
        const slug = this.slugify(project.frontmatter.title || 'project');
        window.open(`projects/${slug}.html`, '_blank');
    }

    openExperienceDetail(experience) {
        // Create modal or navigate to detail page
        const slug = this.slugify(experience.frontmatter.title || 'experience');
        window.open(`experience/${slug}.html`, '_blank');
    }

    initializeInteractions() {
        // Smooth scrolling for navigation
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

        // Active navigation highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    formatDateRange(startDate, endDate, isCurrent) {
        const options = { year: 'numeric', month: 'short' };
        const start = startDate.toLocaleDateString('en-US', options);
        const end = isCurrent ? 'Present' : endDate.toLocaleDateString('en-US', options);
        return `${start} - ${end}`;
    }

    // Fallback content methods
    getFallbackSettings() {
        return {
            title: "Sean Chiang - Quantitative Finance Student",
            description: "Passionate about applying machine learning and data science to discover investment opportunities and develop risk management strategies.",
            author: "Sean Chiang",
            email: "sean.chiang@example.com",
            linkedin: "https://linkedin.com/in/seanchiang",
            github: "https://github.com/seanchiang",
            resume: "/assets/documents/sean_chiang_resume.pdf"
        };
    }

    getFallbackAbout() {
        return {
            intro: "Passionate about applying machine learning and data science to discover investment opportunities and develop risk management strategies. Currently studying Computational Finance at City University of Hong Kong.",
            terminal_commands: [
                { command: "whoami", output: "Quantitative Finance Student" },
                { command: "cat achievements.txt", output: "Global 1st Runner-up - Point 72 x Fidelity Competition" },
                { command: "cat achievements.txt", output: "Top 10.08% - International Quant Championship" },
                { command: "python trade_alpha.py", output: "Running alpha generation strategies..." }
            ],
            skills: [
                {
                    category: "Programming Languages",
                    items: ["Python", "R", "SQL", "JavaScript", "C++", "MATLAB"]
                },
                {
                    category: "Financial Technologies",
                    items: ["Bloomberg Terminal", "FactSet", "Wind Database", "Reuters Eikon"]
                }
            ]
        };
    }

    getFallbackProjects() {
        return [
            {
                frontmatter: {
                    title: "International Quant Championship 2024",
                    organization: "WorldQuant",
                    achievement: "Global Top 10.08%",
                    featured: true,
                    order: 1,
                    tags: ["Alpha Strategies", "Python", "Quantitative Research"],
                    short_description: "Led team in developing 3 alpha strategies enhancing trading performance. Advanced to global semi-final among 4,304 teams worldwide."
                }
            }
        ];
    }

    getFallbackExperience() {
        return [
            {
                frontmatter: {
                    title: "Research Assistant - Statistics Department",
                    organization: "City University of Hong Kong",
                    start_date: "2024-09-01",
                    current: true,
                    short_description: "Assisting in quantitative research on an NVIDIA-initiated Neural Network project under Dr. Ivan Au Yeung and Professor Chu Chi Wing."
                }
            }
        ];
    }

    loadFallbackContent() {
        console.log('Loading fallback content...');
        this.settings = this.getFallbackSettings();
        this.about = this.getFallbackAbout();
        this.projects = this.getFallbackProjects();
        this.experience = this.getFallbackExperience();
        this.populateContent();
        this.initializeInteractions();
    }
}

// Initialize CMS content loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CMSContentLoader();
});

// Export for potential use in other scripts
window.CMSContentLoader = CMSContentLoader;

