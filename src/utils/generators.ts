/**
 * Functions to generate random passwords and emails
 */

// Characters used for password generation
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

/**
 * Generate a random password based on options
 */
export function generatePassword(
  length: number = 12,
  includeUppercase: boolean = true,
  includeLowercase: boolean = true,
  includeNumbers: boolean = true,
  includeSymbols: boolean = true
): string {
  let charset = '';
  if (includeUppercase) charset += uppercaseChars;
  if (includeLowercase) charset += lowercaseChars;
  if (includeNumbers) charset += numberChars;
  if (includeSymbols) charset += symbolChars;
  
  // Default to lowercase + numbers if nothing selected
  if (charset === '') charset = lowercaseChars + numberChars;
  
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

/**
 * Generate a random email address
 */
export function generateEmail(): string {
  const domains = [
    'gmail.com', 
    'yahoo.com', 
    'hotmail.com', 
    'outlook.com', 
    'protonmail.com',
    'securepass.com', 
    'fastmail.com', 
    'icloud.com'
  ];
  const usernameLength = Math.floor(Math.random() * 8) + 6; // 6-14 chars
  
  let username = '';
  for (let i = 0; i < usernameLength; i++) {
    const charset = lowercaseChars + numberChars;
    const randomIndex = Math.floor(Math.random() * charset.length);
    username += charset[randomIndex];
  }
  
  const domainIndex = Math.floor(Math.random() * domains.length);
  return `${username}@${domains[domainIndex]}`;
}
