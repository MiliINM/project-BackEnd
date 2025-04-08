import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create transporter with verification
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  // Add DKIM and SPF support if available
  dkim: process.env.DKIM_PRIVATE_KEY ? {
    domainName: process.env.DKIM_DOMAIN,
    keySelector: process.env.DKIM_SELECTOR,
    privateKey: process.env.DKIM_PRIVATE_KEY
  } : undefined,
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error("Email configuration error:", error);
  } else {
    console.log("Server is ready to send emails");
  }
});

export async function enviarMailVerificacion(direccion, token) {
  try {
    // Debug logs
    console.log("Attempting to send email to:", direccion);
    
    // Use a more professional email template
    const info = await transporter.sendMail({
      from: `"MERN Tasks" <${process.env.EMAIL_USER}>`, // More professional sender name
      to: direccion,
      subject: "Verify Your Email - MERN Tasks",
      headers: {
        'X-Priority': '1', // High priority
        'Importance': 'high',
        'X-MSMail-Priority': 'High'
      },
      html: crearMailVerificacion(token),
    });    
    
    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, error: error.message };
  }
}

function crearMailVerificacion(token) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 30px;
            border: 1px solid #ddd;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
            margin-bottom: 20px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #ec4899;
        }
        .button {
            display: inline-block;
            background-color: #ec4899;
            color: white !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            margin: 20px 0;
            font-weight: bold;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
        .verification-link {
            word-break: break-all;
            color: #0066cc;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">MERN Tasks</div>
        </div>
        
        <h2>Verify Your Email Address</h2>
        
        <p>Thank you for registering with MERN Tasks. To complete your registration and access all features, please verify your email address by clicking the button below:</p>
        
        <div style="text-align: center;">
            <a href="${process.env.FRONTEND_URL}/verify/${token}" class="button">Verify My Email</a>
        </div>
        
        <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
        
        <p>This verification link will expire in 24 hours.</p>
        
        <p>If you did not create an account with MERN Tasks, please disregard this email.</p>
        
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} MERN Tasks. All rights reserved.</p>
            <p>This is an automated message, please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
`;
}



