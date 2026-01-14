// Test type identifiers
export type TestTypeId = 'matchmaking' | 'dating';

// Level identifiers
export type Level = 'excellent' | 'good' | 'needsImprovement' | 'critical';

// Dimension identifiers
export type DimensionId = 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6';

// Question structure from question_bank.json
export interface Question {
    id: string;
    text: string;
    reverse: boolean;
    order: number;
}

// Dimension structure from question_bank.json
export interface Dimension {
    id: DimensionId;
    name: string;
    nameEn: string;
    coreTheme: string;
    subThemes: string[];
    questions: Question[];
}

// Test type structure from question_bank.json
export interface TestType {
    id: TestTypeId;
    name: string;
    nameEn: string;
    description: string;
    dimensions: Record<DimensionId, Dimension>;
}

// Question bank structure
export interface QuestionBank {
    version: string;
    lastUpdated: string;
    testTypes: Record<TestTypeId, TestType>;
}

// Level feedback from evaluation_matrix.json
export interface LevelFeedback {
    level: Level;
    levelCn: string;
    scoreRange: {
        min: number;
        max: number;
    };
    traits: string;
    impactAnalysis: string;
    improvements: string[];
    serviceRecommendations?: string[];
}

// Dimension levels from evaluation_matrix.json
export interface DimensionLevels {
    levels: Record<Level, LevelFeedback>;
}

// Overall level feedback from evaluation_matrix.json
export interface OverallLevelFeedback {
    level: Level;
    levelCn: string;
    scoreRange: {
        min: number;
        max: number;
    };
    summary: string;
    coreStrengths?: string[];
    coreWeaknesses?: string;
    impactAnalysis: string;
    nextSteps: string[];
    serviceRecommendations: string[];
    expectedOutcome: string;
}

// Overall levels structure
export interface OverallLevels {
    levels: Record<Level, OverallLevelFeedback>;
}

// Evaluation matrix structure
export interface EvaluationMatrix {
    version: string;
    lastUpdated: string;
    testTypes: Record<TestTypeId, {
        dimensions: Record<DimensionId, DimensionLevels>;
        overall: OverallLevels;
    }>;
}

// Dimension result for display
export interface DimensionResult {
    id: DimensionId;
    name: string;
    nameEn: string;
    score: number;
    level: Level;
    levelCn: string;
    feedback: LevelFeedback;
}

// Overall result for display
export interface OverallResult {
    score: number;
    level: Level;
    levelCn: string;
    feedback: OverallLevelFeedback;
}

// Complete test results
export interface TestResults {
    testType: TestTypeId;
    testName: string;
    dimensions: DimensionResult[];
    overall: OverallResult;
    timestamp: number;
}

// Answer record
export type AnswerRecord = Record<string, number>;

// Level thresholds
export const DIMENSION_THRESHOLDS = {
    excellent: { min: 4.0, max: 5.0 },
    good: { min: 3.0, max: 3.9 },
    needsImprovement: { min: 2.0, max: 2.9 },
    critical: { min: 1.0, max: 1.9 },
} as const;

export const OVERALL_THRESHOLDS = {
    excellent: { min: 24.0, max: 30.0 },
    good: { min: 18.0, max: 23.9 },
    needsImprovement: { min: 12.0, max: 17.9 },
    critical: { min: 6.0, max: 11.9 },
} as const;

// Level display info
export const LEVEL_INFO: Record<Level, { cn: string; color: string }> = {
    excellent: { cn: '优秀', color: '#10b981' },
    good: { cn: '良好', color: '#3b82f6' },
    needsImprovement: { cn: '待提升', color: '#f59e0b' },
    critical: { cn: '需重点改善', color: '#ef4444' },
};
