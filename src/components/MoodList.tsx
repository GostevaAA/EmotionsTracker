import { Sprout } from 'lucide-react';
import type { MoodEntry } from '../types/mood';
import { MoodCard } from './MoodCard';

type Props = {
    entries: MoodEntry[];
    onDelete: (id: string) => void;
    onEdit: (entry: MoodEntry) => void;
};

export function MoodList({ entries, onDelete, onEdit }: Props) {
    if (entries.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400">
                <Sprout className="w-12 h-12 mx-auto mb-3" strokeWidth={1.5} />
                <p>Пока нет записей. Начни с первой!</p>
            </div>
        );
    }

    const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div className="space-y-3">
            {sorted.map((entry) => (
                <MoodCard
                    key={entry.id}
                    entry={entry}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}