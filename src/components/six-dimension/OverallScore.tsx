import React from 'react';
import { OverallResult, TestTypeId } from '@/lib/six-dimension/types';
import { Badge } from '@/components/ui/Badge';
import styles from './OverallScore.module.css';

export interface OverallScoreProps {
    result: OverallResult;
    testType: TestTypeId;
}

export function OverallScore({ result, testType }: OverallScoreProps) {
    // Calculate percentage (assuming max score is 30)
    const maxScore = 30;
    const percentage = Math.round((result.score / maxScore) * 100);

    // Score color based on level
    const getScoreColorClass = () => {
        if (result.level === 'critical' || result.level === 'needsImprovement') return styles.scoreFail;
        if (result.level === 'good') return styles.scoreGood;
        return styles.scoreExcellent;
    };

    const { characterProfile } = result.feedback;

    return (
        <div className={styles.container}>
            <div className={styles.scoreSection}>
                <div className={`${styles.scoreCircle} ${getScoreColorClass()}`}>
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

            {/* 人物画像 */}
            {characterProfile && (
                <div className={styles.profileSection}>
                    <h3 className={styles.profileKeyword}>{characterProfile.keyword}</h3>

                    <div className={styles.profileBlock}>
                        <h4 className={styles.profileLabel}>你的整体形象</h4>
                        <p className={styles.profileText}>{characterProfile.description}</p>
                    </div>

                    <div className={styles.profileBlock}>
                        <h4 className={styles.profileLabel}>
                            {testType === 'matchmaking' ? '你的相亲状态' : '你的恋爱状态'}
                        </h4>
                        <p className={styles.profileText}>{characterProfile.status}</p>
                    </div>

                    <div className={styles.profileBlock}>
                        <h4 className={styles.profileLabel}>给你的建议</h4>
                        <p className={styles.profileText}>{characterProfile.advice}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
