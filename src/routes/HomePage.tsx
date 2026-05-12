import { Link } from 'react-router-dom';
import { COMPANY, PRODUCT } from '@/content/brand';
import { ColdOpenHero } from '@/components/marketing/ColdOpenHero';
import { ProblemCards } from '@/components/marketing/ProblemCards';
import { SolutionStrip } from '@/components/marketing/SolutionStrip';
import { CaseGrid } from '@/components/marketing/CaseGrid';
import { RoiTeaserPanel } from '@/components/marketing/RoiTeaserPanel';
import { CtaSection } from '@/components/marketing/CtaSection';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.brand}>
            {COMPANY} <span className={styles.productMark}>· {PRODUCT}</span>
          </Link>
          <div className={styles.navLinks}>
            <a href="#problem">문제</a>
            <a href="#solution">해결</a>
            <a href="#cases">사례</a>
            <a href="#roi">ROI</a>
          </div>
          <div className={styles.navSpacer} />
          <a href="#cta" className={styles.navCta}>
            PoC 미팅 잡기 →
          </a>
        </div>
      </nav>

      <ColdOpenHero />
      <ProblemCards />
      <SolutionStrip />
      <CaseGrid />
      <RoiTeaserPanel />
      <CtaSection />
    </div>
  );
}
