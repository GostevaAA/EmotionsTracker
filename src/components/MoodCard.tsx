import { Pencil, X } from 'lucide-react';
import type { MoodEntry } from '../types/mood';
import { formatDate } from '../utils/date';
import { getMoodMeta } from '../utils/stats';

type Props = {
    entry: MoodEntry;
    onDelete: (id: string) => void;
    onEdit: (entry: MoodEntry) => void;
};

export function MoodCard({ entry, onDelete, onEdit }: Props) {
    const { icon: Icon, color, bg } = getMoodMeta(entry.mood);

    const handleDelete = () => {
        if (confirm('Удалить запись?')) onDelete(entry.id);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm flex gap-4">
            {/* Иконка настроения */}
            <div
                className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: bg }}
            >
                <Icon className="w-8 h-8" style={{ color }} strokeWidth={2.2} />
            </div>

            {/* Контент */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {formatDate(entry.date)}
                    </span>

                    <div className="flex gap-1">
                        <button
                            onClick={() => onEdit(entry)}
                            className="text-gray-400 hover:text-indigo-500 transition p-1"
                            aria-label="Редактировать"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-gray-400 hover:text-red-500 transition p-1"
                            aria-label="Удалить"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {entry.note && (
                    <p className="mt-1 text-gray-800 dark:text-gray-200 break-words">
                        {entry.note}
                    </p>
                )}
            </div>
        </div>
    );
}