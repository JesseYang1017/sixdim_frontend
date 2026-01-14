import React from 'react';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
    current: number;
    total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
    const percentage = total > 0 ? (current / total) * 100 : 0;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.label}>
                    问题 <strong>{current}</strong> / {total}
                </span>
                <span className={styles.percentage}>{Math.round(percentage)}%</span>
            </div>
            <div className={styles.track}>
                <div
                    className={styles.fill}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
