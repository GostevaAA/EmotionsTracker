import { useState } from 'react';
import { MoodForm } from './components/MoodForm';
import { MoodList } from './components/MoodList';
import { StatsCard } from './components/StatsCard';
import { useMoodStore } from './store/moodStore';
import type { MoodEntry } from './types/mood';

function App() {
  const entries = useMoodStore((s) => s.entries);
  const save = useMoodStore((s) => s.save);
  const remove = useMoodStore((s) => s.remove);

  const [editing, setEditing] = useState<MoodEntry | null>(null);

  const handleEdit = (entry: MoodEntry) => {
    setEditing(entry);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8 px-4">
      <div className="max-w-xl mx-auto space-y-5">

        <StatsCard entries={entries} />

        <MoodForm
          onSave={save}
          editing={editing}
          onCancelEdit={() => setEditing(null)}
        />

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