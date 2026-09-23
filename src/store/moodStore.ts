import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MoodEntry, NewMoodEntry } from '../types/mood';

type MoodState = {
    entries: MoodEntry[];
    save: (entry: NewMoodEntry) => void;
    remove: (id: string) => void;
};

export const useMoodStore = create<MoodState>()(
    persist(
        (set, get) => ({
            entries: [],

            save: (entry) => {
                const existing = get().entries.find((e) => e.date === entry.date);

                if (existing) {
                    // Обновляем существующую запись
                    set((state) => ({
                        entries: state.entries.map((e) =>
                            e.id === existing.id ? { ...e, ...entry } : e
                        ),
                    }));
                } else {
                    // Создаём новую
                    set((state) => ({
                        entries: [
                            ...state.entries,
                            {
                                ...entry,
                                id: crypto.randomUUID(),
                                createdAt: new Date().toISOString(),
                            },
                        ],
                    }));
                }
            },

            remove: (id) =>
                set((state) => ({
                    entries: state.entries.filter((e) => e.id !== id),
                })),
        }),
        { name: 'mood-tracker' }
    )
);