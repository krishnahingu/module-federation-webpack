require('dotenv-webpack').config({ path: './.env' });
console.log('REMOTE_USER:', process.env.REMOTE_USER);
console.log('REMOTE_CREW:', process.env.REMOTE_CREW);