import { useEffect, useState, type ReactNode } from 'react';
import type {
  ChapterStateNode,
  ExecBeforeAfterPanel,
  ExecDashboardFullState,
} from '@/cases/_types';
import { cn } from '@/lib/cn';
import { PhoneFrame } from '../phones/PhoneFrame';
import { HanaSplitMessage } from '../hana/HanaSplitMessage';
import { CountUpValue } from '../hana/CountUpValue';
import styles from './StageExecDashboard.module.css';

interface StageExecDashboardProps {
  state: ChapterStateNode;
  actions?: ReactNode;
  onAdvance?: (nextIndex: number) => void;
}

export function StageExecDashboard({
  state,
  actions,
  onAdvance,
}: StageExecDashboardProps) {
  const dash = state.execDashboardFull;
  if (!dash) {
    return (
      <div style={{ padding: 24, color: 'var(--muted)', textAlign: 'center' }}>
        execDashboardFull 데이터가 없습니다.
      </div>
    );
  }
  return (
    <DashInner
      dash={dash}
      guide={state.guide}
      actions={actions}
      onAdvance={onAdvance}
    />
  );
}

function DashInner({
  dash,
  guide,
  actions,
  onAdvance,
}: {
  dash: ExecDashboardFullState;
  guide?: string;
  actions?: ReactNode;
  onAdvance?: (nextIndex: number) => void;
}) {
  const [drilldownDismissed, setDrilldownDismissed] = useState(false);
  const [drilldownShown, setDrilldownShown] = useState(false);

  useEffect(() => {
    setDrilldownDismissed(false);
    setDrilldownShown(false);
  }, [dash.stateBarActiveIndex]);

  const onTab = (clickNextIndex?: number) => {
    if (typeof clickNextIndex === 'number') onAdvance?.(clickNextIndex);
  };

  const onBar = (bar: { clickNextIndex?: number; opensDrilldown?: boolean }) => {
    if (bar.opensDrilldown) {
      setDrilldownShown(true);
      setDrilldownDismissed(false);
      return;
    }
    if (typeof bar.clickNextIndex === 'number') onAdvance?.(bar.clickNextIndex);
  };

  const onDrilldownCta = () => {
    setDrilldownDismissed(true);
    setDrilldownShown(false);
    if (typeof dash.drilldown?.ctaNextIndex === 'number') {
      onAdvance?.(dash.drilldown.ctaNextIndex);
    }
  };

  const mobileVisible = dash.mobileVisible !== false;
  const mobileFading = dash.mobileFading === true;
  const mobileGone = !mobileVisible && !mobileFading;
  const drilldownVisible =
    !!dash.drilldown && drilldownShown && !drilldownDismissed;

  const sidebarRooms = [
    { id: 'dashboard', label: '영업본부장 대시보드', unread: 0, active: true },
    { id: 'design-req', label: '설계 요청 채널', unread: 0 },
    { id: 'partner-list', label: 'GA 파트너 관리', unread: 0 },
    { id: 'audit', label: '자동 추출 로그', unread: 0 },
  ];

  return (
    <div className={styles.stage}>
      <div className={styles.phaseBar}>
        <span className={styles.phaseLabel}>Executive Insight</span>
        <div className={styles.phaseSteps}>
          {dash.stateBarSteps.map((step, i) => {
            const active = i === dash.stateBarActiveIndex;
            const done = (dash.doneIndices ?? []).includes(i);
            return (
              <div
                key={step.id}
                className={cn(
                  styles.step,
                  active && styles.active,
                  done && styles.done,
                )}
              >
                <span className={styles.stepDot}>{i + 1}</span>
                <span>{step.label}</span>
                {i < dash.stateBarSteps.length - 1 && (
                  <span className={styles.stepSep}>›</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={cn(styles.contentRow, mobileGone && styles.mobileGone)}
      >
        <div
          className={cn(
            styles.mobileCol,
            mobileFading && styles.fading,
            mobileGone && styles.gone,
          )}
        >
          <PhoneFrame compact label="설계사 · Cowork+" badge="GA">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                background: '#F4F6F7',
              }}
            >
              <div
                style={{
                  padding: '22px 12px 9px',
                  background: '#1B4F72',
                  color: '#fff',
                  fontSize: 11.5,
                  fontWeight: 800,
                  textAlign: 'center',
                  letterSpacing: '-0.01em',
                }}
              >
                {dash.mobilePhoneHeader ?? '하나손보 Cowork+ 앱'}
              </div>
              <div
                style={{
                  flex: 1,
                  padding: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  overflowY: 'auto',
                }}
              >
                {(dash.mobilePhoneMessages ?? []).map((m) => (
                  <HanaSplitMessage key={m.id} message={m} />
                ))}
              </div>
            </div>
          </PhoneFrame>
        </div>

        <div className={styles.workspaceCol}>
          <div className={styles.workspace}>
            <div className={styles.titleBar}>
              <div className={styles.dots}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
              <span className={styles.titleBarText}>
                {dash.masterTitle.split('—')[0]?.trim() ??
                  'Cowork+ 영업본부장 콘솔'}{' '}
                — 영업본부장 Workspace
              </span>
              <span className={styles.titleBarBrand}>COWORK+</span>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.sidebarLogo}>COWORK+ · CONSOLE</div>
              {sidebarRooms.map((r) => (
                <div
                  key={r.id}
                  className={cn(
                    styles.sidebarItem,
                    r.active && styles.active,
                  )}
                >
                  <span>{r.label}</span>
                  {r.unread ? (
                    <span className={styles.sidebarUnread}>{r.unread}</span>
                  ) : null}
                </div>
              ))}
            </aside>

            <section className={styles.main}>
              {dash.tabs && dash.tabs.length > 0 && (
                <div className={styles.tabs}>
                  {dash.tabs.map((tab) => {
                    const clickable = typeof tab.clickNextIndex === 'number';
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        className={cn(styles.tab, tab.active && styles.active)}
                        onClick={() => clickable && onTab(tab.clickNextIndex)}
                      >
                        {tab.label}
                        {tab.pulse && <span className={styles.tabPulse} />}
                      </button>
                    );
                  })}
                </div>
              )}

              <header className={styles.mainHeader}>
                <div className={styles.mainTitle}>
                  <span className={styles.mainTitleText}>
                    채널 운영 대시보드
                  </span>
                  <span className={styles.mainTitleMeta}>
                    영업본부장 시점 · 실시간 집계
                  </span>
                </div>
                <span className={styles.mainRoleBadge}>본부장 · ADMIN</span>
              </header>

              {dash.preDashboardEmpty ? (
                <div className={styles.preEmpty}>{dash.preDashboardEmpty}</div>
              ) : dash.beforeAfter ? (
                <BeforeAfterPanel panel={dash.beforeAfter} />
              ) : (
                <div className={styles.dashboard}>
                  {dash.widgets && dash.widgets.length > 0 && (
                    <div className={styles.widgets}>
                      {dash.widgets.map((w) => (
                        <div
                          key={w.id}
                          className={cn(styles.widget, styles[w.tone])}
                        >
                          <div className={styles.widgetTitle}>{w.title}</div>
                          <div className={styles.widgetValueRow}>
                            <span className={styles.widgetValue}>
                              {w.prefix}
                              <CountUpValue
                                from={w.countUpFrom ?? w.value}
                                to={w.value}
                                durationMs={w.durationMs ?? 1100}
                                fractionDigits={
                                  w.fractionDigits ??
                                  (Number.isInteger(w.value) ? 0 : 1)
                                }
                                resetKey={`${dash.stateBarActiveIndex}-${w.id}`}
                              />
                            </span>
                            {w.suffix && (
                              <span className={styles.widgetSuffix}>
                                {w.suffix}
                              </span>
                            )}
                          </div>
                          <div className={styles.widgetSub}>{w.sub}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {dash.chartTitle && dash.bars && (
                    <div className={styles.chartCard}>
                      <div className={styles.chartTitle}>
                        <span>{dash.chartTitle}</span>
                        <span className={styles.chartTitleMeta}>
                          2026 Q1 · 실시간
                        </span>
                      </div>
                      {dash.bars.map((b, i) => (
                        <button
                          key={b.id}
                          type="button"
                          className={cn(
                            styles.barRow,
                            b.clickable && styles.clickable,
                            b.tone && styles[b.tone],
                          )}
                          onClick={() => b.clickable && onBar(b)}
                        >
                          <span className={styles.barLabel}>{b.label}</span>
                          <span className={styles.barTrack}>
                            <span
                              key={`${dash.stateBarActiveIndex}-${b.id}`}
                              className={styles.barFill}
                              style={
                                {
                                  '--bar-target-width': `${b.widthPercent}%`,
                                  '--bar-delay': `${200 + i * 120}ms`,
                                } as React.CSSProperties
                              }
                            >
                              {b.valueText}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <div className={cn(styles.controlBar, !guide && styles.controlBarCenter)}>
        {guide && (
          <div className={styles.guide}>
            <span className={styles.guideLabel}>이 화면에서</span>
            <span>{guide}</span>
          </div>
        )}
        {actions && (
          <div className={styles.controlActions}>{actions}</div>
        )}
      </div>

      {dash.drilldown && (
        <>
          <div
            className={cn(
              styles.drilldownBackdrop,
              drilldownVisible && styles.show,
            )}
            onClick={() => {
              setDrilldownDismissed(true);
              setDrilldownShown(false);
            }}
          />
          <div className={cn(styles.drilldown, drilldownVisible && styles.show)}>
            <span className={styles.drilldownEyebrow}>Drill-down · Micro view</span>
            <div className={styles.drilldownTitle}>{dash.drilldown.title}</div>
            {dash.drilldown.causeRows || dash.drilldown.impact ? (
              <div className={styles.drilldownGrid}>
                <div className={styles.drilldownLeftCol}>
                  <div className={styles.drilldownSubTitle}>추천 비율 저조 원인</div>
                  {(dash.drilldown.causeRows ?? []).map((c) => (
                    <div key={c.label} className={styles.causeRow}>
                      <span className={styles.causeLabel}>{c.label}</span>
                      <span className={styles.causeTrack}>
                        <span
                          className={cn(styles.causeFill, styles[c.tone])}
                          style={{ width: `${c.percent}%` }}
                        />
                      </span>
                      <span className={cn(styles.causeVal, styles[c.tone])}>
                        {c.percent}%
                      </span>
                    </div>
                  ))}
                  {dash.drilldown.warnBox && (
                    <div className={styles.warnBox}>
                      {dash.drilldown.warnBox}
                    </div>
                  )}
                </div>
                <div className={styles.drilldownRightCol}>
                  {dash.drilldown.impact && (
                    <>
                      <div className={styles.drilldownSubTitle}>
                        {dash.drilldown.impact.eyebrow}
                      </div>
                      <div className={styles.impactCard}>
                        <div className={styles.impactDeltaRow}>
                          <span className={styles.impactBefore}>
                            {dash.drilldown.impact.before}
                          </span>
                          <span className={styles.impactArrow}>→</span>
                          <span className={styles.impactAfter}>
                            {dash.drilldown.impact.after}
                          </span>
                        </div>
                        <div className={styles.impactSub}>
                          {dash.drilldown.impact.sub}
                        </div>
                      </div>
                    </>
                  )}
                  <button
                    type="button"
                    className={styles.drilldownCta}
                    onClick={onDrilldownCta}
                  >
                    {dash.drilldown.ctaLabel}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {(dash.drilldown.rows ?? []).map((r) => (
                  <div key={r.label} className={styles.drilldownRow}>
                    <strong>{r.label}</strong>
                    <span
                      className={cn(styles.val, r.highlight && styles[r.highlight])}
                    >
                      {r.value}
                    </span>
                  </div>
                ))}
                <button
                  type="button"
                  className={styles.drilldownCta}
                  onClick={onDrilldownCta}
                >
                  {dash.drilldown.ctaLabel}
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function BeforeAfterPanel({ panel }: { panel: ExecBeforeAfterPanel }) {
  return (
    <div className={styles.beforeAfter}>
      <div className={styles.beforeAfterHeader}>
        <span className={styles.beforeAfterEyebrow}>매출 기여 비교</span>
        <span className={styles.beforeAfterTitle}>{panel.title}</span>
      </div>
      <div className={styles.beforeAfterGrid}>
        <div className={cn(styles.beforeAfterCol, styles.before)}>
          <div className={styles.beforeAfterColHead}>{panel.beforeTitle}</div>
          {panel.rows.map((r) => (
            <div key={`b-${r.label}`} className={styles.beforeAfterRow}>
              <span className={styles.beforeAfterRowLabel}>{r.label}</span>
              <span className={styles.beforeAfterRowValue}>{r.before}</span>
            </div>
          ))}
        </div>
        <div className={cn(styles.beforeAfterCol, styles.after)}>
          <div className={styles.beforeAfterColHead}>{panel.afterTitle}</div>
          {panel.rows.map((r) => (
            <div key={`a-${r.label}`} className={styles.beforeAfterRow}>
              <span className={styles.beforeAfterRowLabel}>{r.label}</span>
              <span
                className={cn(
                  styles.beforeAfterRowValue,
                  r.highlight && styles[r.highlight],
                )}
              >
                {r.after}
              </span>
            </div>
          ))}
        </div>
      </div>
      {panel.tagline && (
        <div className={styles.beforeAfterTagline}>{panel.tagline}</div>
      )}
    </div>
  );
}
