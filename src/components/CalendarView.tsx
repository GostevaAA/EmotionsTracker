import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { MoodEntry } from '../types/mood';
import {
    buildMonthGrid,
    formatMonthTitle,
    weekdayLabels,
} from '../utils/calendar';
import { getMoodMeta } from '../utils/stats';

type Props = {
    entries: MoodEntry[];
    onSelectDate: (dateKey: string) => void;
};

export function CalendarView({ entries, onSelectDate }: Props) {
    const [month, setMonth] = useState(() => new Date());

    const entriesByDate = new Map(entries.map((e) => [e.date, e]));
    const days = buildMonthGrid(month);
    const weekdays = weekdayLabels();

    const prevMonth = () =>
        setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
    const nextMonth = () =>
        setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm">
            {/* Заголовок + навигация */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={prevMonth}
                    aria-label="Предыдущий месяц"
                    className="p-1 rounded-lg text-gray-400 hover:text-gray-700
            dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <h2 className="text-lg font-semibold dark:text-white">
                    {formatMonthTitle(month)}
                </h2>

                <button
                    onClick={nextMonth}
                    aria-label="Следующий месяц"
                    className="p-1 rounded-lg text-gray-400 hover:text-gray-700
            dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Дни недели */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {weekdays.map((label) => (
                    <div
                        key={label}
                        className="text-center text-xs font-medium text-gray-400 py-1"
                    >
                        {label}
                    </div>
                ))}
            </div>

            {/* Сетка дней */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day) => {
                    const entry = entriesByDate.get(day.key);
                    const meta = entry ? getMoodMeta(entry.mood) : null;
                    const disabled = day.isFuture;

                    return (
                        <button
                            key={day.key}
                            onClick={() => !disabled && onSelectDate(day.key)}
                            disabled={disabled}
                            aria-label={
                                `${day.key}${entry ? `, настроение: ${meta?.label}` : ''}`
                            }
                            className={`aspect-square rounded-lg flex flex-col items-center
                justify-center gap-0.5 transition-all duration-150
                ${disabled
                                    ? 'cursor-not-allowed'
                                    : 'hover:scale-105 hover:shadow-sm active:scale-95'
                                }
                ${!day.inCurrentMonth ? 'opacity-30' : ''}
                ${day.isToday ? 'ring-2 ring-indigo-400' : ''}
              `}
                            style={
                                entry
                                    ? { backgroundColor: meta!.bg }
                                    : { backgroundColor: '#9ca3af11' }
                            }
                        >
                            <span
                                className={`text-xs font-medium leading-none ${entry ? '' : 'text-gray-400 dark:text-gray-500'
                                    }`}
                                style={entry ? { color: meta!.color } : undefined}
                            >
                                {day.dayNumber}
                            </span>

                            {entry && meta && (
                                <meta.icon
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                    style={{ color: meta.color }}
                                    strokeWidth={2.2}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Легенда */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-center gap-3 flex-wrap">
                    {[1, 2, 3, 4, 5].map((level) => {
                        const meta = getMoodMeta(level);
                        return (
                            <div key={level} className="flex items-center gap-1.5">
                                <div
                                    className="w-3 h-3 rounded"
                                    style={{ backgroundColor: meta.color + '66' }}
                                />
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {meta.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}