import { type ReactNode } from 'react';
import type { ChapterStateNode } from '@/cases/_types';
import { MfgArena } from './MfgArena';
import { MfgOverseas } from './MfgOverseas';
import { MfgDashboard } from './MfgDashboard';
import { MfgValueStrip } from './MfgValueStrip';

interface Props {
  state: ChapterStateNode;
  actions?: ReactNode;
}

/**
 * 제조/유통 공통 골격(cowork-manufacturing) 단일 디스패처 stage.
 * 노드에 들어있는 mfg* 필드를 보고 알맞은 화면(아레나/해외 멀티 메신저/대시보드)을 고르고,
 * 3대 요건 스트립(mfgValueStrip)을 무대와 액션 사이에 상시 노출한다.
 */
export function StageManufacturing({ state, actions }: Props) {
  const strip = state.mfgValueStrip ? <MfgValueStrip value={state.mfgValueStrip} /> : null;
  const tail = (
    <>
      {strip}
      {actions}
    </>
  );

  if (state.mfgArena) {
    return <MfgArena state={state.mfgArena} actions={tail} />;
  }
  if (state.mfgOverseas) {
    return <MfgOverseas state={state.mfgOverseas} actions={tail} />;
  }
  if (state.mfgDashboard) {
    return <MfgDashboard state={state.mfgDashboard} actions={tail} />;
  }
  return (
    <div style={{ padding: 24, color: 'var(--muted)', textAlign: 'center' }}>
      manufacturing 화면 데이터가 없습니다.
    </div>
  );
}
