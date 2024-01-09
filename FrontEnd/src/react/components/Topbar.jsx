import { useTopbarContext } from './providers/TopbarProvider'
import { useUserContext } from './providers/UserProvider'
import { Link } from 'react-router-dom'
import { RoutesNavigation } from '../constants/RoutesNavigation'
import { ChevronRightIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { BellIcon } from '@heroicons/react/24/solid'

const Topbar = () => {

    const title = useTopbarContext()
    const { user } = useUserContext()

    return (
        <nav className="topbar d-flex align-items-center">
            {/*
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">

                    <div className="topbar-title d-flex align-items-center gap-1">
                        {title.map((value, index) => 
                            <div key={index}>
                                <Link to={value.href}>{value.title}</Link>
                                {index < title.length - 1 && <ChevronRightIcon style={{width:"1.5rem", height: "1.5rem"}}/>}
                            </div>
                        )}
                    </div>

                    <div className="d-flex gap-3">
                        {user &&
                            <>  
                                <button className="circle-button notifications-button" onClick={() => alert("Aún no implementado.")}>
                                    <div className="circle-button-icon">
                                        <BellIcon/>
                                    </div>
                                </button>

                                <Link to={RoutesNavigation.Profile}>
                                    <div 
                                    //className='d-flex align-items-center gap-2 btn btn-outline-secondary rounded-pill'
                                    className='d-flex align-items-center gap-2'
                                    >
                                        <UserCircleIcon style={{width: '2.5rem', height: '2.5rem' }}/>
                                        <div>
                                            <div>{user.name}</div>
                                            <div className="text-uppercase" style={{fontSize: "0.75rem"}}>{user.role.description}</div>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        }
                    </div>

                </div>
            </div>
            */}
        </nav>
    )
}

export default Topbar