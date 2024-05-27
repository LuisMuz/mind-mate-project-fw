'use client';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useAppContext } from '@/app/lib/UserContext';

interface Appointment {
  title: string;
  date: string;
}


const CalendarView: React.FC = () => {
  const { userId } = useAppContext();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:3030/appointments/client/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        const formattedAppointments = data.map((appointment: any) => ({
          title: 'Cita',
          date:  new Date(appointment.time).toISOString().split('T')[0],
        }));
        setAppointments(formattedAppointments);
        console.log(formattedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } 
    };

    if (userId) {
      fetchAppointments();
    }
  }, [userId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 pb-2">
        Calendar
      </h1>
      <div className="p-12 h-auto">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height="500px"
          events={appointments}
        />
      </div>
    </div>
  );
};

export default CalendarView;
