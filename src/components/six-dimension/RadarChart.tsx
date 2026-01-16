'use client';

import React from 'react';
import {
    Radar,
    RadarChart as RechartsRadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { DimensionResult } from '@/lib/six-dimension/types';
import styles from './RadarChart.module.css';

export interface RadarChartProps {
    dimensions: DimensionResult[];
}

export function RadarChart({ dimensions }: RadarChartProps) {
    const data = dimensions.map((dim) => ({
        subject: dim.name,
        score: dim.score,
        fullMark: 5,
    }));

    return (
        <div className={styles.container}>
            <ResponsiveContainer width="100%" height={300}>
                <RechartsRadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="60%"
                    data={data}
                >
                    <PolarGrid stroke="var(--color-border)" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 5]}
                        tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
                        tickCount={6}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--color-surface)',
                            border: 'var(--border-width) solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            fontSize: 'var(--font-size-sm)',
                        }}
                        formatter={(value) => [`${value} 分`, '得分']}
                    />
                    <Radar
                        name="得分"
                        dataKey="score"
                        stroke="var(--color-primary)"
                        fill="var(--color-primary)"
                        fillOpacity={0.5}
                        strokeWidth={2}
                    />
                </RechartsRadarChart>
            </ResponsiveContainer>
        </div>
    );
}
