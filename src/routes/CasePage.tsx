import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getCase } from '@/cases/_registry';
import { CaseShell } from '@/components/shells/CaseShell';
import { ChapterRunner } from '@/components/scenario/ChapterRunner';
import { CaseIntroVideo } from '@/components/scenario/CaseIntroVideo';
import { ChapterGroupSelect } from '@/components/scenario/ChapterGroupSelect';

export default function CasePage() {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const caseDef = caseId ? getCase(caseId) : null;

  const [currentChapterId, setCurrentChapterId] = useState<number | null>(
    caseDef?.chapters[0]?.id ?? null,
  );
  const [pendingStartIndex, setPendingStartIndex] = useState<number>(0);
  const [introDismissed, setIntroDismissed] = useState<boolean>(!caseDef?.introVideo);
  // 산업 적용 등 그룹 슬롯 선택 — number(선택된 챕터 id) | 'all'(전체 보기) | null(미선택)
  const [groupChoice, setGroupChoice] = useState<number | 'all' | null>(null);

  useEffect(() => {
    setCurrentChapterId(caseDef?.chapters[0]?.id ?? null);
    setPendingStartIndex(0);
    setIntroDismissed(!caseDef?.introVideo);
    setGroupChoice(null);
  }, [caseDef?.id, caseDef?.introVideo]);

  // 그룹 슬롯에서 산업 하나를 골랐으면, 나머지 그룹 멤버를 챕터 목록에서 제거한
  // CaseDef를 만든다. 미선택('all' 포함)이거나 선택 UI가 없는 케이스는 원본 그대로.
  const effectiveCaseDef = useMemo(() => {
    const select = caseDef?.chapterGroupSelect;
    if (!caseDef || !select || groupChoice === null || groupChoice === 'all') {
      return caseDef;
    }
    return {
      ...caseDef,
      chapters: caseDef.chapters.filter(
        (c) => c.group?.id !== select.groupId || c.id === groupChoice,
      ),
    };
  }, [caseDef, groupChoice]);

  const handleChapterChange = useCallback(
    (id: number, opts?: { atEnd?: boolean }) => {
      setCurrentChapterId(id);
      setPendingStartIndex(opts?.atEnd ? Number.MAX_SAFE_INTEGER : 0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [],
  );

  if (!caseDef) {
    return (
      <div style={{ padding: 64, textAlign: 'center' }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>존재하지 않는 사례입니다.</h2>
        <Link to="/" style={{ color: '#5B3FE4', fontWeight: 700 }}>
          메인으로 돌아가기 →
        </Link>
      </div>
    );
  }

  // effectiveCaseDef는 caseDef가 non-null일 때 항상 non-null을 반환하므로 안전.
  const activeCaseDef = effectiveCaseDef ?? caseDef;

  const currentChapter =
    activeCaseDef.chapters.find((c) => c.id === currentChapterId) ?? activeCaseDef.chapters[0];

  if (!currentChapter) {
    return (
      <CaseShell caseDef={caseDef}>
        <div style={{ padding: 64, textAlign: 'center', color: '#4A4D52' }}>
          챕터 데이터가 아직 등록되지 않았습니다.
        </div>
      </CaseShell>
    );
  }

  const groupSelect = caseDef.chapterGroupSelect;
  const showGroupSelect = !!groupSelect && groupChoice === null && introDismissed;

  const handleGroupSelect = (chapterId: number) => {
    setGroupChoice(chapterId);
    setCurrentChapterId(caseDef.chapters[0]?.id ?? null);
    setPendingStartIndex(0);
  };

  const handleGroupSelectAll = () => {
    setGroupChoice('all');
    setCurrentChapterId(caseDef.chapters[0]?.id ?? null);
    setPendingStartIndex(0);
  };

  return (
    <>
      <CaseShell caseDef={caseDef}>
        <ChapterRunner
          key={`${activeCaseDef.id}-${currentChapter.id}-${pendingStartIndex}`}
          caseDef={activeCaseDef}
          chapter={currentChapter}
          onChapterChange={handleChapterChange}
          initialStateIndex={pendingStartIndex}
          onGroupReselect={groupSelect ? () => setGroupChoice(null) : undefined}
        />
      </CaseShell>
      {caseDef.introVideo && !introDismissed && (
        <CaseIntroVideo
          intro={caseDef.introVideo}
          onDismiss={() => setIntroDismissed(true)}
          onClose={() => {
            if (window.history.length > 1) navigate(-1);
            else navigate('/');
          }}
        />
      )}
      {showGroupSelect && groupSelect && (
        <ChapterGroupSelect
          select={groupSelect}
          members={caseDef.chapters.filter((c) => c.group?.id === groupSelect.groupId)}
          accentColor={caseDef.accentColor}
          onSelect={handleGroupSelect}
          onSelectAll={handleGroupSelectAll}
        />
      )}
    </>
  );
}
