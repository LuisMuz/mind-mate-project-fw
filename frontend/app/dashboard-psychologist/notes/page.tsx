'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from '@/app/lib/UserContext';
import NoteCard from "@/app/ui/dashboard/psychologist/note_card";

export default function Page() {
  const { clientQuery } = useAppContext();
  const router = useRouter();
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    // Aquí puedes obtener el nombre del cliente utilizando el clientQuery
    const fetchClientName = async () => {
      try {
        const response = await fetch(`http://localhost:3030/users/${clientQuery}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setClientName(userData.name);
      } catch (err) {
        console.error("Error fetching client name:", err);
      }
    };

    if (clientQuery) {
      fetchClientName();
    }
  }, [clientQuery]);

  const handleGoBack = () => {
    router.push('/dashboard-psychologist');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 pb-2">
          {clientName}
        </h1>
        <button onClick={handleGoBack} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Go Back
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <NoteCard clientId={clientQuery} />
      </div>
    </div>
  );
}
