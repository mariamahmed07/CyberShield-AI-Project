export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface DetectedIndicator {
  id: string;
  title: string;
  category: IndicatorCategory;
  weight: number;
  explanation: string;
  matches: string[];
}

export type IndicatorCategory =
  | 'url'
  | 'urgency'
  | 'sensitive'
  | 'scam'
  | 'action'
  | 'pattern';

export interface PhishingSignal {
  feature: string;
  contribution: number;
}

export interface DetectionBreakdown {
  url: number;
  language: number;
  behavioral: number;
  patterns: number;
}

export interface AnalysisResult {
  score: number;

  riskLevel: RiskLevel;

  threatType: string;

  riskMessage: string;

  indicators: DetectedIndicator[];

  phishingSignals: PhishingSignal[];

  safeSignals: PhishingSignal[];

  recommendation: string;

  breakdown: DetectionBreakdown;

  analyzedText: string;
}

export interface DemoExample {
  id: string;
  label: string;
  riskLevel: RiskLevel;
  text: string;
}