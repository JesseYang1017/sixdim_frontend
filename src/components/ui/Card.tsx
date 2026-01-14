import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    clickable?: boolean;
    onClick?: () => void;
    padding?: 'sm' | 'md' | 'lg';
}

export function Card({
    children,
    className = '',
    clickable = false,
    onClick,
    padding = 'md',
}: CardProps) {
    const classNames = [
        styles.card,
        styles[`padding-${padding}`],
        clickable ? styles.clickable : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const Component = clickable ? 'button' : 'div';

    return (
        <Component
            className={classNames}
            onClick={onClick}
            type={clickable ? 'button' : undefined}
        >
            {children}
        </Component>
    );
}
