import type { PhoneScreen } from '@/cases/_types';
import { cn } from '@/lib/cn';
import styles from './TasksScreen.module.css';

type TaskStatus = 'pending' | 'progress' | 'done';

interface TaskItem {
  id: string;
  title: string;
  sub?: string;
  status: TaskStatus;
  meta?: string;
}

interface TasksMeta {
  filter?: 'all' | TaskStatus;
  tasks: TaskItem[];
}

const STATUS_LABEL: Record<TaskStatus, string> = {
  pending: '대기',
  progress: '처리중',
  done: '완료',
};

const FILTER_OPTIONS: Array<{ id: 'all' | TaskStatus; label: string }> = [
  { id: 'all', label: '전체' },
  { id: 'pending', label: '대기' },
  { id: 'progress', label: '처리중' },
  { id: 'done', label: '완료' },
];

interface TasksScreenProps {
  screen: PhoneScreen;
}

export function TasksScreen({ screen }: TasksScreenProps) {
  const meta = (screen.meta ?? { tasks: [] }) as unknown as TasksMeta;
  const filter = meta.filter ?? 'all';
  const list = filter === 'all' ? meta.tasks : meta.tasks.filter((t) => t.status === filter);

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <span className={styles.iconBtn}>☰</span>
        <div style={{ flex: 1 }}>
          <div className={styles.headerMain}>📋 {screen.headerTitle ?? '내 대화 보기'}</div>
          {screen.headerSubtitle && (
            <div className={styles.headerSub}>{screen.headerSubtitle}</div>
          )}
        </div>
        <span className={styles.iconBtn}>🔔</span>
      </div>
      <div className={styles.filterRow}>
        {FILTER_OPTIONS.map((o) => (
          <span
            key={o.id}
            className={cn(styles.filterChip, filter === o.id && styles.active)}
          >
            {o.label}
          </span>
        ))}
      </div>
      <div className={styles.body}>
        {list.map((task) => (
          <div key={task.id} className={cn(styles.taskCard, styles[task.status])}>
            <div className={styles.taskHead}>
              <span className={styles.taskId}>#{task.id}</span>
              <span className={cn(styles.taskStatus, styles[task.status])}>
                {STATUS_LABEL[task.status]}
              </span>
            </div>
            <div className={styles.taskTitle}>{task.title}</div>
            {task.sub && <div className={styles.taskSub}>{task.sub}</div>}
            {task.meta && <div className={styles.taskMeta}>{task.meta}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
