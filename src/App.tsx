import { useState } from 'react';
import { BackupControls } from './components/BackupControls';
import { CalendarView } from './components/CalendarView';
import { MoodChart } from './components/MoodChart';
import { MoodDistribution } from './components/MoodDistribution';
import { MoodForm } from './components/MoodForm';
import { MoodList } from './components/MoodList';
import { StatsCard } from './components/StatsCard';
import { useMoodStore } from './store/moodStore';
import type { MoodEntry } from './types/mood';

function App() {
  const entries = useMoodStore((s) => s.entries);
  const save = useMoodStore((s) => s.save);
  const remove = useMoodStore((s) => s.remove);
  const importEntries = useMoodStore((s) => s.importEntries);

  const [editing, setEditing] = useState<MoodEntry | null>(null);
  const [presetDate, setPresetDate] = useState<string | undefined>(undefined);

  const handleEdit = (entry: MoodEntry) => {
    setEditing(entry);
    setPresetDate(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDate = (dateKey: string) => {
    const existing = entries.find((e) => e.date === dateKey);

    if (existing) {
      setEditing(existing);
      setPresetDate(undefined);
    } else {
      setEditing(null);
      setPresetDate(dateKey);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setPresetDate(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8 px-4">
      <div className="max-w-xl mx-auto space-y-5">
        <header className="text-center space-y-3">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">
              🎭 EmotionsTracker
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Отслеживай, как меняется твоё состояние
            </p>
          </div>

          <BackupControls entries={entries} onImport={importEntries} />
        </header>

        <StatsCard entries={entries} />

        <MoodForm
          onSave={save}
          editing={editing}
          onCancelEdit={handleCancelEdit}
          presetDate={presetDate}
        />

        <CalendarView
          entries={entries}
          onSelectDate={handleSelectDate}
        />

        <MoodChart entries={entries} />

        <MoodDistribution entries={entries} />

        <MoodList
          entries={entries}
          onDelete={remove}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default App;