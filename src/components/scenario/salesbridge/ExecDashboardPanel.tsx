import { useEffect, useMemo, useState } from 'react';
import type { ExecDashboardPanel as ExecDashboardData, RadarAxis } from '@/cases/_types';
import { cn } from '@/lib/cn';
import { ExecBriefPdfModal } from './ExecBriefPdfModal';
import styles from './ExecDashboardPanel.module.css';

interface ExecDashboardPanelProps {
  data: ExecDashboardData;
  onExportPdf?: () => void;
  onDismissPdf?: () => void;
}

const RADAR_SIZE = 280;
const RADAR_CENTER = RADAR_SIZE / 2;
const RADAR_MAX = RADAR_SIZE * 0.36;

function pointFor(axis: RadarAxis, index: number, total: number, ratio = 1) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = (axis.value / 100) * RADAR_MAX * ratio;
  return {
    x: RADAR_CENTER + Math.cos(angle) * r,
    y: RADAR_CENTER + Math.sin(angle) * r,
  };
}

function labelPointFor(index: number, total: number, padding = 30) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = RADAR_MAX + padding;
  return {
    x: RADAR_CENTER + Math.cos(angle) * r,
    y: RADAR_CENTER + Math.sin(angle) * r,
  };
}

export function ExecDashboardPanel({ data, onExportPdf, onDismissPdf }: ExecDashboardPanelProps) {
  const [animRatio, setAnimRatio] = useState(0);

  useEffect(() => {
    setAnimRatio(0);
    const id = requestAnimationFrame(() => {
      setAnimRatio(1);
    });
    return () => cancelAnimationFrame(id);
  }, [data.radar]);

  const total = data.radar.length;
  const polygon = useMemo(
    () =>
      data.radar
        .map((axis, i) => {
          const p = pointFor(axis, i, total, animRatio);
          return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
        })
        .join(' '),
    [data.radar, total, animRatio],
  );

  const gridPolygon = useMemo(() => {
    return [1, 0.66, 0.33]
      .map((ratio) => {
        return data.radar
          .map((_, i) => {
            const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
            const r = RADAR_MAX * ratio;
            const x = RADAR_CENTER + Math.cos(angle) * r;
            const y = RADAR_CENTER + Math.sin(angle) * r;
            return `${x.toFixed(1)},${y.toFixed(1)}`;
          })
          .join(' ');
      });
  }, [data.radar, total]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerTitle}>📊 {data.title}</div>
          {data.subtitle && <div className={styles.headerSub}>{data.subtitle}</div>}
        </div>
        <div className={styles.exportRow}>
          <button type="button" className={styles.exportBtn}>
            ⬇️ Excel
          </button>
          <button
            type="button"
            className={cn(styles.exportBtn, styles.primary, data.pdfButtonPulse && styles.pulse)}
            onClick={() => onExportPdf?.()}
          >
            📄 본부장 브리핑 PDF 추출
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.summaryGrid}>
          {data.summary.map((s, i) => (
            <div key={i} className={cn(styles.summaryCard, s.danger && styles.danger)}>
              <div className={styles.summaryLabel}>{s.label}</div>
              <div className={styles.summaryValue}>{s.value}</div>
              {s.sub && <div className={styles.summarySub}>{s.sub}</div>}
            </div>
          ))}
        </div>

        <div className={styles.lowerRow}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>🎯 영업 건강도 레이더 (5축)</div>
            <div className={styles.radarHost}>
              <svg
                className={styles.radarSvg}
                viewBox={`0 0 ${RADAR_SIZE} ${RADAR_SIZE}`}
                preserveAspectRatio="xMidYMid meet"
              >
                {gridPolygon.map((pts, idx) => (
                  <polygon
                    key={idx}
                    points={pts}
                    fill="none"
                    stroke="#c3cee0"
                    strokeDasharray={idx === 0 ? '' : '3 3'}
                    strokeWidth={1}
                  />
                ))}
                {data.radar.map((axis, i) => {
                  const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
                  const x = RADAR_CENTER + Math.cos(angle) * RADAR_MAX;
                  const y = RADAR_CENTER + Math.sin(angle) * RADAR_MAX;
                  return (
                    <line
                      key={axis.id}
                      x1={RADAR_CENTER}
                      y1={RADAR_CENTER}
                      x2={x}
                      y2={y}
                      stroke="#dbe3ef"
                      strokeWidth={1}
                    />
                  );
                })}
                <polygon
                  points={polygon}
                  fill="rgba(26, 115, 232, 0.25)"
                  stroke="#1a73e8"
                  strokeWidth={2}
                  style={{ transition: 'all 1.4s ease-out' }}
                />
                {data.radar.map((axis, i) => {
                  const p = labelPointFor(i, total);
                  return (
                    <text
                      key={axis.id}
                      x={p.x}
                      y={p.y}
                      fontSize="10"
                      fontWeight={600}
                      fill="#44546a"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {axis.label}
                    </text>
                  );
                })}
              </svg>
            </div>
            {data.radarNote && <div className={styles.radarNote}>* {data.radarNote}</div>}
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>💡 대응 우선순위 (영업/매출 관점)</div>
            <div className={styles.priorityList}>
              {data.priorities.map((p) => (
                <div
                  key={p.rank}
                  className={cn(styles.priorityItem, p.highlight && styles.highlight)}
                >
                  <div className={styles.priorityHead}>
                    <span className={styles.priorityRank}>PRIORITY 0{p.rank}</span>
                    <span className={styles.priorityTitle}>{p.title}</span>
                    <span className={cn(styles.priorityTag, styles[p.tagTone])}>
                      {p.tagLabel}
                    </span>
                  </div>
                  <div className={styles.priorityBody}>{p.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {data.pdfModalVisible && <ExecBriefPdfModal doc={data.pdfDoc} onDismiss={onDismissPdf} />}
    </div>
  );
}
