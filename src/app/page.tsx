import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>心理测评平台</h1>
          <p className={styles.subtitle}>
            专业的心理测评工具，帮助你更好地了解自己
          </p>
        </header>

        <div className={styles.grid}>
          <Link href="/six-dimension" className={styles.link}>
            <Card clickable padding="lg">
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>💫</div>
                <h2 className={styles.cardTitle}>六维测评</h2>
                <p className={styles.cardDescription}>
                  通过六个维度全面评估你的婚恋准备度和恋爱能力，
                  获得专业的分析报告和改进建议。
                </p>
                <div className={styles.cardMeta}>
                  <span className={styles.badge}>专业测评</span>
                  <span className={styles.badge}>深度报告</span>
                </div>
              </div>
            </Card>
          </Link>

          <a href="https://animalpersonality-production.up.railway.app/" target="_blank" rel="noopener noreferrer" className={styles.link}>
            <Card clickable padding="lg">
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>🐱</div>
                <h2 className={styles.cardTitle}>动物性格测试</h2>
                <p className={styles.cardDescription}>
                  探索你的性格类型，了解自己的人际交往风格、
                  职业倾向和成长方向。
                </p>
                <div className={styles.cardMeta}>
                  <span className={styles.badge}>性格测试</span>
                </div>
              </div>
            </Card>
          </a>
        </div>
      </div>
    </main>
  );
}
