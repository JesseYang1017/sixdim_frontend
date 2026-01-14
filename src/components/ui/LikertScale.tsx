'use client';

import React from 'react';
import styles from './LikertScale.module.css';

export interface LikertScaleProps {
    value: number | null;
    onChange: (value: number) => void;
    disabled?: boolean;
}

const labels = ['非常不同意', '', '一般', '', '非常同意'];

export function LikertScale({ value, onChange, disabled = false }: LikertScaleProps) {
    return (
        <div className={styles.container}>
            <div className={styles.scale}>
                {[1, 2, 3, 4, 5].map((num) => (
                    <button
                        key={num}
                        type="button"
                        className={`${styles.option} ${value === num ? styles.selected : ''}`}
                        onClick={() => onChange(num)}
                        disabled={disabled}
                        aria-label={`选择 ${num} 分`}
                    >
                        <span className={styles.circle}>{num}</span>
                    </button>
                ))}
            </div>
            <div className={styles.labels}>
                {labels.map((label, index) => (
                    <span key={index} className={styles.label}>
                        {label}
                    </span>
                ))}
            </div>
        </div>
    );
}
