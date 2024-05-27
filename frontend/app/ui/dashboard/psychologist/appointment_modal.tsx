import React, { useState } from 'react';

export default function AppointmentModal({
  isOpen,
  onClose,
  userId,
  onAppointmentConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  onAppointmentConfirm: (date: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleConfirmAppointment = () => {
    onAppointmentConfirm(selectedDate);
    setSelectedDate('');
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Select Appointment Date</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDatePickerChange}
              className="border border-gray-300 rounded p-2 mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleConfirmAppointment}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Confirm
              </button>
              <button
                onClick={onClose}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
