'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { LikertScale } from '@/components/ui/LikertScale';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
    getQuestions,
    getTestTypeInfo,
    calculateResults,
    saveResults,
} from '@/lib/six-dimension/scoring';
import type { Question, TestTypeId, AnswerRecord } from '@/lib/six-dimension/types';
import styles from './page.module.css';

function TestContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const testType = (searchParams.get('type') as TestTypeId) || 'matchmaking';

    const [questions, setQuestions] = useState<Question[]>([]);
    const [testInfo, setTestInfo] = useState<{ name: string } | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<AnswerRecord>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const qs = getQuestions(testType);
        const info = getTestTypeInfo(testType);
        setQuestions(qs);
        setTestInfo(info);
    }, [testType]);

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;
    const isFirstQuestion = currentIndex === 0;
    const isLastQuestion = currentIndex === totalQuestions - 1;
    const allAnswered = Object.keys(answers).length === totalQuestions;

    const handleAnswer = useCallback((value: number) => {
        if (!currentQuestion) return;

        setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: value,
        }));

    }, [currentQuestion]);

    const handlePrevious = useCallback(() => {
        if (!isFirstQuestion) {
            setCurrentIndex((prev) => prev - 1);
        }
    }, [isFirstQuestion]);

    const handleNext = useCallback(() => {
        if (!isLastQuestion) {
            setCurrentIndex((prev) => prev + 1);
        }
    }, [isLastQuestion]);

    const handleSubmit = useCallback(() => {
        if (!allAnswered || isSubmitting) return;

        setIsSubmitting(true);
        const results = calculateResults(testType, answers);
        saveResults(results);
        router.push('/six-dimension/report');
    }, [allAnswered, isSubmitting, testType, answers, router]);

    if (!currentQuestion || !testInfo) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.loading}>加载中...</div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Link href="/six-dimension" className={styles.backLink}>
                    ← 返回测试选择
                </Link>

                <header className={styles.header}>
                    <h1 className={styles.title}>{testInfo.name}</h1>
                    <ProgressBar current={currentIndex + 1} total={totalQuestions} />
                </header>

                <Card padding="lg" className={styles.questionCard}>
                    <p className={styles.question}>{currentQuestion.text}</p>
                    <LikertScale
                        value={answers[currentQuestion.id] || null}
                        onChange={handleAnswer}
                    />
                </Card>

                <div className={styles.navigation}>
                    <Button
                        variant="secondary"
                        onClick={handlePrevious}
                        disabled={isFirstQuestion}
                    >
                        上一题
                    </Button>

                    {isLastQuestion && allAnswered ? (
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? '提交中...' : '提交答案'}
                        </Button>
                    ) : (
                        <Button
                            variant="secondary"
                            onClick={handleNext}
                            disabled={isLastQuestion}
                        >
                            下一题
                        </Button>
                    )}
                </div>

                <div className={styles.answerStatus}>
                    已回答 {Object.keys(answers).length} / {totalQuestions} 题
                </div>
            </div>
        </main>
    );
}

export default function TestPage() {
    return (
        <Suspense fallback={
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.loading}>加载中...</div>
                </div>
            </main>
        }>
            <TestContent />
        </Suspense>
    );
}
