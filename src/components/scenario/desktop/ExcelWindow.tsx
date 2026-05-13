import type { ExcelWindowState } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './ExcelWindow.module.css';

interface ExcelWindowProps {
  state: ExcelWindowState;
}

export function ExcelWindow({ state }: ExcelWindowProps) {
  return (
    <div className={styles.window}>
      <div className={styles.titlebar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>📊</span>
          <span>{state.fileName}</span>
        </div>
        <div className={styles.winControls}>
          <span>—</span>
          <span>□</span>
          <span>×</span>
        </div>
      </div>
      <div className={styles.ribbon}>
        <span>파일</span>
        <span>홈</span>
        <span>삽입</span>
        <span>수식</span>
        <span>데이터</span>
      </div>
      <div className={styles.formulaBar}>
        <div className={styles.cellRef}>{state.cellRef}</div>
        <span className={styles.fx}>fx</span>
        <span className={styles.formula}>{state.formula}</span>
      </div>
      <div className={styles.sheet}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: 28 }}></th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.rowHeader}>1</td>
              <td className={styles.titleRow} colSpan={4}>
                {state.headerTitle}
              </td>
            </tr>
            <tr>
              <td className={styles.rowHeader}>2</td>
              <td className={styles.headerRow}>거래처</td>
              <td className={styles.headerRow}>품번</td>
              <td className={styles.headerRow}>단가</td>
              <td className={styles.headerRow}>비고</td>
            </tr>
            {state.rows.map((row, idx) => (
              <tr
                key={row.id ?? idx}
                className={cn(
                  row.tone === 'miu' && styles.miu,
                  row.tone === 'daedong' && styles.daedong,
                  row.highlight && styles.highlight,
                )}
              >
                <td className={styles.rowHeader}>{row.label}</td>
                {row.cells.map((c, i) => (
                  <td
                    key={i}
                    className={cn(c.price && styles.priceCell)}
                    style={c.bold ? { fontWeight: 700 } : undefined}
                  >
                    {c.text}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.statusbar}>
        <span>준비</span>
        <span>NUM</span>
      </div>
      {state.quotePopup?.visible && (
        <div className={styles.quotePopup}>
          <div className={styles.popupHeader}>
            <span>📄 {state.quotePopup.title}</span>
            <span style={{ opacity: 0.7 }}>×</span>
          </div>
          <div className={styles.popupBody}>
            <div className={styles.popupTitle}>⚠️ {state.quotePopup.title}</div>
            <div className={styles.popupSubtitle}>{state.quotePopup.subtitle}</div>
            <table className={styles.popupTable}>
              <thead>
                <tr>
                  <th>품번</th>
                  <th>품명</th>
                  <th>단가</th>
                  <th>수량</th>
                </tr>
              </thead>
              <tbody>
                {state.quotePopup.rows.map((r, i) => (
                  <tr key={i} className={cn(r.danger && styles.danger)}>
                    <td>{r.code}</td>
                    <td>{r.name}</td>
                    <td className={r.danger ? styles.dangerPrice : undefined}>{r.price}</td>
                    <td>{r.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {state.quotePopup.note && (
              <div className={styles.popupNote}>{state.quotePopup.note}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
