import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: 24,
      }}
    >
      <div>
        <h1 style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.02em' }}>404</h1>
        <p style={{ marginTop: 8, color: 'var(--ink-soft)' }}>찾을 수 없는 페이지입니다.</p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            marginTop: 20,
            padding: '12px 22px',
            background: 'var(--brand)',
            color: '#fff',
            borderRadius: 999,
            fontWeight: 700,
          }}
        >
          메인으로 →
        </Link>
      </div>
    </div>
  );
}
