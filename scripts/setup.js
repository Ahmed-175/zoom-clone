const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log(' Initializing Zoom-Clone project setup...');

// Paths
const backendExample = path.join(__dirname, '../apps/backend/.env.example');
const backendEnv = path.join(__dirname, '../apps/backend/.env');
const frontendExample = path.join(__dirname, '../apps/frontend/.env.example');
const frontendEnv = path.join(__dirname, '../apps/frontend/.env');

// Helper to copy file
function copyEnv(src, dest, label) {
  if (fs.existsSync(dest)) {
    console.log(`${label} .env already exists. Skipping copy.`);
  } else if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Created ${label} .env from .env.example`);
  } else {
    console.warn(`Warning: ${label} .env.example not found at ${src}`);
  }
}

// 1. Copy env files
copyEnv(backendExample, backendEnv, 'Backend');
copyEnv(frontendExample, frontendEnv, 'Frontend');

// 2. Install dependencies (if node_modules does not exist)
const rootNodeModules = path.join(__dirname, '../node_modules');
if (!fs.existsSync(rootNodeModules)) {
  console.log(' Installing project dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('Dependencies installed successfully.');
  } catch (error) {
    console.error('Failed to install dependencies. Please run "npm install" manually.', error);
  }
} else {
  console.log('node_modules already exists. Skipping npm install.');
}

// 3. Generate Prisma client
console.log('Generating Prisma Client...');
try {
  execSync('npx prisma generate --schema=apps/backend/prisma/schema.prisma', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  console.log('Prisma client generated successfully.');
} catch (error) {
  console.error('Failed to generate Prisma Client. Please run "npx prisma generate" manually in the backend.', error);
}

console.log('Setup complete!');
console.log('--------------------------------------------------');
console.log('Next Steps:');
console.log('1. Start the PostgreSQL database:');
console.log('   docker compose up -d');
console.log('2. Run database migrations:');
console.log('   npx prisma db push --schema=apps/backend/prisma/schema.prisma');
console.log('3. Start the application in development mode:');
console.log('   npm run dev');
console.log('--------------------------------------------------');
