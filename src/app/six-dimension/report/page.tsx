'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RadarChart } from '@/components/six-dimension/RadarChart';
import { OverallScore } from '@/components/six-dimension/OverallScore';
import { StrengthsWeaknesses } from '@/components/six-dimension/StrengthsWeaknesses';
import { DimensionCard } from '@/components/six-dimension/DimensionCard';
import { loadResults, clearResults } from '@/lib/six-dimension/scoring';
import type { TestResults } from '@/lib/six-dimension/types';
import styles from './page.module.css';

export default function ReportPage() {
    const router = useRouter();
    const [results, setResults] = useState<TestResults | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedResults = loadResults();
        if (storedResults) {
            setResults(storedResults);
        }
        setIsLoading(false);
    }, []);

    const handleRetake = () => {
        if (results) {
            clearResults();
            router.push(`/six-dimension/test?type=${results.testType}`);
        }
    };

    if (isLoading) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.loading}>加载报告中...</div>
                </div>
            </main>
        );
    }

    if (!results) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <Card padding="lg" className={styles.noResults}>
                        <h2>未找到测试结果</h2>
                        <p>请先完成测试后再查看报告</p>
                        <Link href="/six-dimension">
                            <Button>开始测试</Button>
                        </Link>
                    </Card>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Link href="/" className={styles.backLink}>
                    ← 返回主页
                </Link>

                <header className={styles.header}>
                    <h1 className={styles.title}>{results.testName} 报告</h1>
                    <p className={styles.timestamp}>
                        测试时间: {new Date(results.timestamp).toLocaleString('zh-CN')}
                    </p>
                </header>

                {/* Overall Score Section */}
                <section className={styles.section}>
                    <Card padding="lg">
                        <h2 className={styles.sectionTitle}>综合评估</h2>
                        <OverallScore result={results.overall} testType={results.testType} />
                    </Card>
                </section>

                {/* Radar Chart Section */}
                <section className={styles.section}>
                    <Card padding="lg">
                        <h2 className={styles.sectionTitle}>维度分布</h2>
                        <RadarChart dimensions={results.dimensions} />
                    </Card>
                </section>

                {/* Strengths & Weaknesses Section */}
                <section className={styles.section}>
                    <StrengthsWeaknesses dimensions={results.dimensions} />
                </section>

                {/* Dimension Cards Section */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>维度详解</h2>
                    <div className={styles.dimensionGrid}>
                        {results.dimensions.map((dim, index) => (
                            <DimensionCard
                                key={dim.id}
                                dimension={dim}
                                index={index}
                            />
                        ))}
                    </div>
                </section>

                {/* Next Steps Section */}
                <section className={styles.section}>
                    <Card padding="lg">
                        <h2 className={styles.sectionTitle}>行动建议</h2>
                        <ul className={styles.nextStepsList}>
                            {results.overall.feedback.nextSteps.map((step, index) => (
                                <li key={index} className={styles.nextStep}>
                                    {step}
                                </li>
                            ))}
                        </ul>
                        <p className={styles.expectedOutcome}>
                            <strong>预期效果：</strong>
                            {results.overall.feedback.expectedOutcome}
                        </p>
                    </Card>
                </section>

                {/* Actions */}
                <div className={styles.actions}>
                    <Link href="/">
                        <Button variant="secondary">返回主页</Button>
                    </Link>
                    <Button onClick={handleRetake}>重新测试</Button>
                </div>
            </div>
        </main>
    );
}
