import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({
    children
}: {
    children : React.ReactNode}) {
    return(
        <div className = {`flex h-screen flex-col w-screen md:flex-row md:overflow-hidden`}>
            <div className = "w-full flex-none md:w-64">
                <SideNav userType='admin'/>
            </div>
            <div className="p-8 w-full"> 
                {children}
            </div>
        </div>
    );
}