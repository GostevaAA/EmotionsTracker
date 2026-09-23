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
    color: string;  // основной цвет (иконка, текст)
    bg: string;     // фон (с прозрачностью)
};

/**
 * Карта: уровень настроения 1-5 → иконка, подпись, цвета.
 * 1 — очень плохо, 5 — отлично.
 */
export const MOODS: Record<number, MoodMeta> = {
    1: { icon: Annoyed, label: 'Очень плохо', color: '#ef4444', bg: '#ef444422' },
    2: { icon: Frown, label: 'Плохо', color: '#f97316', bg: '#f9731622' },
    3: { icon: Meh, label: 'Нейтрально', color: '#eab308', bg: '#eab30822' },
    4: { icon: Smile, label: 'Хорошо', color: '#84cc16', bg: '#84cc1622' },
    5: { icon: Laugh, label: 'Отлично', color: '#22c55e', bg: '#22c55e22' },
};

/**
 * Безопасно получить метаданные настроения.
 * Если придёт некорректное число — вернёт нейтральное (3).
 */
export const getMoodMeta = (mood: number): MoodMeta =>
    MOODS[mood] ?? MOODS[3];

/**
 * Среднее настроение за период.
 * Возвращает число с одним знаком после запятой или null, если записей нет.
 */
export function averageMood(entries: MoodEntry[]): number | null {
    if (entries.length === 0) return null;
    const sum = entries.reduce((acc, e) => acc + e.mood, 0);
    return Math.round((sum / entries.length) * 10) / 10;
}