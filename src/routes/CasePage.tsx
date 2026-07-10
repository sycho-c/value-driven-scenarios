import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getCase } from '@/cases/_registry';
import { CaseShell } from '@/components/shells/CaseShell';
import { ChapterRunner } from '@/components/scenario/ChapterRunner';
import { CaseIntroVideo } from '@/components/scenario/CaseIntroVideo';

export default function CasePage() {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const caseDef = caseId ? getCase(caseId) : null;

  const [currentChapterId, setCurrentChapterId] = useState<number | null>(
    caseDef?.chapters[0]?.id ?? null,
  );
  const [pendingStartIndex, setPendingStartIndex] = useState<number>(0);
  const [introDismissed, setIntroDismissed] = useState<boolean>(!caseDef?.introVideo);

  useEffect(() => {
    setCurrentChapterId(caseDef?.chapters[0]?.id ?? null);
    setPendingStartIndex(0);
    setIntroDismissed(!caseDef?.introVideo);
  }, [caseDef?.id, caseDef?.introVideo]);

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

  const currentChapter =
    caseDef.chapters.find((c) => c.id === currentChapterId) ?? caseDef.chapters[0];

  if (!currentChapter) {
    return (
      <CaseShell caseDef={caseDef}>
        <div style={{ padding: 64, textAlign: 'center', color: '#4A4D52' }}>
          챕터 데이터가 아직 등록되지 않았습니다.
        </div>
      </CaseShell>
    );
  }

  return (
    <>
      <CaseShell caseDef={caseDef}>
        <ChapterRunner
          key={`${caseDef.id}-${currentChapter.id}-${pendingStartIndex}`}
          caseDef={caseDef}
          chapter={currentChapter}
          onChapterChange={handleChapterChange}
          initialStateIndex={pendingStartIndex}
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
    </>
  );
}
