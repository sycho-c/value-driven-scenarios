import type { PhoneScreen, CastMember } from '@/cases/_types';
import { WontalkScreen } from './WontalkScreen';
import { KakaoScreen } from './KakaoScreen';
import { BizFormScreen } from './BizFormScreen';
import { AuthSmsScreen } from './AuthSmsScreen';
import { TasksScreen } from './TasksScreen';
import { FriendsSearchScreen } from './FriendsSearchScreen';

interface PhoneScreenViewProps {
  screen: PhoneScreen;
  castById: Record<string, CastMember>;
  ownerCastId?: string;
}

export function PhoneScreenView({ screen, castById, ownerCastId }: PhoneScreenViewProps) {
  switch (screen.type) {
    case 'wontalk-group':
      return <WontalkScreen screen={screen} castById={castById} ownerCastId={ownerCastId} />;
    case 'kakao-group':
    case 'kakao-1to1':
      return <KakaoScreen screen={screen} castById={castById} ownerCastId={ownerCastId} />;
    case 'bizform':
      return <BizFormScreen screen={screen} />;
    case 'auth-sms':
      return <AuthSmsScreen screen={screen} />;
    case 'tasks':
      return <TasksScreen screen={screen} />;
    case 'friends-search':
      return <FriendsSearchScreen screen={screen} />;
    default:
      return (
        <div style={{ padding: 24, fontSize: 12, color: '#888' }}>
          (화면 타입 미구현: <code>{screen.type}</code>)
        </div>
      );
  }
}
