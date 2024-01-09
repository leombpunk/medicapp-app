import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RoutesNavigation } from './constants/RoutesNavigation'
import { UserProvider } from './components/providers/UserProvider'
import ProtectedUserRoute from './components/ProtectedUserRoute'
import { NotificationsProvider } from './components/providers/NotificationsProvider'
import AppContainer from './components/AppContainer'
import { 
    Configurations,
    ScheduleSetting,
    Home,
    Login,
    NotFound,
    Patient,
    PatientsIndex,
    Register,
    Schedule,
    SchedulesIndex,
    UserPage,
    TreatmentsIndex,
    Profesional,
    ProfesionalStats,
    Turns,
} from './pages'
import { SettingsProvider } from './components/providers/SettingsProvider'
import { ScheduleProvider } from './components/providers/ScheduleProvider'

const App = () => {
    return (
        <SettingsProvider>
            <UserProvider>
                <NotificationsProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path={RoutesNavigation.Login} element={<Login/>}/>
                            <Route path={RoutesNavigation.Register} element={<Register/>}/>
                            <Route element={<AppContainer/>}>
                                <Route element={<ProtectedUserRoute/>}>
                                    <Route path={RoutesNavigation.Home} element={<Home/>}/>

                                    <Route path={RoutesNavigation.Patients} element={<PatientsIndex/>}/>
                                    <Route path={RoutesNavigation.Patient} element={<Patient/>}/>
                                    <Route path={RoutesNavigation.Turns} element={<Turns/>}/>

                                    <Route path={RoutesNavigation.Treatments} element={<TreatmentsIndex/>}/>

                                    {/*
                                    <Route element={<ProtectedUserRoleRoute route={RoutesNavigation.Schedules}/>}>
                                        <Route path={RoutesNavigation.Schedules} element={<SchedulesIndex/>}/>
                                        <Route path={RoutesNavigation.Schedule} element={<ScheduleProvider><Schedule/></ScheduleProvider>}/>
                                    </Route>
                                    */}

                                    <Route path={RoutesNavigation.Profesionals} element={<SchedulesIndex/>}/>
                                    <Route path={RoutesNavigation.Profesional} element={<Profesional/>}/>
                                    <Route path={RoutesNavigation.ProfesionalStats} element={<ProfesionalStats/>}/>
                                    <Route path={`${RoutesNavigation.Profesional}/schedule`} element={<ScheduleProvider><Schedule/></ScheduleProvider>}/>

                                    <Route path={RoutesNavigation.User} element={<UserPage/>}/>

                                    <Route path={RoutesNavigation.Configurations} element={<Configurations/>}/>
                                    <Route path={RoutesNavigation.Configuration} element={<Configurations/>}/>

                                    <Route path={RoutesNavigation.ScheduleSetting} element={<ScheduleSetting/>}/>
                                    <Route path={"*"} element={<NotFound/>}/>
                                </Route>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </NotificationsProvider>
            </UserProvider>
        </SettingsProvider>
    )
}

export default App
