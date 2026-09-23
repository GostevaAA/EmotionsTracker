import { format, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { MoodEntry } from '../types/mood';
import { MOODS } from './stats';

export type ChartPoint = {
    date: string;       // "15.01"
    fullDate: string;   // "2025-01-15"
    mood: number | null;
    note?: string;
};

/**
 * Готовит данные для графика: за каждый день периода — точка.
 * Если записи нет — mood: null (линия прерывается).
 */
export function buildChartData(
    entries: MoodEntry[],
    days: number
): ChartPoint[] {
    const byDate = new Map(entries.map((e) => [e.date, e]));
    const points: ChartPoint[] = [];

    for (let i = days - 1; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const key = format(date, 'yyyy-MM-dd');
        const entry = byDate.get(key);

        points.push({
            date: format(date, 'd MMM', { locale: ru }),
            fullDate: key,
            mood: entry?.mood ?? null,
            note: entry?.note,
        });
    }

    return points;
}

export type DistributionItem = {
    mood: number;
    label: string;
    count: number;
    color: string;
};

/**
 * Считает, сколько дней каждого настроения в entries.
 */
export function buildDistribution(entries: MoodEntry[]): DistributionItem[] {
    const counts = new Map<number, number>();
    for (const e of entries) {
        counts.set(e.mood, (counts.get(e.mood) ?? 0) + 1);
    }

    return [1, 2, 3, 4, 5].map((level) => ({
        mood: level,
        label: MOODS[level].label,
        count: counts.get(level) ?? 0,
        color: MOODS[level].color,
    }));
}