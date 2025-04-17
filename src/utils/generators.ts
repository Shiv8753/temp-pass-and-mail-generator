
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

// Common first name parts for more realistic email generation
const firstNameParts = [
  'john', 'jane', 'mike', 'sarah', 'alex', 'emma', 'james', 'lisa',
  'david', 'mary', 'robert', 'linda', 'michael', 'elizabeth', 'william',
  'susan', 'joseph', 'jessica', 'thomas', 'karen', 'chris', 'amanda'
];

// Common last name parts for more realistic email generation
const lastNameParts = [
  'smith', 'johnson', 'williams', 'brown', 'jones', 'garcia', 'miller',
  'davis', 'wilson', 'taylor', 'moore', 'anderson', 'thomas', 'jackson',
  'white', 'harris', 'martin', 'lee', 'walker', 'hall', 'allen'
];

// Common email domains - only .com domains
const comDomains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'mail.com',
  'securepass.com',
  'fastmail.com',
  'icloud.com',
  'protonmail.com'
];

/**
 * Generate a random email address that looks more realistic
 */
export function generateEmail(): string {
  // Choose name formation style
  const nameStyle = Math.floor(Math.random() * 5);
  let username = '';
  
  switch (nameStyle) {
    case 0: // firstname
      username = firstNameParts[Math.floor(Math.random() * firstNameParts.length)];
      break;
    case 1: // firstname.lastname
      username = `${firstNameParts[Math.floor(Math.random() * firstNameParts.length)]}.${
        lastNameParts[Math.floor(Math.random() * lastNameParts.length)]}`;
      break;
    case 2: // firstnamelastname
      username = `${firstNameParts[Math.floor(Math.random() * firstNameParts.length)]}${
        lastNameParts[Math.floor(Math.random() * lastNameParts.length)]}`;
      break;
    case 3: // firstname_lastname
      username = `${firstNameParts[Math.floor(Math.random() * firstNameParts.length)]}_${
        lastNameParts[Math.floor(Math.random() * lastNameParts.length)]}`;
      break;
    case 4: // firstname + number
      username = `${firstNameParts[Math.floor(Math.random() * firstNameParts.length)]}${
        Math.floor(Math.random() * 1000)}`;
      break;
  }
  
  // Sometimes add a random year (like birth year or registration year)
  const addYear = Math.random() > 0.6;
  if (addYear) {
    // Random year between 1970 and 2010
    const year = Math.floor(Math.random() * 40) + 1970;
    username += year;
  }
  
  const domainIndex = Math.floor(Math.random() * comDomains.length);
  return `${username}@${comDomains[domainIndex]}`;
}
