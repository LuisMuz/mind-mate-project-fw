'use client';
import { useAppContext } from '@/app/lib/UserContext';
import { DailyNote, User } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function NoteCard({ clientId }: { clientId?: string }) {
  const { userId } = useAppContext();
  const router = useRouter();
  const [notes, setNotes] = useState<(DailyNote & { clientName: string })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<(DailyNote & { clientName: string }) | null>(null);
  const [editContent, setEditContent] = useState<string>('');

  const fetchNotes = async () => {
    try {
      const response = await fetch(`http://localhost:3030/notes/psycho/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      
      const notesWithClientNames = await Promise.all(data.map(async (note: DailyNote) => {
        const userResponse = await fetch(`http://localhost:3030/users/${note.client_id}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData: User = await userResponse.json();
        return { ...note, clientName: userData.name };
      }));
      console.log(notesWithClientNames);
      setNotes(notesWithClientNames);
    } catch (err) {
      setError("Error getting clients cards");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserNotes = async () => {
    try {
      const response = await fetch(`http://localhost:3030/notes/${clientId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      
      const notesWithClientNames = await Promise.all(data.map(async (note: DailyNote) => {
        const userResponse = await fetch(`http://localhost:3030/users/${note.client_id}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData: User = await userResponse.json();
        return { ...note, clientName: userData.name };
      }));
      console.log(notesWithClientNames);
      setNotes(notesWithClientNames);
    } catch (err) {
      setError("Error getting clients cards");
    } finally {
      setLoading(false);
    }
  }

  const handleButtonURL = () => {
    if(!clientId){
      return "/dashboard-psychologist/activity";
    }
    return "/dashboard-psychologist/notes";
  }

  useEffect(() => {
    if (clientId) {
      fetchUserNotes();
    } else {
      fetchNotes();
    }
  }, [userId, clientId]);

  const handleNoteClick = (note: DailyNote & { clientName: string }) => {
    setSelectedNote(note);
    setEditContent(note.notes_psycho || '');
  };

  const handleSave = async () => {
    if (selectedNote) {
      try {
        const response = await fetch(`http://localhost:3030/notes/${selectedNote._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notes_psycho: editContent }),
        });

        if (!response.ok) {
          throw new Error('Failed to update note');
        }
        setSelectedNote(null);
        fetchNotes();
        // const updatedNote = await response.json();
        // setNotes((prevNotes) =>
        //   prevNotes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
        // );
      } catch (err) {
        setError('Error saving the note');
      }
    }
  };

  const handleCancel = () => {
    setSelectedNote(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      {selectedNote ? (
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">{selectedNote.title}</h2>
          <p className="text-sm text-gray-500 mb-2">
            Date: {new Date(selectedNote.date).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-4">{selectedNote.content}</p>
          <p className="text-gray-600 text-xs font-medium">
            {selectedNote.clientName}
          </p>
          <textarea
            className="w-full p-2 mt-4 border border-gray-300 rounded"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Add your notes here..."
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => router.push(handleButtonURL())}>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-center">
            {notes.map((note) => (
              <div key={note._id} className="bg-white rounded-lg shadow-md p-4" onClick={() => handleNoteClick(note)}>
                <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  Date: {new Date(note.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-4">{note.content.substring(0, 50)}...</p>
                <p className="text-gray-600 text-xs font-medium">
                  {note.clientName}
                </p>
              </div>
            ))}
          </div>
        </button>
      )}
    </div>
  );
}

export default NoteCard;
