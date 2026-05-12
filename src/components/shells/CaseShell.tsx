import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { CaseDef } from '@/cases/_types';
import { COMPANY, PRODUCT } from '@/content/brand';
import styles from './CaseShell.module.css';

interface CaseShellProps {
  caseDef: CaseDef;
  children: ReactNode;
}

export function CaseShell({ caseDef, children }: CaseShellProps) {
  return (
    <div className={styles.shell}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.brandLink}>
            {COMPANY} <span className={styles.productMark}>· {PRODUCT}</span>
          </Link>
          <span className={styles.crumb}>›</span>
          <span className={styles.crumbCurrent}>
            {caseDef.label} · {caseDef.customer}
          </span>
          <span className={styles.industryChip}>{caseDef.industry}</span>
          <span className={styles.brandLine}>{caseDef.brandLine}</span>
          <div className={styles.spacer} />
          <span className={styles.customerInfo}>
            <span className={styles.customerBadge}>도입 사례</span>
            <span>실제 운영 시나리오 기반</span>
          </span>
          <Link to="/" className={styles.backLink}>
            ← 메인으로
          </Link>
        </div>
      </nav>

      <main className={styles.body}>{children}</main>
    </div>
  );
}
