import { View, SafeAreaView, ScrollView } from 'react-native'
import { styles } from '../styles'
import { Container, Navbar, ItemList } from '../components'
import { useNavigation } from '@react-navigation/native'
import { AdjustmentsHorizontalIcon, UserGroupIcon, UsersIcon } from 'react-native-heroicons/solid'
import { Routes } from '../constants/Routes'

const Home = () => {
    const { navigate } = useNavigation()

    return (
        <Container>
            <Navbar title='Inicio' />
            <SafeAreaView style={styles.content}>
                <ScrollView>
                    <View style={{ padding: 16, gap: 16 }}>

                        <ItemList
                            handleOnPress={() => navigate(Routes.Patients)}
                            Icon={UserGroupIcon}
                            text='Pacientes'
                        />
                        
                        <ItemList
                            handleOnPress={() => navigate(Routes.Profesionals)}
                            Icon={UsersIcon}
                            text='Profesionales'
                        />

                        <ItemList
                            handleOnPress={() => navigate(Routes.Profile)}
                            Icon={AdjustmentsHorizontalIcon}
                            text='Perfil'
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Container>
    )
}

export default Home
