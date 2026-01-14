import React from 'react';
import { OverallResult } from '@/lib/six-dimension/types';
import { Badge } from '@/components/ui/Badge';
import styles from './OverallScore.module.css';

export interface OverallScoreProps {
    result: OverallResult;
}

export function OverallScore({ result }: OverallScoreProps) {
    return (
        <div className={styles.container}>
            <div className={styles.scoreSection}>
                <div className={styles.scoreDisplay}>
                    <span className={styles.score}>{result.score.toFixed(1)}</span>
                    <span className={styles.maxScore}>/ 30</span>
                </div>
                <Badge level={result.level} size="lg" />
            </div>
            <p className={styles.summary}>{result.feedback.summary}</p>
        </div>
    );
}
