import { format, subDays } from 'date-fns';
import { BarChart3, BookOpen, CalendarCheck, Flame } from 'lucide-react';
import type { MoodEntry } from '../types/mood';
import { calculateStreak } from '../utils/date';
import { averageMood } from '../utils/stats';

type Props = { entries: MoodEntry[] };

export function StatsCard({ entries }: Props) {
    const weekAgo = format(subDays(new Date(), 7), 'yyyy-MM-dd');
    const weekEntries = entries.filter((e) => e.date >= weekAgo);

    const items = [
        {
            Icon: CalendarCheck,
            value: weekEntries.length,
            label: 'за неделю',
            color: '#6366f1', // indigo
        },
        {
            Icon: BarChart3,
            value: averageMood(weekEntries) ?? '—',
            label: 'среднее',
            color: '#0ea5e9', // sky
        },
        {
            Icon: Flame,
            value: calculateStreak(entries.map((e) => e.date)),
            label: 'серия',
            color: '#f97316', // orange
        },
        {
            Icon: BookOpen,
            value: entries.length,
            label: 'всего',
            color: '#10b981', // emerald
        },
    ];

    return (
        <div className="grid grid-cols-4 gap-2">
            {items.map(({ Icon, value, label, color }) => (
                <div
                    key={label}
                    className="bg-white dark:bg-gray-900 rounded-2xl p-3 text-center shadow-sm"
                >
                    <Icon
                        className="w-5 h-5 mx-auto mb-1"
                        style={{ color }}
                        strokeWidth={2.2}
                    />
                    <div className="text-lg font-semibold dark:text-white">
                        {value}
                    </div>
                    <div className="text-xs text-gray-500">{label}</div>
                </div>
            ))}
        </div>
    );
}