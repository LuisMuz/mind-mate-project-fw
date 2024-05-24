'use client'
import SideNav from '@/app/ui/dashboard/sidenav';
// import { useAppContext } from '../lib/UserContext';

export default function Layout({
    children
}: {
    children : React.ReactNode}) {
    // const { userId } = useAppContext();
    const userId = "admin1";

    return(
        <div className = {`flex h-screen flex-col w-screen md:flex-row md:overflow-hidden`}>
            <div className = "w-full flex-none md:w-64">
                <SideNav userType='admin' userId={userId}/>
            </div>
            <div className="p-8 w-full "> 
                {children}
            </div>
        </div>
    );
}