import React from 'react';
import styles from './Badge.module.css';
import { Level, LEVEL_INFO } from '@/lib/six-dimension/types';

export interface BadgeProps {
    level: Level;
    size?: 'sm' | 'md' | 'lg';
}

export function Badge({ level, size = 'md' }: BadgeProps) {
    const info = LEVEL_INFO[level];

    return (
        <span
            className={`${styles.badge} ${styles[level]} ${styles[size]}`}
            style={{ '--badge-color': info.color } as React.CSSProperties}
        >
            {info.cn}
        </span>
    );
}
