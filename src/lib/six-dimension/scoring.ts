import {
    Question,
    Level,
    DimensionId,
    TestTypeId,
    DimensionResult,
    OverallResult,
    TestResults,
    AnswerRecord,
    DIMENSION_THRESHOLDS,
    OVERALL_THRESHOLDS,
    LevelFeedback,
    OverallLevelFeedback,
} from './types';
import questionBank from '@/data/six-dimension/question_bank.json';
import evaluationMatrix from '@/data/six-dimension/evaluation_matrix.json';
import type { QuestionBank, EvaluationMatrix } from './types';

const typedQuestionBank = questionBank as QuestionBank;
const typedEvaluationMatrix = evaluationMatrix as EvaluationMatrix;

/**
 * Apply reverse scoring if needed
 * For reverse questions: score = 6 - rawValue
 */
export function applyReverseScoring(rawValue: number, reverse: boolean): number {
    return reverse ? 6 - rawValue : rawValue;
}

/**
 * Calculate dimension score from answers
 * Returns average score rounded to 1 decimal place
 */
export function calculateDimensionScore(
    answers: AnswerRecord,
    questions: Question[]
): number {
    const scores = questions.map((q) => {
        const rawValue = answers[q.id];
        if (rawValue === undefined) return 0;
        return applyReverseScoring(rawValue, q.reverse);
    });

    const validScores = scores.filter((s) => s > 0);
    if (validScores.length === 0) return 0;

    const average = validScores.reduce((sum, s) => sum + s, 0) / validScores.length;
    return Math.round(average * 10) / 10;
}

/**
 * Calculate total score from dimension scores
 */
export function calculateTotalScore(dimensionScores: number[]): number {
    const total = dimensionScores.reduce((sum, score) => sum + score, 0);
    return Math.round(total * 10) / 10;
}

/**
 * Get dimension level from score (1.0 - 5.0)
 */
export function getDimensionLevel(score: number): Level {
    if (score >= DIMENSION_THRESHOLDS.excellent.min) return 'excellent';
    if (score >= DIMENSION_THRESHOLDS.good.min) return 'good';
    if (score >= DIMENSION_THRESHOLDS.needsImprovement.min) return 'needsImprovement';
    return 'critical';
}

/**
 * Get overall level from score (6.0 - 30.0)
 */
export function getOverallLevel(score: number): Level {
    if (score >= OVERALL_THRESHOLDS.excellent.min) return 'excellent';
    if (score >= OVERALL_THRESHOLDS.good.min) return 'good';
    if (score >= OVERALL_THRESHOLDS.needsImprovement.min) return 'needsImprovement';
    return 'critical';
}

/**
 * Get all questions for a test type
 */
export function getQuestions(testType: TestTypeId): Question[] {
    const test = typedQuestionBank.testTypes[testType];
    if (!test) return [];

    const allQuestions: Question[] = [];
    const dimensionIds: DimensionId[] = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'];

    for (const dimId of dimensionIds) {
        const dimension = test.dimensions[dimId];
        if (dimension) {
            allQuestions.push(...dimension.questions);
        }
    }

    return allQuestions;
}

/**
 * Get test type info
 */
export function getTestTypeInfo(testType: TestTypeId) {
    return typedQuestionBank.testTypes[testType];
}

/**
 * Calculate complete test results
 */
export function calculateResults(
    testType: TestTypeId,
    answers: AnswerRecord
): TestResults {
    const testInfo = typedQuestionBank.testTypes[testType];
    const evalMatrix = typedEvaluationMatrix.testTypes[testType];

    const dimensionIds: DimensionId[] = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'];
    const dimensionResults: DimensionResult[] = [];
    const dimensionScores: number[] = [];

    for (const dimId of dimensionIds) {
        const dimension = testInfo.dimensions[dimId];
        const score = calculateDimensionScore(answers, dimension.questions);
        const level = getDimensionLevel(score);
        const feedback = evalMatrix.dimensions[dimId].levels[level] as LevelFeedback;

        dimensionScores.push(score);
        dimensionResults.push({
            id: dimId,
            name: dimension.name,
            nameEn: dimension.nameEn,
            score,
            level,
            levelCn: feedback.levelCn,
            feedback,
        });
    }

    const totalScore = calculateTotalScore(dimensionScores);
    const overallLevel = getOverallLevel(totalScore);
    const overallFeedback = evalMatrix.overall.levels[overallLevel] as OverallLevelFeedback;

    return {
        testType,
        testName: testInfo.name,
        dimensions: dimensionResults,
        overall: {
            score: totalScore,
            level: overallLevel,
            levelCn: overallFeedback.levelCn,
            feedback: overallFeedback,
        },
        timestamp: Date.now(),
    };
}

/**
 * Save results to sessionStorage
 */
export function saveResults(results: TestResults): void {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('sixDimResults', JSON.stringify(results));
    }
}

/**
 * Load results from sessionStorage
 */
export function loadResults(): TestResults | null {
    if (typeof window === 'undefined') return null;

    const stored = sessionStorage.getItem('sixDimResults');
    if (!stored) return null;

    try {
        return JSON.parse(stored) as TestResults;
    } catch {
        return null;
    }
}

/**
 * Clear results from sessionStorage
 */
export function clearResults(): void {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('sixDimResults');
    }
}
