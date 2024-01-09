import { Link, useLocation } from "react-router-dom";

const SidebarButton = ({route, icon, text, }) => {
    const location = useLocation()

    return (
        <Link className={`sidebar-option ${location.pathname === route ? "current" : null}`} to={route}>
            <div className="d-flex align-items-center gap-1">
                {icon}
                {text}
            </div>
        </Link>
    )
}

export default SidebarButton