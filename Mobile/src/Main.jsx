import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Home, Init, Patient, PatientNotes, PatientPhoto, PatientPhotos, PatientTurns, Patients, ProfesionalSchedule, Profesionals, Profile } from './pages'
import { useUserContext } from './providers/UserProvider'
import { Routes } from './constants/Routes'

const Stack = createNativeStackNavigator()

const Main = () => {
  const { user } = useUserContext()
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          user
          ? <>
            <Stack.Screen name={Routes.Home} component={Home}/>
            
            <Stack.Screen name={Routes.Patients} component={Patients}/>
            <Stack.Screen name={Routes.Patient} component={Patient}/>
            <Stack.Screen name={Routes.PatientPhoto} component={PatientPhoto}/>
            <Stack.Screen name={Routes.PatientPhotos} component={PatientPhotos}/>
            <Stack.Screen name={Routes.PatientNotes} component={PatientNotes}/>
            <Stack.Screen name={Routes.PatientTurns} component={PatientTurns}/>

            <Stack.Screen name={Routes.Profesionals} component={Profesionals}/>
            <Stack.Screen name={Routes.ProfesionalSchedule} component={ProfesionalSchedule}/>

            <Stack.Screen name={Routes.Profile} component={Profile}/>
          </>
          : <Stack.Screen name={Routes.Login} component={Init}/>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main