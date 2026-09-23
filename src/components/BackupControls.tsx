import { Download, Upload } from 'lucide-react';
import { useRef } from 'react';
import type { MoodEntry } from '../types/mood';
import { downloadBackup, readBackup } from '../utils/backup';

type Props = {
    entries: MoodEntry[];
    onImport: (entries: MoodEntry[]) => void;
};

export function BackupControls({ entries, onImport }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExport = () => {
        downloadBackup(entries);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const imported = await readBackup(file);

            const message =
                `Импортировать ${imported.length} записей?\n\n` +
                `Текущие записи (${entries.length}) будут заменены.`;

            if (!confirm(message)) {
                // сбросим input, чтобы можно было выбрать тот же файл снова
                e.target.value = '';
                return;
            }

            onImport(imported);
            alert(`Импортировано ${imported.length} записей.`);
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Неизвестная ошибка';
            alert(`Не удалось импортировать: ${msg}`);
        } finally {
            // всегда сбрасываем input
            e.target.value = '';
        }
    };

    return (
        <div className="flex gap-2 justify-center">
            <button
                onClick={handleExport}
                disabled={entries.length === 0}
                className="flex items-center gap-2 px-3 py-2 rounded-xl
          bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-200
          shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition
          disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <Download className="w-4 h-4" />
                Экспорт
            </button>

            <button
                onClick={handleImportClick}
                className="flex items-center gap-2 px-3 py-2 rounded-xl
          bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-200
          shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
                <Upload className="w-4 h-4" />
                Импорт
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
}