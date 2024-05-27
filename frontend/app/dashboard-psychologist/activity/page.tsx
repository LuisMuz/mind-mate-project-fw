import { DailyNote } from "@/app/lib/definitions";
import NoteCard from "@/app/ui/dashboard/psychologist/note_card";

export default function Page() {
  // const dummyNotes: DailyNote[] = [
  //     {
  //       id: '1',
  //       client_id: 'client1',
  //       title: 'First Note',
  //       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.',
  //       date: new Date(),
  //       viewed: true,
  //       notes_psycho: '',
  //     },
  //     {
  //       id: '2',
  //       client_id: 'client2',
  //       title: 'Second Note',
  //       content: 'Pellentesque commodo eros a enim. Duis lobortis massa imperdiet quam. Phasellus blandit leo ut odio. Maecenas ullamcorper.',
  //       date: new Date(),
  //       viewed: false,
  //       notes_psycho: '',
  //     },
  //     {
  //       id: '3',
  //       client_id: 'client3',
  //       title: 'Third Note',
  //       content: 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
  //       date: new Date(),
  //       viewed: true,
  //       notes_psycho: '',
  //     },
  //     {
  //       id: '4',
  //       client_id: 'client4',
  //       title: 'Fourth Note',
  //       content: 'Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
  //       date: new Date(),
  //       viewed: false,
  //       notes_psycho: '',
  //     },
  //     {
  //       id: '5',
  //       client_id: 'client5',
  //       title: 'Fifth Note',
  //       content: 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.',
  //       date: new Date(),
  //       viewed: true,
  //       notes_psycho: '',
  //     },
  //     {
  //       id: '6',
  //       client_id: 'client6',
  //       title: 'Sixth Note',
  //       content: 'Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
  //       date: new Date(),
  //       viewed: false,
  //       notes_psycho: '',
  //     },
  //   ];




  return (
    <div>
      <h1 className="mb-4 text-2xl md:text-4xl font-bold text-gray-800 pb-2">
        Recient Activity
      </h1>
      <div className="flex flex-col items-center justify-center">
        <NoteCard />
      </div>
    </div>
  );
}