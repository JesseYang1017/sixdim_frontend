import React from 'react';
import { DimensionResult } from '@/lib/six-dimension/types';
import { Card } from '@/components/ui/Card';
import styles from './StrengthsWeaknesses.module.css';

export interface StrengthsWeaknessesProps {
    dimensions: DimensionResult[];
}

export function StrengthsWeaknesses({ dimensions }: StrengthsWeaknessesProps) {
    // 按得分排序，分离核心优势和待提升维度
    // 核心优势: 得分 >= 3.0 的维度
    // 待提升: 得分 < 3.0 的维度
    const strengths = dimensions
        .filter(dim => dim.score >= 3.0)
        .sort((a, b) => b.score - a.score);

    const weaknesses = dimensions
        .filter(dim => dim.score < 3.0)
        .sort((a, b) => a.score - b.score);

    return (
        <div className={styles.container}>
            {/* 核心优势 */}
            <Card className={styles.card} padding="md">
                <h3 className={styles.titleStrength}>🌟 核心优势</h3>
                <div className={styles.list}>
                    {strengths.length > 0 ? (
                        strengths.map(dim => (
                            <div key={dim.id} className={styles.item}>
                                <span className={styles.name}>{dim.name}</span>
                                <span className={styles.scoreStrength}>{dim.score.toFixed(1)}分</span>
                            </div>
                        ))
                    ) : (
                        <div className={styles.empty}>暂无</div>
                    )}
                </div>
            </Card>

            {/* 待提升 */}
            <Card className={styles.card} padding="md">
                <h3 className={styles.titleWeakness}>⚠️ 待提升</h3>
                <div className={styles.list}>
                    {weaknesses.length > 0 ? (
                        weaknesses.map(dim => (
                            <div key={dim.id} className={styles.item}>
                                <span className={styles.name}>{dim.name}</span>
                                <span className={styles.scoreWeakness}>{dim.score.toFixed(1)}分</span>
                            </div>
                        ))
                    ) : (
                        <div className={styles.empty}>暂无</div>
                    )}
                </div>
            </Card>
        </div>
    );
}
