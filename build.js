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

// Check both content/ and _data/ directories for configuration files
const dataDir = fs.existsSync(path.join(__dirname, 'content/settings.yml')) 
  ? path.join(__dirname, 'content') 
  : path.join(__dirname, '_data');
const contentDir = path.join(__dirname, 'content');

console.log(`Using data directory: ${dataDir}`);
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
  console.log(`Looking for projects in: ${contentProjectsDir}`);
  
  // Use direct file system access instead of glob
  let projectFiles = [];
  try {
    const files = fs.readdirSync(contentProjectsDir);
    projectFiles = files
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(contentProjectsDir, file));
  } catch (err) {
    console.error('Error reading projects directory:', err.message);
  }
  
  console.log(`Found ${projectFiles.length} project files: ${projectFiles.map(f => path.basename(f)).join(', ')}`);
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
  
  console.log('Projects:', projects); // Added debug logging
  
  return projects;
}

// Process experience files
function processExperience() {
  console.log('Processing experience...');
  console.log(`Looking for experience files in: ${contentExperienceDir}`);
  
  // Use direct file system access instead of glob
  let experienceFiles = [];
  try {
    const files = fs.readdirSync(contentExperienceDir);
    experienceFiles = files
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(contentExperienceDir, file));
  } catch (err) {
    console.error('Error reading experience directory:', err.message);
  }
  
  console.log(`Found ${experienceFiles.length} experience files: ${experienceFiles.map(f => path.basename(f)).join(', ')}`);
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
  // Try both content/ and _data/ directories
  let settingsPath = path.join(dataDir, 'settings.yml');
  
  // Fallback to alternate location if not found
  if (!fs.existsSync(settingsPath)) {
    const altDir = dataDir.includes('content') 
      ? path.join(__dirname, '_data') 
      : path.join(__dirname, 'content');
    settingsPath = path.join(altDir, 'settings.yml');
  }
  
  if (!fs.existsSync(settingsPath)) {
    console.warn('Settings file not found in either content/ or _data/ directories');
    return {};
  }
  
  console.log(`Loading settings from: ${settingsPath}`);
  const settingsContent = fs.readFileSync(settingsPath, 'utf8');
  return yaml.load(settingsContent);
}

// Process about page data
function processAbout() {
  console.log('Processing about data...');
  // Try both content/ and _data/ directories
  let aboutPath = path.join(dataDir, 'about.yml');
  
  // Fallback to alternate location if not found
  if (!fs.existsSync(aboutPath)) {
    const altDir = dataDir.includes('content') 
      ? path.join(__dirname, '_data') 
      : path.join(__dirname, 'content');
    aboutPath = path.join(altDir, 'about.yml');
  }
  
  if (!fs.existsSync(aboutPath)) {
    console.warn('About file not found in either content/ or _data/ directories');
    return {};
  }
  
  console.log(`Loading about data from: ${aboutPath}`);
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
      about.terminal_commands.forEach((cmd, index) => {
        // Add command with prompt
        commandsHtml += `<div class="terminal-line"><span class="terminal-prompt">$</span> <span class="terminal-command">${cmd.command}</span></div>`;
        
        // Add output with color variations
        let output = cmd.output;
        
        // Add some yellow highlights for important parts in the output
        if (index === 0) { // For whoami command
          output = `<span class="terminal-highlight">Quantitative Finance</span> Student`;
        } else if (index <= 3) { // For achievement commands
          // Extract the achievement parts to highlight
          if (output.includes('Point 72')) {
            output = output.replace('Point 72', `<span class="terminal-highlight">Point 72</span>`);
          } else if (output.includes('Top 10.08%')) {
            output = output.replace('Top 10.08%', `<span class="terminal-highlight">Top 10.08%</span>`);
          } else if (output.includes('Ex-SFC')) {
            output = output.replace('Ex-SFC', `<span class="terminal-highlight">Ex-SFC</span>`);
          }
        } else if (index === 4) { // For the Python command
          output = `Running <span class="terminal-highlight">alpha generation</span> strategies...`;
        }
        
        commandsHtml += `<div class="terminal-output">${output}</div>`;
      });
      indexHtml = indexHtml.replace(/{{terminal_commands}}/g, commandsHtml);
    } else {
      indexHtml = indexHtml.replace(/{{terminal_commands}}/g, '');
    }
    
    // About intro
    if (about.intro) {
      indexHtml = indexHtml.replace(/{{about_intro}}/g, about.intro);
    } else {
      indexHtml = indexHtml.replace(/{{about_intro}}/g, '');
    }
    
    // Skills
    if (about.skills && about.skills.length) {
      let skillsHtml = '';
      about.skills.forEach(skillCategory => {
        skillsHtml += `
          <div class="skill-category">
            <h3>${skillCategory.category}</h3>
            <ul class="skill-list">`;
        
        if (skillCategory.items && skillCategory.items.length) {
          skillCategory.items.forEach(skill => {
            skillsHtml += `<li>${skill}</li>`;
          });
        }
        
        skillsHtml += `
            </ul>
          </div>`;
      });
      
      indexHtml = indexHtml.replace(/{{skills}}/g, skillsHtml);
    } else {
      indexHtml = indexHtml.replace(/{{skills}}/g, '');
    }
    
    // Interests
    if (about.interests && about.interests.length) {
      let interestsHtml = '';
      
      about.interests.forEach(interest => {
        if (typeof interest === 'object') {
          interestsHtml += `
            <div class="interest-item">
              <div class="interest-name">${interest.name}</div>
              <div class="interest-description">${interest.description}</div>
            </div>`;
        } else {
          interestsHtml += `
            <div class="interest-item">
              <div class="interest-name">${interest}</div>
            </div>`;
        }
      });
      
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
        <a href="/projects/${project.slug}.html" class="project-card-link">
          <div class="project-card${project.featured ? ' featured' : ''}" data-project-id="${project.slug}">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-subtitle">${project.organization || ''} ${project.achievement ? '• ' + project.achievement : ''}</p>
            <p class="project-description">
              ${project.short_description || ''}
            </p>
            <div class="project-footer">
              <div class="project-tags">
                ${project.tags && project.tags.length ? project.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
              </div>
            </div>
          </div>
        </a>`;
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
        <a href="/experience/${exp.slug}.html" class="timeline-item-link">
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-date">${exp.start_date || ''} — ${exp.end_date || 'Present'}</div>
              <h3 class="timeline-title">${exp.position || ''}</h3>
              <p class="timeline-company">${exp.organization || ''} • ${exp.location || ''}</p>
              <p class="timeline-description">${exp.short_description || ''}</p>
            </div>
          </div>
        </a>`;
    });
    indexHtml = indexHtml.replace(/{{experience}}/g, experienceHtml);
  } else {
    indexHtml = indexHtml.replace(/{{experience}}/g, '');
  }
  
  fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml);
}

// Main build process
console.log('Starting build process...');
console.log('Working directory: ' + __dirname);

try {
  // Make sure content directories exist
  if (!fs.existsSync(contentProjectsDir)) {
    console.log(`Creating projects directory at ${contentProjectsDir}`);
    fs.mkdirSync(contentProjectsDir, { recursive: true });
  }
  
  if (!fs.existsSync(contentExperienceDir)) {
    console.log(`Creating experience directory at ${contentExperienceDir}`);
    fs.mkdirSync(contentExperienceDir, { recursive: true });
  }

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
  let projects = processProjects();
  let experiences = processExperience();
  const settings = processSettings();
  const about = processAbout();
  
  // Verify we have content
  if (!projects || projects.length === 0) {
    console.warn('No projects found, creating sample project');
    projects = [{
      title: 'Sample Project',
      organization: 'Example Organization',
      achievement: 'First Place',
      short_description: 'This is a sample project to ensure the projects section displays properly.',
      tags: ['Sample', 'Demo', 'Test'],
      slug: 'sample-project',
      featured: true
    }];
  }
  
  if (!experiences || experiences.length === 0) {
    console.warn('No experiences found, creating sample experience');
    experiences = [{
      position: 'Sample Position',
      organization: 'Example Company',
      start_date: '2023-01-01',
      end_date: '2024-01-01',
      location: 'Hong Kong',
      short_description: 'This is a sample experience to ensure the experience section displays properly.',
      slug: 'sample-experience'
    }];
  }
  
  console.log(`Projects count: ${projects.length}`);
  console.log(`Experiences count: ${experiences.length}`);
  
  // Generate the main index page
  console.log('Generating index page with projects and experiences data...');
  generateIndexPage(projects, experiences, settings, about);
  
  console.log('Build completed successfully!');
  console.log('Output written to index.html');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
