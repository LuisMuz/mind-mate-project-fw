import { DailyNote } from '@/app/lib/definitions';

interface NoteCardSimpleProps {
    note: DailyNote;
}

const NoteCardSimple: React.FC<NoteCardSimpleProps> = ({ note }) => {
    return (
        <div className="bg-white rounded-lg shadow-xl m-2 p-4">
            <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
                Date: {new Date(note.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-4">{note.content}</p>
        </div>
    );
};

export default NoteCardSimple;
