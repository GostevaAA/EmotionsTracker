import { useEffect, useState } from 'react';
import type { MoodEntry, MoodLevel, NewMoodEntry } from '../types/mood';
import { todayKey } from '../utils/date';
import { MoodPicker } from './MoodPicker';

type Props = {
    onSave: (entry: NewMoodEntry) => void;
    editing?: MoodEntry | null;
    onCancelEdit?: () => void;
    presetDate?: string;              // ← новое
};

export function MoodForm({ onSave, editing, onCancelEdit, presetDate }: Props) {
    const [mood, setMood] = useState<MoodLevel>(3);
    const [note, setNote] = useState('');
    const [date, setDate] = useState(presetDate ?? todayKey());

    // Синхронизация: если пришла внешняя дата — обновляем
    useEffect(() => {
        if (presetDate) setDate(presetDate);
    }, [presetDate]);

    useEffect(() => {
        if (editing) {
            setMood(editing.mood);
            setNote(editing.note ?? '');
            setDate(editing.date);
        }
    }, [editing]);

    const reset = () => {
        setMood(3);
        setNote('');
        setDate(todayKey());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            date,
            mood,
            note: note.trim() || undefined,
        });
        reset();
        onCancelEdit?.();
    };

    const handleCancel = () => {
        reset();
        onCancelEdit?.();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm space-y-4"
        >
            <h2 className="text-lg font-semibold dark:text-white">
                {editing ? 'Редактировать запись' : 'Как ты себя чувствуешь?'}
            </h2>

            <MoodPicker value={mood} onChange={setMood} />

            <input
                type="date"
                value={date}
                max={todayKey()}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border dark:bg-gray-800
          dark:border-gray-700 dark:text-white"
            />

            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Как прошёл день? (необязательно)"
                rows={3}
                maxLength={500}
                className="w-full px-3 py-2 rounded-lg border resize-none
          dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-indigo-500 text-white
            font-medium hover:bg-indigo-600 transition"
                >
                    {editing ? 'Обновить' : 'Сохранить'}
                </button>
                {editing && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800
              dark:text-white hover:bg-gray-200 transition"
                    >
                        Отмена
                    </button>
                )}
            </div>
        </form>
    );
}