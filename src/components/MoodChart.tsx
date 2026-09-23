import { useMemo, useState } from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import type { MoodEntry } from '../types/mood';
import { buildChartData } from '../utils/chartData';
import { getMoodMeta } from '../utils/stats';

type Props = {
    entries: MoodEntry[];
};

const PERIODS = [
    { days: 7, label: '7 дней' },
    { days: 30, label: '30 дней' },
    { days: 90, label: '90 дней' },
];

export function MoodChart({ entries }: Props) {
    const [days, setDays] = useState(30);

    const data = useMemo(
        () => buildChartData(entries, days),
        [entries, days]
    );

    // Есть ли хоть одна точка с данными?
    const hasData = data.some((p) => p.mood !== null);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold dark:text-white">
                    Динамика настроения
                </h2>

                <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    {PERIODS.map((p) => (
                        <button
                            key={p.days}
                            onClick={() => setDays(p.days)}
                            className={`px-3 py-1 text-xs rounded-md transition ${days === p.days
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>

            {!hasData ? (
                <div className="h-56 flex items-center justify-center text-gray-400 text-sm">
                    Нет данных за выбранный период
                </div>
            ) : (
                <div className="h-56 -ml-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e5e7eb"
                                className="dark:opacity-20"
                            />
                            <XAxis
                                dataKey="date"
                                tick={{ fontSize: 11, fill: '#9ca3af' }}
                                interval="preserveStartEnd"
                                minTickGap={20}
                            />
                            <YAxis
                                domain={[1, 5]}
                                ticks={[1, 2, 3, 4, 5]}
                                tick={{ fontSize: 11, fill: '#9ca3af' }}
                                width={20}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="mood"
                                stroke="#6366f1"
                                strokeWidth={2.5}
                                dot={{ r: 3, fill: '#6366f1' }}
                                activeDot={{ r: 5 }}
                                connectNulls={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

/** Кастомный тултип с иконкой и подписью настроения */
function CustomTooltip({
    active,
    payload,
}: {
    active?: boolean;
    payload?: Array<{ payload: { fullDate: string; mood: number | null; note?: string } }>;
}) {
    if (!active || !payload?.length) return null;

    const point = payload[0].payload;
    if (point.mood === null) return null;

    const meta = getMoodMeta(point.mood);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl px-3 py-2 shadow-lg border border-gray-100 dark:border-gray-700 max-w-[200px]">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {point.fullDate}
            </div>
            <div className="flex items-center gap-2">
                <meta.icon
                    className="w-5 h-5"
                    style={{ color: meta.color }}
                    strokeWidth={2.2}
                />
                <span className="text-sm font-medium dark:text-white">
                    {meta.label}
                </span>
            </div>
            {point.note && (
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-300 break-words">
                    {point.note}
                </div>
            )}
        </div>
    );
}