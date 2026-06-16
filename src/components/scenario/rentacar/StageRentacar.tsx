import { type ReactNode } from 'react';
import type { ChapterStateNode } from '@/cases/_types';
import { StageRentacarDashboard } from './StageRentacarDashboard';
import { StageRentacarStt } from './StageRentacarStt';
import { StageRentacarTimeline } from './StageRentacarTimeline';
import { StageRentacarAttrition } from './StageRentacarAttrition';
import { StageRentacarPanel } from './StageRentacarPanel';

interface Props {
  state: ChapterStateNode;
  actions?: ReactNode;
  onAdvance?: (nextIndex: number) => void;
}

/**
 * SK렌터카(Cowork+) 단일 디스패처 stage.
 * 한 챕터 안에서 state 노드마다 서로 다른 화면(대시보드/STT/타임라인/퇴사/패널)을
 * 섞어 쓸 수 있도록, 노드에 들어있는 rentacar* 필드를 보고 알맞은 컴포넌트를 고른다.
 */
export function StageRentacar({ state, actions, onAdvance }: Props) {
  if (state.rentacarDashboard) {
    return <StageRentacarDashboard state={state} actions={actions} onAdvance={onAdvance} />;
  }
  if (state.rentacarStt) {
    return <StageRentacarStt state={state} actions={actions} onAdvance={onAdvance} />;
  }
  if (state.rentacarTimeline) {
    return <StageRentacarTimeline state={state} actions={actions} onAdvance={onAdvance} />;
  }
  if (state.rentacarAttrition) {
    return <StageRentacarAttrition state={state} actions={actions} onAdvance={onAdvance} />;
  }
  if (state.rentacarPanel) {
    return <StageRentacarPanel state={state} actions={actions} onAdvance={onAdvance} />;
  }
  return (
    <div style={{ padding: 24, color: 'var(--muted)', textAlign: 'center' }}>
      rentacar 화면 데이터가 없습니다.
    </div>
  );
}
