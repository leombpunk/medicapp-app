import { View, SafeAreaView, FlatList, Text } from 'react-native'
import { Container, Navbar } from '../components'
import { styles } from '../styles'
import { usePatient } from '../hooks'
import Photo from '../components/Photo'

const PatientPhotos = ({ route }) => {
  const { data } = route.params
  const { isLoading, patient, photos } = usePatient(data.id)

  return (
    <Container>
        {
          isLoading
          ? <>
            <Navbar title='Paciente'/>
          </>
          : patient
          ? <>
            <Navbar title={`${patient.surnames.split(' ')[0]} ${patient.names.split(' ')[0]}`}/>
            {
                photos.length
                ? <>
                    <View style={[styles.content, { backgroundColor: 'black', flexGrow: 1 }]}>
                        <SafeAreaView>
                            <FlatList
                                data={photos}
                                numColumns={2}
                                renderItem={({ item }) => <Photo data={item}/>}
                                keyExtractor={(item) => item.id}
                            />
                        </SafeAreaView>
                    </View>
                </>
                : <>
                    <View style={[styles.content, { backgroundColor: 'black', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={styles.mainColor}>No se han encontrado resultados.</Text>
                    </View>
                </>
            }
          </>
          : <>
          </>
        }
    </Container>
  )
}

export default PatientPhotos