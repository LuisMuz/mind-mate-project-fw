// CalendarView.tsx

'use client'

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarView: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 pb-2">
            Diary
        </h1>

        <div className="p-12 h-auto">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                contentHeight="auto"
                events={[
                    { title: 'Cita 1', date: '2024-04-01' },
                    { title: 'Cita 2', date: '2024-04-08' },
                    { title: 'Cita 3', date: '2024-04-15' },
                ]}
            />
      </div>
    </div>
  );
};

export default CalendarView;
