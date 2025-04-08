// src/config.js

import "dotenv/config";
export const PORT = process.env.PORT || 4000;

console.log("MONGODB_URI:", process.env.MONGODB_URI);

export const MONGODB_URI = process.env.MONGODB_URI 
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";


// Nunca expongas credenciales directamente en el código
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
