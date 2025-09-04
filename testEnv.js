import dotenv from 'dotenv';
import path from 'path';

// Explicitly load .env
dotenv.config({ path: path.resolve('./.env') });

console.log('TEST_ENV:', process.env.TEST_ENV);
console.log("Google Maps key:", process.env.GOOGLE_MAPS_API_KEY);