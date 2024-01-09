import { View, Text } from 'react-native'
import { Container, ItemList, Navbar, PatientData } from '../components'
import { styles } from '../styles'
import { usePatient } from '../hooks'
import { CalendarDaysIcon, PencilSquareIcon, PhotoIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { Routes } from '../constants/Routes'

const Patient = ({ route }) => {
  const { navigate } = useNavigation()
  const { data } = route.params
  const { isLoading, patient } = usePatient(data.id)

  return (
    <Container>
        {
          isLoading
          ? <>
            <Navbar title='Paciente'/>
          </>
          : patient
          ? <>
            <Navbar title={`${patient.surnames} ${patient.names}`}/>
            <View style={[styles.content, { paddingHorizontal: 16, paddingVertical: 8, gap: 16 }]}>
              <PatientData data={patient}/>
              
              <ItemList
                handleOnPress={() => navigate(Routes.PatientNotes, { data: patient })}
                Icon={PencilSquareIcon}
                text='Notas de Historia Clínica'
              />

              <ItemList
                handleOnPress={() => navigate(Routes.PatientTurns, { data: patient })}
                Icon={CalendarDaysIcon}
                text='Turnos'
              />
              
              <ItemList
                handleOnPress={() => navigate(Routes.PatientPhotos, { data: patient })}
                Icon={PhotoIcon}
                text='Fotografías'
              />

            </View>
          </>
          : <>
          </>
        }
    </Container>
  )
}

export default Patient