import type { MoodEntry } from '../types/mood';

export type Backup = {
    version: 1;
    exportedAt: string;
    entries: MoodEntry[];
};

/**
 * Формирует объект бэкапа со всеми записями.
 */
export function createBackup(entries: MoodEntry[]): Backup {
    return {
        version: 1,
        exportedAt: new Date().toISOString(),
        entries,
    };
}

/**
 * Скачивает JSON-файл с бэкапом.
 */
export function downloadBackup(entries: MoodEntry[]) {
    const backup = createBackup(entries);
    const json = JSON.stringify(backup, null, 2);

    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const date = new Date().toISOString().slice(0, 10);
    const filename = `emotions-tracker-backup-${date}.json`;

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Освобождаем память
    URL.revokeObjectURL(url);
}

/**
 * Читает файл и парсит бэкап.
 * Бросает ошибку, если формат неправильный.
 */
export async function readBackup(file: File): Promise<MoodEntry[]> {
    const text = await file.text();

    let parsed: unknown;
    try {
        parsed = JSON.parse(text);
    } catch {
        throw new Error('Файл не является валидным JSON');
    }

    const entries = extractEntries(parsed);
    const validated = entries.map(validateEntry);

    return validated;
}

/**
 * Достаёт массив записей из разных форматов бэкапа.
 * Поддерживаем:
 *  - новый формат: { version: 1, entries: [...] }
 *  - "сырой" массив: [...]
 */
function extractEntries(parsed: unknown): unknown[] {
    if (Array.isArray(parsed)) {
        return parsed;
    }

    if (
        parsed &&
        typeof parsed === 'object' &&
        'entries' in parsed &&
        Array.isArray((parsed as { entries: unknown }).entries)
    ) {
        return (parsed as { entries: unknown[] }).entries;
    }

    throw new Error('Не найден массив записей');
}

/**
 * Проверяет одну запись.
 */
function validateEntry(raw: unknown): MoodEntry {
    if (!raw || typeof raw !== 'object') {
        throw new Error('Некорректная запись в файле');
    }

    const e = raw as Record<string, unknown>;

    if (typeof e.id !== 'string') throw new Error('У записи нет id');
    if (typeof e.date !== 'string') throw new Error('У записи нет даты');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date)) {
        throw new Error(`Неверный формат даты: ${e.date}`);
    }
    if (typeof e.mood !== 'number' || e.mood < 1 || e.mood > 5) {
        throw new Error('Настроение должно быть от 1 до 5');
    }

    return {
        id: e.id,
        date: e.date,
        mood: e.mood as MoodEntry['mood'],
        note: typeof e.note === 'string' ? e.note : undefined,
        createdAt:
            typeof e.createdAt === 'string'
                ? e.createdAt
                : new Date().toISOString(),
    };
}