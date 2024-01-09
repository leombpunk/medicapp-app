import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { Title } from '../components/basis'
import { Tabs, Tab } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { useUserContext } from '../components/providers/UserProvider'
import ChargesIndex from '../components/configuration/ChargesIndex'
import UsersIndex from '../components/configuration/UsersIndex'
import ScheduleSettingIndex from '../components/configuration/ScheduleSettingIndex'
import Profile from '../components/configuration/Profile'
import Main from '../components/configuration/Main'
import { USER_ROLES } from '../constants/roles'

const Configurations = () => {
    const { user } = useUserContext()
    const [searchParams, setSearchParams] = useSearchParams()
    const activeKey = searchParams.get('tab') || 'main'

    const handleTab = (key) => {
        setSearchParams({ tab: key })
    }

    return (
        <>
            <div className='flex-grow-1 d-flex flex-column gap-4'>
                
                <Title Icon={Cog6ToothIcon} text='Configuración'/>

                <Tabs activeKey={activeKey} onSelect={handleTab} fill>

                    <Tab eventKey='main' title='General'>
                        <Main/>
                    </Tab>

                    <Tab eventKey='charges' title='Cargos'>
                        <ChargesIndex/>
                    </Tab>

                    {   
                        user.role.id === USER_ROLES.Admin &&
                        <Tab eventKey='users' title='Usuarios'>
                            <UsersIndex key={activeKey === 'users' ? 'users' : 'others'}/>
                        </Tab>
                    }
                    
                    {   
                        user.role.id === USER_ROLES.Admin &&
                        <Tab eventKey='schedule' title='Agenda'>
                            <ScheduleSettingIndex key={activeKey === 'schedule' ? 'schedule' : 'others'} />
                        </Tab>
                    }

                    <Tab eventKey='profile' title='Cuenta'>
                        <Profile/>
                    </Tab>

                </Tabs>
            </div>
        </>
    )
}

export default Configurations