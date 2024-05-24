'use client'
import { DailyNote } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';

export default function NoteCard({ notes }: { notes: DailyNote[] }) {
  const router = useRouter();

  const handleNoteClick = (noteId: string) => {
    console.log(`Viewing note with ID: ${noteId}`);
    //router.push(`/notes/${noteId}`);
  };

  return (
    <button type="button" onClick={() => router.push('/dashboard-psychologist/activity')}>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-center">
        {notes.map((note) => (
          <div key={note.id} className="bg-white rounded-lg shadow-md p-4" onClick={() => handleNoteClick(note.id)}>
            <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              Date: {new Date(note.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-4">{note.content.substring(0, 50)}...</p>
            <p className="text-gray-600">
              Client ID: {note.client_id}
            </p>
          </div>
        ))}
      </div>
    </button>
  );
}
