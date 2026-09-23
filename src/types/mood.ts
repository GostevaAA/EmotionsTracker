export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export type MoodEntry = {
    id: string;
    date: string;       // "2025-01-15"
    mood: MoodLevel;
    note?: string;
    createdAt: string;  // полный ISO
};

export type NewMoodEntry = {
    date: string;
    mood: MoodLevel;
    note?: string;
};