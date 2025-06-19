/**
 * Sean Chiang Website Build Script
 * 
 * This script processes content files managed by Decap CMS and injects
 * their content into HTML templates to generate the final website.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const marked = require('marked');
const glob = require('glob');

// Paths
const contentProjectsDir = path.join(__dirname, 'content/projects');
const contentExperienceDir = path.join(__dirname, 'content/experience');
const dataDir = path.join(__dirname, '_data');
const projectsOutputDir = path.join(__dirname, 'projects');
const experienceOutputDir = path.join(__dirname, 'experience');

// Ensure output directories exist
if (!fs.existsSync(projectsOutputDir)) {
  fs.mkdirSync(projectsOutputDir, { recursive: true });
}

if (!fs.existsSync(experienceOutputDir)) {
  fs.mkdirSync(experienceOutputDir, { recursive: true });
}

// Load template HTML files
const projectTemplate = fs.readFileSync(path.join(__dirname, 'templates/project.html'), 'utf8');
const experienceTemplate = fs.readFileSync(path.join(__dirname, 'templates/experience.html'), 'utf8');
const indexTemplate = fs.readFileSync(path.join(__dirname, 'templates/index.html'), 'utf8');

// Parse frontmatter from markdown files
function parseFrontmatter(fileContent) {
  const matches = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!matches) return { attributes: {}, body: fileContent };
  
  try {
    const attributes = yaml.load(matches[1]);
    const body = matches[2];
    return { attributes, body };
  } catch (e) {
    console.error('Error parsing frontmatter:', e);
    return { attributes: {}, body: fileContent };
  }
}

// Process markdown to HTML
function processMarkdown(content) {
  return marked.parse(content);
}

// Process all project files
function processProjects() {
  console.log('Processing projects...');
  const projectFiles = glob.sync(path.join(contentProjectsDir, '*.md'));
  const projects = [];
  
  projectFiles.forEach(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { attributes, body } = parseFrontmatter(fileContent);
    const htmlContent = processMarkdown(body);
    
    projects.push({
      ...attributes,
      content: htmlContent,
      slug: path.basename(filePath, '.md')
    });
    
    // Generate individual project page
    let projectHtml = projectTemplate
      .replace(/{{title}}/g, attributes.title || 'Project')
      .replace(/{{subtitle}}/g, attributes.subtitle || '')
      .replace(/{{organization}}/g, attributes.organization || '')
      .replace(/{{achievement}}/g, attributes.achievement || '')
      .replace(/{{date}}/g, attributes.date ? new Date(attributes.date).toLocaleDateString() : '')
      .replace(/{{content}}/g, htmlContent)
      .replace(/{{hero_image}}/g, attributes.hero_image || '');
    
    // Handle technologies
    if (attributes.technologies && attributes.technologies.length) {
      let techHtml = '<ul class="technologies-list">';
      attributes.technologies.forEach(tech => {
        techHtml += `<li>${tech}</li>`;
      });
      techHtml += '</ul>';
      projectHtml = projectHtml.replace(/{{technologies}}/g, techHtml);
    } else {
      projectHtml = projectHtml.replace(/{{technologies}}/g, '');
    }
    
    // Handle project links
    if (attributes.links && attributes.links.length) {
      let linksHtml = '<div class="project-links">';
      attributes.links.forEach(link => {
        linksHtml += `<a href="${link.url}" class="project-link ${link.type}">${link.title}</a>`;
      });
      linksHtml += '</div>';
      projectHtml = projectHtml.replace(/{{project_links}}/g, linksHtml);
    } else {
      projectHtml = projectHtml.replace(/{{project_links}}/g, '');
    }
    
    fs.writeFileSync(path.join(projectsOutputDir, `${attributes.slug || path.basename(filePath, '.md')}.html`), projectHtml);
  });
  
  // Sort projects by order field
  projects.sort((a, b) => (a.order || 999) - (b.order || 999));
  
  return projects;
}

// Process all experience files
function processExperience() {
  console.log('Processing experience...');
  const experienceFiles = glob.sync(path.join(contentExperienceDir, '*.md'));
  const experiences = [];
  
  experienceFiles.forEach(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { attributes, body } = parseFrontmatter(fileContent);
    const htmlContent = processMarkdown(body);
    
    experiences.push({
      ...attributes,
      content: htmlContent,
      slug: path.basename(filePath, '.md')
    });
    
    // Generate individual experience page
    let experienceHtml = experienceTemplate
      .replace(/{{title}}/g, attributes.title || 'Experience')
      .replace(/{{position}}/g, attributes.position || '')
      .replace(/{{organization}}/g, attributes.organization || '')
      .replace(/{{location}}/g, attributes.location || '')
      .replace(/{{start_date}}/g, attributes.start_date ? new Date(attributes.start_date).toLocaleDateString() : '')
      .replace(/{{end_date}}/g, attributes.end_date ? new Date(attributes.end_date).toLocaleDateString() : 'Present')
      .replace(/{{content}}/g, htmlContent)
      .replace(/{{hero_image}}/g, attributes.hero_image || '');
    
    if (attributes.responsibilities && attributes.responsibilities.length) {
      let respHtml = '<ul class="responsibilities-list">';
      attributes.responsibilities.forEach(resp => {
        respHtml += `<li>${resp}</li>`;
      });
      respHtml += '</ul>';
      experienceHtml = experienceHtml.replace(/{{responsibilities}}/g, respHtml);
    } else {
      experienceHtml = experienceHtml.replace(/{{responsibilities}}/g, '');
    }
    
    if (attributes.achievements && attributes.achievements.length) {
      let achHtml = '<ul class="achievements-list">';
      attributes.achievements.forEach(ach => {
        achHtml += `<li>${ach}</li>`;
      });
      achHtml += '</ul>';
      experienceHtml = experienceHtml.replace(/{{achievements}}/g, achHtml);
    } else {
      experienceHtml = experienceHtml.replace(/{{achievements}}/g, '');
    }
    
    fs.writeFileSync(path.join(experienceOutputDir, `${attributes.slug || path.basename(filePath, '.md')}.html`), experienceHtml);
  });
  
  // Sort experiences by order field
  experiences.sort((a, b) => (a.order || 999) - (b.order || 999));
  
  return experiences;
}

// Process site settings
function processSettings() {
  console.log('Processing site settings...');
  const settingsPath = path.join(dataDir, 'settings.yml');
  if (!fs.existsSync(settingsPath)) {
    console.warn('Settings file not found');
    return {};
  }
  
  const settingsContent = fs.readFileSync(settingsPath, 'utf8');
  return yaml.load(settingsContent);
}

// Process about page data
function processAbout() {
  console.log('Processing about data...');
  const aboutPath = path.join(dataDir, 'about.yml');
  if (!fs.existsSync(aboutPath)) {
    console.warn('About file not found');
    return {};
  }
  
  const aboutContent = fs.readFileSync(aboutPath, 'utf8');
  return yaml.load(aboutContent);
}

// Generate index page
function generateIndexPage(projects, experiences, settings, about) {
  console.log('Generating index page...');
  let indexHtml = indexTemplate;
  
  // Replace settings data
  if (settings) {
    indexHtml = indexHtml.replace(/{{site_title}}/g, settings.title || 'Sean Chiang')
      .replace(/{{description}}/g, settings.description || '')
      .replace(/{{author}}/g, settings.author || 'Sean Chiang')
      .replace(/{{profile_image}}/g, settings.profile_image || '')
      .replace(/{{email}}/g, settings.email || '')
      .replace(/{{linkedin}}/g, settings.linkedin || '#')
      .replace(/{{github}}/g, settings.github || '#')
      .replace(/{{resume}}/g, settings.resume || '#');
  }
  
  // Replace about data
  if (about) {
    indexHtml = indexHtml.replace(/{{about_intro}}/g, about.intro || '');
    
    // Terminal commands
    if (about.terminal_commands && about.terminal_commands.length) {
      let commandsHtml = '';
      about.terminal_commands.forEach(cmd => {
        commandsHtml += `<div class="terminal-line"><span class="prompt">$</span> ${cmd.command}</div>`;
        commandsHtml += `<div class="terminal-output">${cmd.output}</div>`;
      });
      indexHtml = indexHtml.replace(/{{terminal_commands}}/g, commandsHtml);
    } else {
      indexHtml = indexHtml.replace(/{{terminal_commands}}/g, '');
    }
    
    // Skills
    if (about.skills && about.skills.length) {
      let skillsHtml = '';
      about.skills.forEach(skill => {
        skillsHtml += `<div class="skill-category"><h3>${skill.category}</h3><ul>`;
        if (skill.items && skill.items.length) {
          skill.items.forEach(item => {
            skillsHtml += `<li>${item}</li>`;
          });
        }
        skillsHtml += '</ul></div>';
      });
      indexHtml = indexHtml.replace(/{{skills}}/g, skillsHtml);
    } else {
      indexHtml = indexHtml.replace(/{{skills}}/g, '');
    }
    
    // Interests
    if (about.interests && about.interests.length) {
      let interestsHtml = '<ul class="interests-list">';
      about.interests.forEach(interest => {
        interestsHtml += `<li>${interest}</li>`;
      });
      interestsHtml += '</ul>';
      indexHtml = indexHtml.replace(/{{interests}}/g, interestsHtml);
    } else {
      indexHtml = indexHtml.replace(/{{interests}}/g, '');
    }
  }
  
  // Projects
  if (projects && projects.length) {
    let projectsHtml = '';
    projects.forEach(project => {
      projectsHtml += `
        <div class="project-card${project.featured ? ' featured' : ''}">
          <div class="project-image">
            <img src="${project.hero_image || '/assets/images/default-project.jpg'}" alt="${project.title}">
          </div>
          <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <h4 class="project-subtitle">${project.subtitle}</h4>
            <p class="project-description">${project.short_description}</p>
            <div class="project-meta">
              <span class="project-organization">${project.organization}</span>
              <span class="project-date">${project.date ? new Date(project.date).toLocaleDateString() : ''}</span>
            </div>
            <a href="/projects/${project.slug}.html" class="view-project-btn">View Project</a>
          </div>
        </div>`;
    });
    indexHtml = indexHtml.replace(/{{projects}}/g, projectsHtml);
  } else {
    indexHtml = indexHtml.replace(/{{projects}}/g, '');
  }
  
  // Experience
  if (experiences && experiences.length) {
    let experienceHtml = '';
    experiences.forEach(exp => {
      experienceHtml += `
        <div class="timeline-item">
          <div class="timeline-content">
            <h3 class="timeline-title">${exp.position}</h3>
            <h4 class="timeline-organization">${exp.title}</h4>
            <div class="timeline-period">
              <span class="timeline-date">${exp.start_date ? new Date(exp.start_date).toLocaleDateString() : ''} - ${exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}</span>
              <span class="timeline-location">${exp.location}</span>
            </div>
            <p class="timeline-description">${exp.short_description}</p>
            <a href="/experience/${exp.slug}.html" class="view-experience-btn">View Details</a>
          </div>
        </div>`;
    });
    indexHtml = indexHtml.replace(/{{experience}}/g, experienceHtml);
  } else {
    indexHtml = indexHtml.replace(/{{experience}}/g, '');
  }
  
  fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml);
}

// Main build process
console.log('Starting build process...');

try {
  // Extract templates from existing HTML first
  console.log('Extracting templates from existing HTML...');
  
  // Extract project template from an existing project page if template doesn't exist
  if (!fs.existsSync(path.join(__dirname, 'templates/project.html'))) {
    console.log('Creating project template from existing project page...');
    const projectFiles = glob.sync(path.join(__dirname, 'projects/*.html'));
    if (projectFiles.length > 0) {
      // Create templates directory if it doesn't exist
      if (!fs.existsSync(path.join(__dirname, 'templates'))) {
        fs.mkdirSync(path.join(__dirname, 'templates'), { recursive: true });
      }
      
      const projectHtml = fs.readFileSync(projectFiles[0], 'utf8');
      fs.writeFileSync(path.join(__dirname, 'templates/project.html'), projectHtml);
    } else {
      console.error('No existing project HTML files found to use as template');
      process.exit(1);
    }
  }
  
  // Extract experience template from an existing experience page
  if (!fs.existsSync(path.join(__dirname, 'templates/experience.html'))) {
    console.log('Creating experience template from existing experience page...');
    const expFiles = glob.sync(path.join(__dirname, 'experience/*.html'));
    if (expFiles.length > 0) {
      // Create templates directory if it doesn't exist
      if (!fs.existsSync(path.join(__dirname, 'templates'))) {
        fs.mkdirSync(path.join(__dirname, 'templates'), { recursive: true });
      }
      
      const expHtml = fs.readFileSync(expFiles[0], 'utf8');
      fs.writeFileSync(path.join(__dirname, 'templates/experience.html'), expHtml);
    } else {
      console.error('No existing experience HTML files found to use as template');
      process.exit(1);
    }
  }
  
  // Extract index template
  if (!fs.existsSync(path.join(__dirname, 'templates/index.html'))) {
    console.log('Creating index template from existing index page...');
    if (fs.existsSync(path.join(__dirname, 'index.html'))) {
      // Create templates directory if it doesn't exist
      if (!fs.existsSync(path.join(__dirname, 'templates'))) {
        fs.mkdirSync(path.join(__dirname, 'templates'), { recursive: true });
      }
      
      const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
      fs.writeFileSync(path.join(__dirname, 'templates/index.html'), indexHtml);
    } else {
      console.error('No existing index.html found to use as template');
      process.exit(1);
    }
  }
  
  // Process all content and data
  const projects = processProjects();
  const experiences = processExperience();
  const settings = processSettings();
  const about = processAbout();
  
  // Generate the main index page
  generateIndexPage(projects, experiences, settings, about);
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
