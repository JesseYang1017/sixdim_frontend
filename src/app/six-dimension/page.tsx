import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

export const metadata = {
    title: '六维测评 - 心理测评平台',
    description: '通过六个维度全面评估你的婚恋准备度或恋爱能力',
};

export default function SixDimensionPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <Link href="/" className={styles.backLink}>
                    ← 返回主页
                </Link>

                <header className={styles.header}>
                    <h1 className={styles.title}>六维测评</h1>
                    <p className={styles.subtitle}>
                        选择适合你的测评类型，开始探索自我
                    </p>
                </header>

                <div className={styles.grid}>
                    {/* <Card padding="lg" className={styles.card}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardIcon}>💘</div>
                            <h2 className={styles.cardTitle}>相亲六维测试</h2>
                            <p className={styles.cardDescription}>
                                评估相亲前的准备程度，帮助你在相亲市场中更好地展现自己，
                                提升匹配成功率。
                            </p>
                            <div className={styles.cardMeta}>
                                <span className={styles.tag}>6个维度</span>
                                <span className={styles.tag}>约36道题</span>
                                <span className={styles.tag}>约10分钟</span>
                            </div>
                            <Link href="/six-dimension/test?type=matchmaking" className={styles.buttonLink}>
                                <Button fullWidth size="lg">
                                    开始测试
                                </Button>
                            </Link>
                        </div>
                    </Card> */}

                    <Card padding="lg" className={styles.card}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardIcon}>❤️</div>
                            <h2 className={styles.cardTitle}>恋爱六维测试</h2>
                            <p className={styles.cardDescription}>
                                评估恋爱关系中的综合表现，帮助你了解自己的恋爱能力，
                                提升关系质量。
                            </p>
                            <div className={styles.cardMeta}>
                                <span className={styles.tag}>6个维度</span>
                                <span className={styles.tag}>约32道题</span>
                                <span className={styles.tag}>约8分钟</span>
                            </div>
                            <Link href="/six-dimension/test?type=dating" className={styles.buttonLink}>
                                <Button fullWidth size="lg">
                                    开始测试
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    );
}
