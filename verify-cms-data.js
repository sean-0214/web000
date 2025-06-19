/**
 * CMS Data Verification Script
 * 
 * This script verifies that content files exist in the correct locations
 * and syncs data between content/ and _data/ directories if needed.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Check both potential content directories
const contentDir = path.join(__dirname, 'content');
const dataDir = path.join(__dirname, '_data');

// Create directories if they don't exist
if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
}

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Files to sync between directories
const filesToSync = [
    { name: 'settings.yml', required: true },
    { name: 'about.yml', required: true }
];

// Function to sync files between content/ and _data/ directories
function syncContentFiles() {
    filesToSync.forEach(file => {
        const contentFilePath = path.join(contentDir, file.name);
        const dataFilePath = path.join(dataDir, file.name);
        
        // Check if file exists in content directory
        const contentFileExists = fs.existsSync(contentFilePath);
        
        // Check if file exists in _data directory
        const dataFileExists = fs.existsSync(dataFilePath);
        
        if (contentFileExists && !dataFileExists) {
            // Copy from content/ to _data/
            console.log(`Syncing ${file.name} from content/ to _data/`);
            const content = fs.readFileSync(contentFilePath, 'utf8');
            fs.writeFileSync(dataFilePath, content);
        } 
        else if (!contentFileExists && dataFileExists) {
            // Copy from _data/ to content/
            console.log(`Syncing ${file.name} from _data/ to content/`);
            const content = fs.readFileSync(dataFilePath, 'utf8');
            fs.writeFileSync(contentFilePath, content);
        }
        else if (!contentFileExists && !dataFileExists && file.required) {
            // Create empty template if both don't exist
            console.log(`WARNING: ${file.name} not found in either directory. Creating template files.`);
            let templateContent = '';
            
            if (file.name === 'settings.yml') {
                templateContent = `title: Sean Chiang - Quantitative Finance Student
description: Passionate about applying machine learning and data science to discover investment opportunities and develop risk management strategies.
author: Sean Chiang
profile_image: /assets/images/sean_chiang_profile.jpg
email: sean.chiang@example.com
linkedin: https://linkedin.com/in/seanchiang
github: https://github.com/seanchiang
resume: /assets/documents/sean_chiang_resume.pdf
`;
            } else if (file.name === 'about.yml') {
                templateContent = `intro: Passionate about applying machine learning and data science to discover investment opportunities and develop risk management strategies. Currently studying Computational Finance at City University of Hong Kong.

terminal_commands:
  - command: whoami
    output: Quantitative Finance Student
  - command: cat achievements.txt
    output: Global 1st Runner-up - Point 72 x Fidelity Competition
  - command: cat achievements.txt
    output: Top 10.08% - International Quant Championship
  - command: cat achievements.txt
    output: Ex-SFC Type 1 Licensed Professional
  - command: python trade_alpha.py
    output: Running alpha generation strategies...

skills:
  - category: Programming Languages
    items:
      - Python
      - R
      - SQL
      - JavaScript
  - category: Financial Technologies
    items:
      - Bloomberg Terminal
      - FactSet
      - Wind Database

interests:
  - Quantitative Finance
  - Machine Learning
  - Rock Climbing
`;
            }
            
            fs.writeFileSync(contentFilePath, templateContent);
            fs.writeFileSync(dataFilePath, templateContent);
        }
        else if (contentFileExists && dataFileExists) {
            // Compare content and sync if different (use content/ as source of truth)
            const contentData = fs.readFileSync(contentFilePath, 'utf8');
            const dataData = fs.readFileSync(dataFilePath, 'utf8');
            
            if (contentData !== dataData) {
                console.log(`Content mismatch in ${file.name}. Syncing from content/ to _data/`);
                fs.writeFileSync(dataFilePath, contentData);
            } else {
                console.log(`${file.name} is in sync across directories`);
            }
        }
    });
}

// Ensure project and experience directories exist
const projectsDir = path.join(contentDir, 'projects');
const experienceDir = path.join(contentDir, 'experience');

if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
}

if (!fs.existsSync(experienceDir)) {
    fs.mkdirSync(experienceDir, { recursive: true });
}

// Run the sync
console.log('Verifying CMS content files...');
syncContentFiles();
console.log('CMS content verification complete!');
