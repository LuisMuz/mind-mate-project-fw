'use client'
import { DailyNote } from '@/app/lib/definitions';
import NoteCardSimple from '@/app/ui/dashboard/user/note-card';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/lib/UserContext';
import { useEffect, useState } from 'react';
import Modal from '@/app/ui/dashboard/user/create-note';

const Home: React.FC = () => {
    const router = useRouter();
    const { userId } = useAppContext();
    const [notes, setNotes] = useState<DailyNote[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`http://localhost:3030/notes/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }

                const data = await response.json();
                setNotes(data);
                setLoading(false);
            } catch (error) {
                setError("An error occurred while fetching the notes");
                setLoading(false);
            }
        };

        fetchNotes();
    }, [userId]);

    const handleNewNoteClick = () => {
        setShowModal(true);
    };

    const handleSaveNote = async (title: string, content: string) => {
        try {
            const newNote: Partial<DailyNote> = {
                client_id: userId,
                title,
                content,
                date: new Date(),
                viewed: false,
                notes_psycho: '',
            };

            const response = await fetch('http://localhost:3030/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNote),
            });

            if (!response.ok) {
                throw new Error('Failed to save note');
            }

            const savedNote = await response.json();
            setNotes([...notes, savedNote]);
            setShowModal(false);
        } catch (error) {
            setError('An error occurred while saving the note');
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Sort notes by date
    const sortedNotes = notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 pb-2">
                    Diary
                </h1>
                <button
                    onClick={handleNewNoteClick}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    New +
                </button>
            </div>
            <div className="w-full overflow-auto">
                {sortedNotes.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <p className="text-xl text-gray-600">You don't have any notes yet</p>
                    </div>
                ) : (
                    sortedNotes.map((note) => (
                        <NoteCardSimple key={note._id} note={note} />
                    ))
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            )}

            <div>
                {showModal && (
                    <Modal onSave={handleSaveNote} onCancel={handleCancel} />
                )}
            </div>
        </div>
    );
};

export default Home;
