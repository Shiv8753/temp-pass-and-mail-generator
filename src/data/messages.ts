
/**
 * Mock email messages for demo purposes
 */
import { v4 as uuidv4 } from 'uuid';

export interface EmailMessage {
  id: string;
  from: string;
  subject: string;
  content: string;
  date: Date;
  read: boolean;
}

// Sample service messages a user might receive
const sampleServiceNames = [
  'Netflix', 'Amazon', 'PayPal', 'Facebook', 'Twitter',
  'Instagram', 'LinkedIn', 'Spotify', 'Apple', 'Google',
  'Microsoft', 'Dropbox', 'Slack', 'GitHub', 'Notion'
];

// Sample message subjects
const sampleSubjects = [
  'Confirm your account',
  'Welcome to our service',
  'Your account has been created',
  'Important security notice',
  'Verify your email address',
  'Your receipt',
  'Action required: Complete your registration',
  'Thank you for signing up',
  'Your verification code',
  'Password reset request'
];

// Sample message content pieces
const sampleContentIntros = [
  'Thank you for signing up with us.',
  'Welcome to our platform!',
  'Your account has been successfully created.',
  'We received a request to verify this email address.',
  'Please confirm your email to complete registration.'
];

const sampleContentMiddles = [
  'To get started, please verify your email address by clicking the button below.',
  'Your security is important to us. Please confirm this action.',
  'Use the following code to complete the process:',
  "We're excited to have you join our community.",
  'Your account is almost ready to use.'
];

const sampleContentEndings = [
  'If you did not request this, please ignore this email or contact support.',
  'This link will expire in 24 hours.',
  'For security reasons, this code will expire in 10 minutes.',
  'Please do not reply to this automated message.',
  'If you need assistance, please contact our support team.'
];

/**
 * Generate a random message for demo purposes
 */
export function generateRandomMessage(toEmail: string): EmailMessage {
  const service = sampleServiceNames[Math.floor(Math.random() * sampleServiceNames.length)];
  const subject = sampleSubjects[Math.floor(Math.random() * sampleSubjects.length)];
  
  // Build content from parts
  const intro = sampleContentIntros[Math.floor(Math.random() * sampleContentIntros.length)];
  const middle = sampleContentMiddles[Math.floor(Math.random() * sampleContentMiddles.length)];
  const ending = sampleContentEndings[Math.floor(Math.random() * sampleContentEndings.length)];
  
  // Add verification code if relevant
  const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
  const hasVerificationCode = middle.includes('code');
  
  // Format the content
  let content = `Hello,\n\n${intro}\n\n${middle}\n\n`;
  
  if (hasVerificationCode) {
    content += `CODE: ${verificationCode}\n\n`;
  }
  
  content += `${ending}\n\nBest regards,\nThe ${service} Team`;
  
  // Generate a random date within the last 24 hours
  const now = new Date();
  const timeOffset = Math.floor(Math.random() * 24 * 60 * 60 * 1000); // Random time within 24 hours
  const date = new Date(now.getTime() - timeOffset);
  
  return {
    id: uuidv4(),
    from: `noreply@${service.toLowerCase().replace(' ', '')}.com`,
    subject,
    content,
    date,
    read: false
  };
}

/**
 * Generate multiple messages for a given email
 */
export function generateMessages(email: string, count: number = 5): EmailMessage[] {
  const messages: EmailMessage[] = [];
  
  for (let i = 0; i < count; i++) {
    messages.push(generateRandomMessage(email));
  }
  
  // Sort by date (newest first)
  return messages.sort((a, b) => b.date.getTime() - a.date.getTime());
}
