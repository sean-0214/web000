/**
 * Debug script to find files directly using Node.js fs module
 */

const fs = require('fs');
const path = require('path');

// Paths to check
const contentDir = path.join(__dirname, 'content');
const projectsDir = path.join(contentDir, 'projects');
const experienceDir = path.join(contentDir, 'experience');

console.log('Debug file paths:');
console.log('Current directory:', __dirname);
console.log('Content directory exists:', fs.existsSync(contentDir));
console.log('Projects directory exists:', fs.existsSync(projectsDir));
console.log('Experience directory exists:', fs.existsSync(experienceDir));

// List files directly using fs.readdirSync
console.log('\n--- Projects directory contents ---');
try {
  const projectFiles = fs.readdirSync(projectsDir);
  console.log(`Found ${projectFiles.length} files in projects directory`);
  projectFiles.forEach(file => {
    const filePath = path.join(projectsDir, file);
    const stats = fs.statSync(filePath);
    console.log(`- ${file} (${stats.isDirectory() ? 'directory' : 'file'}, ${stats.size} bytes)`);
  });
} catch (err) {
  console.error('Error reading projects directory:', err.message);
}

console.log('\n--- Experience directory contents ---');
try {
  const experienceFiles = fs.readdirSync(experienceDir);
  console.log(`Found ${experienceFiles.length} files in experience directory`);
  experienceFiles.forEach(file => {
    const filePath = path.join(experienceDir, file);
    const stats = fs.statSync(filePath);
    console.log(`- ${file} (${stats.isDirectory() ? 'directory' : 'file'}, ${stats.size} bytes)`);
  });
} catch (err) {
  console.error('Error reading experience directory:', err.message);
}

// Try alternate directory paths
console.log('\n--- Checking alternate paths ---');
const alternateProjectsDir = path.resolve('./content/projects');
const alternateExperienceDir = path.resolve('./content/experience');

console.log('Alternate projects directory:', alternateProjectsDir);
console.log('Alternate experience directory:', alternateExperienceDir);

console.log('Alternate projects directory exists:', fs.existsSync(alternateProjectsDir));
console.log('Alternate experience directory exists:', fs.existsSync(alternateExperienceDir));
