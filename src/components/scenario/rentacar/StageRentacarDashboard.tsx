import { type ReactNode, useState, useEffect } from 'react';
import type { ChapterStateNode, RcDashTabId, RcDonutSeg, RcBarRow, RcLinePoint } from '@/cases/_types';
import styles from './StageRentacarDashboard.module.css';

interface Props {
  state: ChapterStateNode;
  actions?: ReactNode;
  onAdvance?: (nextIndex: number) => void;
}

// ─── Donut SVG ────────────────────────────────────────────────────────────────
function DonutChart({ segs, total }: { segs: RcDonutSeg[]; total: string }) {
  const r = 36;
  const circ = 2 * Math.PI * r; // ≈226.2

  let offset = 0;
  const arcs = segs.map((seg) => {
    const dash = (seg.percent / 100) * circ;
    const arc = { seg, dash, offset };
    offset += dash;
    return arc;
  });

  return (
    <div className={styles.donutWrap}>
      <svg width={96} height={96} viewBox="0 0 96 96" className={styles.donutSvg}>
        <circle cx={48} cy={48} r={r} fill="none" stroke="#E6EBF3" strokeWidth={16} />
        {arcs.map(({ seg, dash, offset: off }) => (
          <circle
            key={seg.label}
            cx={48}
            cy={48}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={16}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-off}
            transform="rotate(-90 48 48)"
          />
        ))}
        <text x={48} y={51} textAnchor="middle" fontSize={13} fontWeight={500} fill="var(--ink)">
          {total}
        </text>
      </svg>
      <div className={styles.legend}>
        {segs.map((seg) => (
          <div key={seg.label} className={styles.legItem}>
            <span className={styles.legDot} style={{ background: seg.color }} />
            <span className={styles.legLabel}>{seg.label}</span>
            <span className={styles.legPct}>{seg.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bar Row ──────────────────────────────────────────────────────────────────
function BarRow({ row }: { row: RcBarRow }) {
  const fillColor =
    row.tone === 'brand'
      ? '#1B3A6B'
      : row.tone === 'warn'
      ? '#BA7517'
      : row.tone === 'danger'
      ? '#E24B4A'
      : row.tone === 'good'
      ? '#1F9D6B'
      : '#888780';

  const textClass =
    row.tone === 'brand'
      ? styles.valBrand
      : row.tone === 'warn'
      ? styles.valWarn
      : row.tone === 'danger'
      ? styles.valDanger
      : row.tone === 'good'
      ? styles.valGood
      : styles.valMuted;

  return (
    <div className={styles.barRow}>
      <span className={styles.barLabel}>{row.label}</span>
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{ width: `${row.percent}%`, background: fillColor }}
        />
      </div>
      <span className={`${styles.barVal} ${textClass}`}>{row.valueText}</span>
    </div>
  );
}

// ─── Line Chart SVG ───────────────────────────────────────────────────────────
function LineChart({ points }: { points: RcLinePoint[] }) {
  if (points.length === 0) return null;

  const W = 240;
  const H = 90;
  const padL = 32;
  const padR = 8;
  const padT = 8;
  const padB = 16;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const xs = points.map((_, i) =>
    points.length === 1 ? padL + chartW / 2 : padL + (i / (points.length - 1)) * chartW,
  );
  const ys = points.map((p) => padT + chartH - p.ratio * chartH);

  const polyPts = xs.map((x, i) => `${x},${ys[i]}`).join(' ');

  return (
    <div className={styles.lineChart}>
      <svg className={styles.lineSvg} viewBox={`0 0 ${W} ${H}`}>
        {/* axes */}
        <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#E6EBF3" strokeWidth={0.5} />
        <line x1={padL} y1={padT + chartH} x2={W - padR} y2={padT + chartH} stroke="#E6EBF3" strokeWidth={0.5} />

        {/* line */}
        <polyline
          points={polyPts}
          fill="none"
          stroke="#1B3A6B"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* dots + labels */}
        {points.map((p, i) => (
          <g key={p.label}>
            <circle cx={xs[i]} cy={ys[i]} r={3} fill="#1B3A6B" />
            <text
              x={xs[i]}
              y={padT + chartH + 12}
              fontSize={9}
              fill="var(--ink-soft)"
              textAnchor="middle"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function StageRentacarDashboard({ state, actions }: Props) {
  const db = state.rentacarDashboard;

  const [activeTab, setActiveTab] = useState<RcDashTabId>(db?.activeTab ?? 'talk');

  useEffect(() => {
    if (db?.activeTab) setActiveTab(db.activeTab);
  }, [db?.activeTab]);

  if (!db) return <div />;

  // Title with optional company placeholder substitution
  const displayTitle = db.companyPlaceholder
    ? db.title.replace('SK렌터카', db.companyPlaceholder)
    : db.title;

  const kpiToneClass = (tone: string) =>
    tone === 'ok' ? styles.kpiOk : tone === 'warn' ? styles.kpiWarn : styles.kpiDanger;

  return (
    <div className={styles.dbWrap}>
      {/* Header */}
      <div className={styles.dbHeader}>
        <div>
          <div className={styles.dbTitle}>
            {db.companyPlaceholder ? (
              <>
                <span className={styles.placeholderInline}>{db.companyPlaceholder}</span>
                {db.title.replace('SK렌터카', '')}
              </>
            ) : (
              displayTitle
            )}
          </div>
          <div className={styles.dbMeta}>{db.meta}</div>
        </div>
        {(db.realtimeLabel) && (
          <div className={styles.headerRight}>
            <span className={styles.badgeOk}>실시간</span>
            <span className={styles.dbMeta}>{db.realtimeLabel}</span>
          </div>
        )}
      </div>

      {/* KPI Grid */}
      <div className={styles.kpiGrid}>
        {db.kpis.map((kpi, i) => (
          <div key={i} className={`${styles.kpi} ${kpiToneClass(kpi.tone)}`}>
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={styles.kpiVal}>{kpi.value}</div>
            <div className={styles.kpiSub}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {db.tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Sections */}
      {activeTab === 'talk' && (
        <div className={styles.twoCol}>
          {/* Donut panel */}
          {db.donut && (
            <div className={styles.panel}>
              <div className={styles.panelTitle}>채널별 접촉 비율</div>
              <DonutChart segs={db.donut.segs} total={db.donut.total} />
            </div>
          )}

          {/* Zero contact panel */}
          {db.zeroContact && (
            <div className={styles.panel}>
              <div className={styles.panelTitle}>접촉 0건 영업사원</div>
              <div className={styles.alertBox}>
                <div>
                  <div className={styles.alertVal}>{db.zeroContact.value}</div>
                  <div className={styles.alertLabel}>{db.zeroContact.sub}</div>
                </div>
              </div>
              {db.zeroContact.bars.length > 0 && (
                <div className={styles.subSectionLabel}>팀별 현황</div>
              )}
              {db.zeroContact.bars.map((bar, i) => (
                <BarRow key={i} row={bar} />
              ))}
              {db.zeroContact.note && <div className={styles.note}>{db.zeroContact.note}</div>}
            </div>
          )}
        </div>
      )}

      {activeTab === 'asset' && db.assetGap && (
        <div className={`${styles.panel} ${db.assetGap.highlight ? styles.panelHighlight : ''}`}>
          <div className={styles.panelTitle}>오늘 발생 대화 vs COSS 적재 완료</div>
          {/* Gap bar */}
          <div className={styles.gapRow}>
            <div
              className={styles.gapSegDone}
              style={{ width: `${db.assetGap.donePercent}%` }}
            >
              {db.assetGap.doneLabel}
            </div>
            <div className={styles.gapSegGap}>
              {db.assetGap.gapLabel}
            </div>
          </div>
          {db.assetGap.note && (
            <div className={`${styles.note} ${styles.noteMb}`}>{db.assetGap.note}</div>
          )}

          {(db.assetGap.causeTitle || db.assetGap.causes) && (
            <hr className={styles.divider} />
          )}

          {db.assetGap.causeTitle && (
            <div className={`${styles.panelTitle} ${styles.panelTitleWarn}`}>
              {db.assetGap.causeTitle}
            </div>
          )}
          {db.assetGap.causes?.map((bar, i) => (
            <BarRow key={i} row={bar} />
          ))}
          {db.assetGap.actionNote && (
            <div className={styles.warnBox}>
              <div className={styles.warnBoxText}>{db.assetGap.actionNote}</div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'revenue' && (
        <div>
          <div className={styles.twoCol}>
            {/* Conv bars */}
            {(db.convTitle || db.convBars) && (
              <div className={styles.panel}>
                {db.convTitle && <div className={styles.panelTitle}>{db.convTitle}</div>}
                {db.convBars?.map((bar, i) => (
                  <BarRow key={i} row={bar} />
                ))}
                {db.convNote && <div className={styles.note}>{db.convNote}</div>}
              </div>
            )}
            {/* Line chart */}
            {db.convLine && (
              <div className={styles.panel}>
                <div className={styles.panelTitle}>접촉 횟수별 전환율</div>
                <LineChart points={db.convLine.points} />
                {db.convLine.note && <div className={styles.note}>{db.convLine.note}</div>}
              </div>
            )}
          </div>
          {/* Coaching note */}
          {db.coachingNote && (
            <div className={styles.panel}>
              <div className={styles.panelTitle}>AI 코칭 인사이트</div>
              <div
                className={styles.coachingText}
                dangerouslySetInnerHTML={{ __html: db.coachingNote }}
              />
            </div>
          )}
        </div>
      )}

      {activeTab === 'risk' && (
        <div>
          {/* Risk cards */}
          {db.risks && (
            <div className={styles.riskGrid}>
              {db.risks.map((risk, i) => {
                const cardClass =
                  risk.tone === 'hot'
                    ? styles.riskHot
                    : risk.tone === 'warm'
                    ? styles.riskWarm
                    : styles.riskOk;
                const numClass =
                  risk.tone === 'hot'
                    ? styles.riskNumHot
                    : risk.tone === 'warm'
                    ? styles.riskNumWarm
                    : styles.riskNumOk;
                return (
                  <div key={i} className={`${styles.riskCard} ${cardClass}`}>
                    <div className={`${styles.riskNum} ${numClass}`}>{risk.value}</div>
                    <div className={styles.riskDesc}>{risk.desc}</div>
                    {risk.drillLabel && (
                      <button className={styles.drillBtn}>{risk.drillLabel} ↗</button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Handoff table */}
          {(db.handoffTitle || db.handoff) && (
            <div className={styles.panel}>
              {db.handoffTitle && (
                <div className={styles.panelTitle}>{db.handoffTitle}</div>
              )}
              <div className={styles.handoffHeader}>
                <span>이름</span>
                <span>담당 고객</span>
                <span>퇴사일</span>
                <span>상태</span>
              </div>
              {db.handoff?.map((row, i) => {
                const badgeClass =
                  row.status === 'done'
                    ? styles.badgeOk
                    : row.status === 'progress'
                    ? styles.badgeWarn
                    : styles.badgeDanger;
                const badgeLabel =
                  row.status === 'done' ? '완료' : row.status === 'progress' ? '진행 중' : '미완료';
                return (
                  <div key={i} className={styles.handoffRow}>
                    <span className={styles.handoffName}>{row.name}</span>
                    <span>{row.clients}</span>
                    <span>{row.date}</span>
                    <span className={`${styles.badge} ${badgeClass}`}>{badgeLabel}</span>
                  </div>
                );
              })}
              {db.handoffNote && <div className={styles.note}>{db.handoffNote}</div>}
            </div>
          )}
        </div>
      )}

      {/* Actions slot */}
      {actions && <div className={styles.controlActions}>{actions}</div>}
    </div>
  );
}
