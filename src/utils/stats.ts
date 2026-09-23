import {
    Annoyed,
    Frown,
    Laugh,
    Meh,
    Smile,
    type LucideIcon,
} from 'lucide-react';
import type { MoodEntry } from '../types/mood';

export type MoodMeta = {
    icon: LucideIcon;
    label: string;
    color: string;
    bg: string;
};

// Цвета настроений — локально, без импортов.
// Меняешь здесь и в tailwind.config.js.
const MOOD_COLORS: Record<number, string> = {
    1: '#e57373',
    2: '#f0a56e',
    3: '#e8c05e',
    4: '#a3c96a',
    5: '#6ec89a',
};

const moodColor = (level: number): string =>
    MOOD_COLORS[level] ?? MOOD_COLORS[3];

export const MOODS: Record<number, MoodMeta> = {
    1: { icon: Annoyed, label: 'Очень плохо', color: moodColor(1), bg: moodColor(1) + '22' },
    2: { icon: Frown, label: 'Плохо', color: moodColor(2), bg: moodColor(2) + '22' },
    3: { icon: Meh, label: 'Нейтрально', color: moodColor(3), bg: moodColor(3) + '22' },
    4: { icon: Smile, label: 'Хорошо', color: moodColor(4), bg: moodColor(4) + '22' },
    5: { icon: Laugh, label: 'Отлично', color: moodColor(5), bg: moodColor(5) + '22' },
};

export const getMoodMeta = (mood: number): MoodMeta =>
    MOODS[mood] ?? MOODS[3];

export function averageMood(entries: MoodEntry[]): number | null {
    if (entries.length === 0) return null;
    const sum = entries.reduce((acc, e) => acc + e.mood, 0);
    return Math.round((sum / entries.length) * 10) / 10;
}