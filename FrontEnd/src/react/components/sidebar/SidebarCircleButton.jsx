import { Link, useLocation } from 'react-router-dom'

const SidebarCircleButton = ({route, children}) => {
    const location = useLocation()
    const active = `/${location.pathname.split("/")[1]}` === route

    return (
        <Link to={route}>
            <div className={`circle-button sidebar-button ${active ? "current" : null}`}>
                <div className="sidebar-button-icon">
                    {children}
                </div>
            </div>
        </Link>
    )
}

export default SidebarCircleButton