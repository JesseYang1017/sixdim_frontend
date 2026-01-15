import React from 'react';
import { OverallResult } from '@/lib/six-dimension/types';
import { Badge } from '@/components/ui/Badge';
import styles from './OverallScore.module.css';

export interface OverallScoreProps {
    result: OverallResult;
}

export function OverallScore({ result }: OverallScoreProps) {
    // Calculate percentage (assuming max score is 30)
    const maxScore = 30;
    const percentage = Math.round((result.score / maxScore) * 100);

    return (
        <div className={styles.container}>
            <div className={styles.scoreSection}>
                <div className={styles.scoreCircle}>
                    <span className={styles.percentage}>{percentage}</span>
                    <div className={styles.divider}></div>
                    <div className={styles.scoreDisplay}>
                        <span className={styles.score}>{result.score.toFixed(1)}</span>
                        <span className={styles.maxScore}>/{maxScore}</span>
                    </div>
                </div>
                <div className={styles.badgeContainer}>
                    <Badge level={result.level} size="lg" />
                </div>
            </div>
            <p className={styles.summary}>{result.feedback.summary}</p>
        </div>
    );
}
