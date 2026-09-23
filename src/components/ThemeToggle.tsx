import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme, type ThemeMode } from '../hooks/useTheme';

const MODES: { mode: ThemeMode; icon: typeof Sun; label: string }[] = [
    { mode: 'light', icon: Sun, label: 'Светлая' },
    { mode: 'dark', icon: Moon, label: 'Тёмная' },
    { mode: 'system', icon: Monitor, label: 'Системная' },
];

export function ThemeToggle() {
    const { mode, setMode } = useTheme();

    const currentIndex = MODES.findIndex((m) => m.mode === mode);
    const next = MODES[(currentIndex + 1) % MODES.length];
    const CurrentIcon = MODES[currentIndex].icon;

    return (
        <button
            onClick={() => setMode(next.mode)}
            aria-label={`Тема: ${MODES[currentIndex].label}. Переключить на ${next.label}`}
            title={`Тема: ${MODES[currentIndex].label}`}
            className="flex items-center justify-center w-9 h-9 rounded-xl
        bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200
        shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
            <CurrentIcon className="w-4 h-4" strokeWidth={2.2} />
        </button>
    );
}