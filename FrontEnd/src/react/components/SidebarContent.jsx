import { AdjustmentsHorizontalIcon, HomeIcon, UserGroupIcon, UserIcon, UsersIcon } from '@heroicons/react/24/solid'
import { RoutesNavigation } from '../constants/RoutesNavigation'
import { useUserContext } from './providers/UserProvider'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSidebarContext } from './providers/SidebarProvider'

const SidebarButton = ({children, title, route, onNavigate}) => {
    const location = useLocation()
    const active = location.pathname === route
    //const middleActive = `/${location.pathname.split('/')[1]}` === route

    return (
        <Link to={route} onClick={onNavigate}>
            <div 
                className={`d-flex align-items-center gap-2 py-2 px-2 rounded-3 ${active ? 'text-bg-primary' : ''}`}
            >
                {children}
                <div>{title}</div>
            </div>
        </Link>
    )
}

const SidebarMiddleButton = ({ isEnabled, title, route, onNavigate }) => {
    const location = useLocation()
    const active = location.pathname === route

    return (
        <Link to={route} className={isEnabled && active ? '' : 'd-none' } onClick={onNavigate}>
            <div className='d-flex align-items-center gap-2 py-2 px-2 rounded-3 text-bg-primary' style={{ overflow: 'hidden' }}>
                <div className='text-truncate'>{title}</div>
            </div>
        </Link>
    )
}

const menuIcon = { width: '1.5rem', height: '1.5rem' }

/**
 * Contenido del sidebar (perfil de usuario + navegación).
 * Se reutiliza en el sidebar fijo de escritorio y en el Offcanvas de pantallas < lg.
 * @param {function} onNavigate opcional: se ejecuta al navegar (usado para cerrar el Offcanvas)
 */
const SidebarContent = ({ onNavigate }) => {
    const { user } = useUserContext()
    const { patient, schedule } = useSidebarContext()
    const navigate = useNavigate()

    return (
        <div className='d-flex flex-column gap-2 w-100'>
            
            <div
                className='d-flex align-items-center gap-2 cursor-pointer overflow-hidden'
                onClick={() => {
                    onNavigate?.()
                    navigate(`${RoutesNavigation.Configurations}?tab=profile`)
                }}
            >
                <div
                    className='border border-secondary border-1 rounded-2 d-flex justify-content-center align-items-center'
                    style={{ minWidth: '3rem', minHeight: '3rem' }}
                >
                    <UserIcon style={{ width: '2rem', height: '2rem' }}/>
                </div>
                <div className='d-flex flex-column'>
                    <div className='text-truncate'>{user?.surnames} {user?.names}</div>
                    <small className='text-uppercase'>{user?.role.description}</small>
                </div>
            </div>
            
            <SidebarButton title='Inicio' route={RoutesNavigation.Home} onNavigate={onNavigate}>
                <HomeIcon style={menuIcon}/>
            </SidebarButton>
           
            <SidebarButton title='Pacientes' route={RoutesNavigation.Patients} onNavigate={onNavigate}>
                <UserGroupIcon style={menuIcon}/>
            </SidebarButton>

            <SidebarMiddleButton
                isEnabled={patient}
                title={`${patient?.surnames} ${patient?.names}`}
                route={`${RoutesNavigation.Patients}/${patient?.id}`}
                onNavigate={onNavigate}
            />
            {/*
            <SidebarButton title='Tratamientos' route={RoutesNavigation.Treatments}>
                <ClipboardDocumentListIcon style={menuIcon}/>
            </SidebarButton>
            
            <SidebarButton title='Agendas' route={RoutesNavigation.Schedules}>
                <CalendarDaysIcon style={menuIcon}/>
            </SidebarButton>
            */}
            <SidebarButton title='Profesionales' route={RoutesNavigation.Profesionals} onNavigate={onNavigate}>
                <UsersIcon style={menuIcon}/>
            </SidebarButton>

            <SidebarMiddleButton
                isEnabled={schedule}
                title={`${schedule?.surnames} ${schedule?.names}`}
                route={`${RoutesNavigation.Schedules}/${schedule?.id}`}
                onNavigate={onNavigate}
            />

            {/* <SidebarButton title='Usuarios' route={RoutesNavigation.Users}>
                <UsersIcon style={menuIcon}/>
            </SidebarButton> */}
            
            <SidebarButton title='Configuración' route={RoutesNavigation.Configurations} onNavigate={onNavigate}>
                <AdjustmentsHorizontalIcon style={menuIcon}/>
            </SidebarButton>

        </div>
    )
}

export default SidebarContent
