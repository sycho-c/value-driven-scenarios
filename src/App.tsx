import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '@/routes/HomePage';
import CasePage from '@/routes/CasePage';
import NotFoundPage from '@/routes/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/case/:caseId" element={<CasePage />} />
      <Route path="/cases" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
