'use client'
import SideNav from '@/app/ui/dashboard/sidenav';
// import { useAppContext } from '../lib/UserContext';

export default function Layout({
    children
}: {
    children : React.ReactNode}) {
    // const { userId } = useAppContext();
    const userId = "psychologist1";
        
    return(
        <div className = {`flex h-screen flex-col md:flex-row md:overflow-hidden`}>
            <div className = "w-full flex-none md:w-64">
                <SideNav userType='psychologist' userId={userId}/>
            </div>
            <div className = "w-full p-8 overflow-auto">
                {children}
            </div>
        </div> 
    );
}