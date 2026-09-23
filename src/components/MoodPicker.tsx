import type { MoodLevel } from '../types/mood';
import { MOODS } from '../utils/stats';

const LEVELS: MoodLevel[] = [5, 4, 3, 2, 1];

type Props = {
    value: MoodLevel;
    onChange: (mood: MoodLevel) => void;
};

export function MoodPicker({ value, onChange }: Props) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between gap-2">
                {LEVELS.map((level) => {
                    const { icon: Icon, color, label } = MOODS[level];
                    const isActive = value === level;

                    return (
                        <button
                            key={level}
                            type="button"
                            onClick={() => onChange(level)}
                            aria-label={label}
                            aria-pressed={isActive}
                            className={`flex-1 aspect-square rounded-2xl flex items-center justify-center
                transition-all duration-200
                ${isActive
                                    ? 'scale-110 shadow-lg ring-2'
                                    : 'bg-gray-100 dark:bg-gray-800 hover:scale-105 opacity-60'
                                }`}
                            style={
                                isActive
                                    ? ({
                                        backgroundColor: color + '22',
                                        color,
                                        '--tw-ring-color': color,
                                    } as React.CSSProperties)
                                    : { color }
                            }
                        >
                            <Icon
                                className={`w-8 h-8 sm:w-10 sm:h-10 transition-transform ${isActive ? 'scale-110' : ''
                                    }`}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                        </button>
                    );
                })}
            </div>

            <p
                className="text-center text-sm font-medium transition-colors"
                style={{ color: MOODS[value].color }}
            >
                {MOODS[value].label}
            </p>
        </div>
    );
}