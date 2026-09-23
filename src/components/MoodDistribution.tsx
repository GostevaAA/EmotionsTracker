import type { MoodEntry } from '../types/mood';
import { buildDistribution } from '../utils/chartData';
import { getMoodMeta } from '../utils/stats';

type Props = {
    entries: MoodEntry[];
};

export function MoodDistribution({ entries }: Props) {
    if (entries.length === 0) return null;

    const items = buildDistribution(entries);
    const max = Math.max(...items.map((i) => i.count), 1);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold dark:text-white mb-4">
                Распределение
            </h2>

            <div className="space-y-2">
                {[...items].reverse().map((item) => {
                    const { icon: Icon, color } = getMoodMeta(item.mood);
                    const width = (item.count / max) * 100;

                    return (
                        <div key={item.mood} className="flex items-center gap-3">
                            <Icon
                                className="w-5 h-5 shrink-0"
                                style={{ color }}
                                strokeWidth={2.2}
                            />

                            <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                                <div
                                    className="h-full transition-all duration-500"
                                    style={{
                                        width: `${width}%`,
                                        backgroundColor: color + '55',
                                    }}
                                />
                            </div>

                            <span className="w-6 text-right text-sm text-gray-500 dark:text-gray-400">
                                {item.count}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}