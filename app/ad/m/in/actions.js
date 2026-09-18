"use server";

import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

export async function loginAdmin(email, password) {
  const envEmail = process.env.ADMIN_EMAIL;
  const envPassword = process.env.ADMIN_PASSWORD;

  if (email === envEmail && password === envPassword) {
    cookies().set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return { success: true };
  } else {
    return { success: false, error: "Invalid credentials." };
  }
}

export async function logoutAdmin() {
  cookies().delete('admin_auth');
}

export async function resetAdminPassword(newPassword) {
  try {
    const envPath = path.join(process.cwd(), '.env');
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Replace the password line or append it if it doesn't exist
    const passwordRegex = /^ADMIN_PASSWORD=.*$/m;
    if (passwordRegex.test(envContent)) {
      envContent = envContent.replace(passwordRegex, `ADMIN_PASSWORD=${newPassword}`);
    } else {
      envContent += `\nADMIN_PASSWORD=${newPassword}`;
    }
    
    fs.writeFileSync(envPath, envContent);
    
    // Also update the current process.env so it works immediately without restart
    process.env.ADMIN_PASSWORD = newPassword;
    
    return { success: true };
  } catch (error) {
    console.error("Failed to reset password:", error);
    return { success: false, error: "Failed to reset password." };
  }
}
