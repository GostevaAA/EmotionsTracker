import { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';

function getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

function getStoredTheme(): ThemeMode {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
    }
    return 'system';
}

/**
 * Применяет тему к <html>: добавляет/убирает класс dark.
 */
function applyTheme(mode: ThemeMode) {
    const resolved = mode === 'system' ? getSystemTheme() : mode;
    document.documentElement.classList.toggle('dark', resolved === 'dark');
}

export function useTheme() {
    const [mode, setMode] = useState<ThemeMode>(getStoredTheme);

    // Применяем при смене режима
    useEffect(() => {
        applyTheme(mode);
        localStorage.setItem(STORAGE_KEY, mode);
    }, [mode]);

    // Слушаем изменения системной темы (актуально только в режиме 'system')
    useEffect(() => {
        if (mode !== 'system') return;

        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => applyTheme('system');
        media.addEventListener('change', handler);
        return () => media.removeEventListener('change', handler);
    }, [mode]);

    return { mode, setMode };
}