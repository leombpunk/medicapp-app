import { Outlet } from 'react-router-dom'
import { SidebarProvider } from './providers/SidebarProvider'
import Sidebar from './Sidebar'

const AppContainer = () => {
    return (
        <>
            <SidebarProvider>
                <div className='d-flex'>
                    <Sidebar/>
                    <div className='w-100 vh-100' style={{ overflowY: 'auto' }}>
                        <div className='container my-4'>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </SidebarProvider>
        </>
    )
}

export default AppContainer;