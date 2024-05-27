'use client';

import CardWrapper from '@/app/ui/dashboard/admin/cards';
import LineChart from '@/app/ui/dashboard/admin/char';
import { useEffect, useState } from 'react';
import { Metadata } from 'next';


const fetchNoteActivity = async () => {
    try {
        const response = await fetch('http://localhost:3030/notes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch note activity');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching note activity:', error);
        return [];
    }
};

export default function Page() {
    const [barChartActivity, setBarChartActivity] = useState<number[]>([]);
    const [barChartDate, setBarChartDate] = useState<string[]>([]);

    useEffect(() => {
        const loadActivityData = async () => {
            const data = await fetchNoteActivity();

            // Process data to get the last 4 days of activity
            const processedData = data.map((activity: any) => ({
                date: activity._id,
                count: activity.count,
            }));

            setBarChartDate(processedData.map((d: any) => d.date));
            setBarChartActivity(processedData.map((d: any) => d.count));
        };

        loadActivityData();
    }, []);

    return (
        <main>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 pb-2">
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <CardWrapper />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8 h-96">
                <LineChart data={barChartActivity} labels={barChartDate} />
            </div>
        </main>
    );
}
