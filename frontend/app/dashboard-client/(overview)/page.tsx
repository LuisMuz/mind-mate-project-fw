'use client'

import { DailyNote } from '@/app/lib/definitions';
import NoteCardSimple from '@/app/ui/dashboard/user/note-card';
import { useRouter } from 'next/navigation';


const Home: React.FC = () => {
    const router = useRouter();

    // Temporary list of daily notes
    const dummyNotes: DailyNote[] = [
        {
            id: '1',
            client_id: 'client1',
            title: 'First Note',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.',
            date: new Date(),
            viewed: true,
            notes_psycho: '',
        },
        {
            id: '2',
            client_id: 'client2',
            title: 'Second Note',
            content: 'Pellentesque commodo eros a enim. Duis lobortis massa imperdiet quam. Phasellus blandit leo ut odio. Maecenas ullamcorper.',
            date: new Date(),
            viewed: false,
            notes_psycho: '',
        },
        {
            id: '13',
            client_id: '', // No client for diary entries
            title: 'Saturday, April 13th',
            content: 'Woke up feeling refreshed after a good nights sleep. Enjoyed a cup of coffee on the balcony and watched the sunrise. Feeling motivated to tackle some personal projects today.',
            date: new Date(),
            viewed: true,
            notes_psycho: '',
        },
        {
            id: '14',
            client_id: '', // No client for diary entries
            title: 'Friday, April 12th',
            content: 'Had dinner with friends and laughed until our sides hurt. It was a much-needed break from the week and a great way to recharge.',
            date: new Date(),
            viewed: false,
            notes_psycho: '',
        },
        {
            id: '15',
            client_id: '', // No client for diary entries
            title: 'Thursday, April 11th',
            content: 'Struggled to stay focused at work today. Took a short walk outside to clear my head and came back feeling more productive.',
            date: new Date(),
            viewed: true,
            notes_psycho: '',
        },
        {
            id: '16',
            client_id: '', // No client for diary entries
            title: 'Wednesday, April 10th',
            content: 'Started reading a new book that Ive been excited about. Already hooked on the story and cant wait to see where it goes.',
            date: new Date(),
            viewed: false,
            notes_psycho: '',
        },
        {
            id: '17',
            client_id: '', // No client for diary entries
            title: 'Tuesday, April 9th',
            content: 'Feeling grateful for a beautiful spring day. Went for a run in the park and enjoyed the fresh air and sunshine.',
            date: new Date(),
            viewed: true,
            notes_psycho: '',
        },
        {
            id: '17',
            client_id: '', // No client for diary entries
            title: 'Tuesday, April 9th',
            content: 'Feeling grateful for a beautiful spring day. Went for a run in the park and enjoyed the fresh air and sunshine.',
            date: new Date(),
            viewed: true,
            notes_psycho: '',
        },
        
    ];

    const handleNewNoteClick = () => {
        //router.push('/new-note');
        console.log("New note");
    };

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
            <div className="w-full h-[600px] overflow-auto">
                {dummyNotes.map(note => (
                    <NoteCardSimple note={note}/>
                ))}
            </div>
        </div>
    );
};

export default Home;
