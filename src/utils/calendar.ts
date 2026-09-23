import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isAfter,
    isSameMonth,
    isToday,
    startOfMonth,
    startOfWeek,
} from 'date-fns';
import { ru } from 'date-fns/locale';

export type CalendarDay = {
    date: Date;
    key: string;              // "2025-09-23"
    dayNumber: number;        // 23
    inCurrentMonth: boolean;  // false для дней соседних месяцев
    isToday: boolean;
    isFuture: boolean;
};

/**
 * Строит массив дней для отображения месяца.
 * Всегда 6 недель × 7 дней = 42 ячейки (стабильная высота).
 * Неделя начинается с понедельника.
 */
export function buildMonthGrid(month: Date): CalendarDay[] {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });

    const days = eachDayOfInterval({ start, end });
    const now = new Date();

    return days.map((date) => ({
        date,
        key: format(date, 'yyyy-MM-dd'),
        dayNumber: date.getDate(),
        inCurrentMonth: isSameMonth(date, month),
        isToday: isToday(date),
        isFuture: isAfter(date, now),
    }));
}

/**
 * Заголовок месяца: "Сентябрь 2025"
 */
export function formatMonthTitle(month: Date): string {
    const raw = format(month, 'LLLL yyyy', { locale: ru });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
}

/**
 * Названия дней недели: ["Пн", "Вт", ...]
 */
export function weekdayLabels(): string[] {
    // Возьмём любую неделю и отформатируем каждый день
    const base = startOfWeek(new Date(), { weekStartsOn: 1 });
    return eachDayOfInterval({
        start: base,
        end: endOfWeek(base, { weekStartsOn: 1 }),
    }).map((d) => format(d, 'EEEEEE', { locale: ru }));
}