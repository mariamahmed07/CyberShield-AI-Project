import type { DemoExample } from './types';

export const DEMO_EXAMPLES: DemoExample[] = [
  {
    id: 'safe',
    label: 'LOW RISK',
    riskLevel: 'LOW',
    text: 'Hi Ahmed, your meeting is scheduled for tomorrow at 10 AM. Please find the agenda attached.',
  },
  {
    id: 'suspicious',
    label: 'MEDIUM RISK',
    riskLevel: 'MEDIUM',
    text: 'Your account requires verification. Please review your account activity and confirm your information.',
  },
  {
    id: 'phishing',
    label: 'HIGH RISK',
    riskLevel: 'HIGH',
    text: 'URGENT: Your account will be suspended! Verify your identity immediately by clicking the link below or your account will be locked within 24 hours.\n\nhttp://bank-verify-now.suspicious-link.io',
  },
];
