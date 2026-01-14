import React from 'react';
import { DimensionResult } from '@/lib/six-dimension/types';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import styles from './DimensionCard.module.css';

export interface DimensionCardProps {
    dimension: DimensionResult;
    index: number;
}

export function DimensionCard({ dimension, index }: DimensionCardProps) {
    return (
        <Card className={styles.card} padding="md">
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <span className={styles.index}>D{index + 1}</span>
                    <div>
                        <h3 className={styles.name}>{dimension.name}</h3>
                        <p className={styles.nameEn}>{dimension.nameEn}</p>
                    </div>
                </div>
                <div className={styles.scoreSection}>
                    <span className={styles.score}>{dimension.score.toFixed(1)}</span>
                    <Badge level={dimension.level} size="sm" />
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>特征分析</h4>
                    <p className={styles.text}>{dimension.feedback.traits}</p>
                </div>

                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>影响分析</h4>
                    <p className={styles.text}>{dimension.feedback.impactAnalysis}</p>
                </div>

                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>改进建议</h4>
                    <ul className={styles.list}>
                        {dimension.feedback.improvements.map((item, i) => (
                            <li key={i} className={styles.listItem}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
}
