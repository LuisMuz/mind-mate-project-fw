'use client';

import { useState, useEffect } from 'react';
import { IdentificationIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const iconMap = {
    psychologist: IdentificationIcon,
    client: UserCircleIcon
};

async function fetchCount(endpoint: string) {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.count;
}

export default function CardWrapper() {
    const [psychologistCount, setPsychologistCount] = useState<number | null>(null);
    const [clientCount, setClientCount] = useState<number | null>(null);

    useEffect(() => {
        async function fetchCounts() {
            const psychologistCount = await fetchCount('http://localhost:3030/users/psychologists/count');
            setPsychologistCount(psychologistCount);

            const clientCount = await fetchCount('http://localhost:3030/users/clients/count');
            setClientCount(clientCount);
        }

        fetchCounts();
    }, []);

    return (
        <>
            <Card title="Psychologists" value={psychologistCount !== null ? psychologistCount : 'Loading...'} type="psychologist" />
            <Card title="Clients" value={clientCount !== null ? clientCount : 'Loading...'} type="client" />
        </>
    );
}

function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: 'psychologist' | 'client';
}) {
    const Icon = iconMap[type];

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p
                className={`truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
            >
                {value}
            </p>
        </div>
    );
}
