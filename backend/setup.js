const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envPath = path.join(__dirname, '.env');

const questions = [
  {
    name: 'PORT',
    message: 'Enter port number (default: 3000): ',
    default: '3000'
  },
  {
    name: 'MONGODB_URI',
    message: 'Enter MongoDB URI: ',
    default: 'mongodb+srv://demonsaint5678:fT5QE5fBritoF9rs@cluster0.4q6pezk.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'
  },
  {
    name: 'JWT_SECRET',
    message: 'Enter JWT secret (default: your_super_secret_jwt_key_change_this_in_production): ',
    default: 'your_super_secret_jwt_key_change_this_in_production'
  },
  {
    name: 'ADMIN_PASSWORD',
    message: 'Enter admin password (default: admin123): ',
    default: 'admin123'
  },
  {
    name: 'SMTP_USER',
    message: 'Enter SMTP user email (default: demonemperor675@gmail.com): ',
    default: 'demonemperor675@gmail.com'
  },
  {
    name: 'SMTP_PASS',
    message: 'Enter SMTP password (default: puap lkpi ilti rmuo): ',
    default: 'puap lkpi ilti rmuo'
  }
];

const envVars = {};

function askQuestion(index) {
  if (index === questions.length) {
    const envContent = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    fs.writeFileSync(envPath, envContent);
    console.log('\nEnvironment variables have been set up successfully!');
    rl.close();
    return;
  }

  const question = questions[index];
  rl.question(question.message, (answer) => {
    envVars[question.name] = answer || question.default;
    askQuestion(index + 1);
  });
}

console.log('Setting up environment variables...\n');
askQuestion(0); 