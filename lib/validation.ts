
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string; 
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|lottery|winner|prize|click here|buy now)\b/i,
  /\b(http[s]?:\/\/[^\s]+){3,}/i, 
  /<[^>]*script/i, 
  /\b[A-Z]{10,}\b/, 
];

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: ValidationError[] = [];

  if (data.honeypot) {
    return { valid: false, errors: [{ field: "honeypot", message: "Bot detected" }] };
  }

  if (!data.name || data.name.trim().length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters" });
  } else if (data.name.length > 100) {
    errors.push({ field: "name", message: "Name must be less than 100 characters" });
  }

  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address" });
  } else if (data.email.length > 254) {
    errors.push({ field: "email", message: "Email is too long" });
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push({ field: "message", message: "Message must be at least 10 characters" });
  } else if (data.message.length > 5000) {
    errors.push({ field: "message", message: "Message must be less than 5000 characters" });
  }

  return { valid: errors.length === 0, errors };
}

export function detectSpam(data: ContactFormData): boolean {
  const content = `${data.name} ${data.email} ${data.message}`.toLowerCase();
  
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(content)) return true;
  }

  const specialCharRatio = (content.match(/[^a-z0-9\s]/g)?.length || 0) / content.length;
  if (specialCharRatio > 0.3) return true;

  if (/(.)\1{5,}/.test(content)) return true;

  return false;
}
