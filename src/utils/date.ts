import { differenceInCalendarDays, format, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';

/**
 * Сегодняшняя дата в формате "YYYY-MM-DD".
 * Используется как ключ для записи (одна запись в день).
 */
export const todayKey = () => format(new Date(), 'yyyy-MM-dd');

/**
 * Красивая дата для отображения: "15 января, среда"
 */
export const formatDate = (iso: string) =>
    format(new Date(iso), 'd MMMM, EEEE', { locale: ru });

/**
 * Короткая дата: "15.01.2025"
 */
export const shortDate = (iso: string) =>
    format(new Date(iso), 'dd.MM.yyyy');

/**
 * Сколько дней подряд есть записи.
 * Стрик считается "живым", если последняя запись — сегодня или вчера.
 */
export function calculateStreak(dates: string[]): number {
    if (dates.length === 0) return 0;

    const unique = [...new Set(dates)].sort().reverse();
    const today = todayKey();
    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');

    // Если крайняя запись — не сегодня и не вчера, стрик сгорел
    if (unique[0] !== today && unique[0] !== yesterday) return 0;

    let streak = 1;
    for (let i = 1; i < unique.length; i++) {
        const diff = differenceInCalendarDays(
            new Date(unique[i - 1]),
            new Date(unique[i])
        );
        if (diff === 1) streak++;
        else break;
    }
    return streak;
}