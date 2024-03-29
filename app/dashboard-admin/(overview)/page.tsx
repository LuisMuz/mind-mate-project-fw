import CardWrapper from '@/app/ui/dashboard/admin/cards';
import LineChart from '@/app/ui/dashboard/admin/char';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard Admin',
};
 
export default function Page() {
    const barChartActivity = [10, 15, 4, 9]; 
    const barChartDate = ['Date1', 'Date2', 'Date3', 'Date4'];

    return (
        <main>
            <h1 className="mb-4 text-xl md:text-2xl">
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <CardWrapper/>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8 h-96">
            <LineChart data={barChartActivity} labels={barChartDate} />
            </div>
        </main>
    );
}