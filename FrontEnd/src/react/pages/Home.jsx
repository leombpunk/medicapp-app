import { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useUserContext } from '../components/providers/UserProvider'
import Reminders from '../components/home/Reminders'
import Turns from '../components/home/Turns'

const Home = () => {
    const { user } = useUserContext()

    const [key, setKey] = useState('reminders')

    return (
        <>
            <div className="flex-grow-1 d-flex justify-content-start align-items-center flex-column gap-4 bg-medicapp">
                <h3>¡Bienvenido/a, {user.names}! </h3>
                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className='w-100'
                    justify
                >
                    <Tab title="Recordatorios" eventKey={'reminders'}>
                        <Reminders/>
                    </Tab>
                    <Tab title="Turnos" eventKey={'turns'}>
                        <Turns/>
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default Home
