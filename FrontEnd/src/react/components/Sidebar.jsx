import SidebarContent from './SidebarContent'

/**
 * Sidebar fija para pantallas >= lg (992px).
 * En pantallas menores lo reemplaza SidebarMobile (Offcanvas).
 */
const Sidebar = () => {
    return (
        <>
            <aside
                className='sidebar-desktop bg-body-tertiary d-none d-lg-flex flex-column align-items-center px-3 py-4 border-end'
                style={{ width: 'var(--sidebar-width)' }}
            >
                <SidebarContent/>
            </aside>
        </>
    )
}

export default Sidebar
