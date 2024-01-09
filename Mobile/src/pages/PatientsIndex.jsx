import { View, SafeAreaView, ScrollView } from 'react-native'
import { styles } from '../styles'
import { usePatients } from '../hooks'
import { useNavigation } from '@react-navigation/native'
import { ButtonIcon, Container, Navbar, ItemList, Loading, SearchBar } from '../components'
import { UserIcon } from 'react-native-heroicons/outline'
import { Routes } from '../constants/Routes'

const Patients = () => {
    const { navigate } = useNavigation()
    const { isLoading, patients, handleSearch, handleReset } = usePatients()

    const handleSearchSubmit = (value) => {
        handleReset()
        handleSearch(value)
    }

    return (
        <Container>
            <Navbar title='Pacientes'>
                {/*<ButtonIcon
                    Icon={MagnifyingGlassIcon}
                    onPress={() => {}}
                    style={styles.button}
                    stylePressed={styles.buttonPressed}
                    iconStyle={{ ...styles.buttonText, size: 24 }}
                    iconStylePressed={styles.buttonTextPressed}
                />*/}
            </Navbar>

            <SafeAreaView style={styles.content}>
                <ScrollView>
                    <SearchBar handleSearch={handleSearchSubmit}/>

                    <View style={{ padding: 16, gap: 16 }}>
                        {
                            patients.map((patient) => (
                                <ItemList
                                    key={patient.id}
                                    handleOnPress={() => navigate(Routes.Patient, { data: patient })}
                                    Icon={UserIcon}
                                    text={`${patient.surnames} ${patient.names}`}
                                />
                            ))
                        }
                    </View>
                    {
                        isLoading &&
                        <Loading/>
                    }
                </ScrollView>
            </SafeAreaView>
        </Container>
    )
}

export default Patients
