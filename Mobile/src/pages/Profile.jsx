import { View, SafeAreaView, ScrollView } from 'react-native'
import { Container, ItemList, Navbar, UserData } from '../components'
import { useUserContext } from '../providers/UserProvider'
import { styles } from '../styles'
import { PowerIcon } from 'react-native-heroicons/outline'

const Profile = () => {
    const { user, handleLogOut } = useUserContext()
    return (
        <Container>
            <Navbar title='Perfil'/>

            <SafeAreaView style={styles.content}>
                <ScrollView>
                    <View style={{ padding: 16, gap: 16 }}>

                        <UserData data={user}/>

                        <ItemList
                            handleOnPress={handleLogOut}
                            Icon={PowerIcon}
                            text='Cerrar Sesión'
                        />

                    </View>
                </ScrollView>
            </SafeAreaView>

        </Container>
    )
}

export default Profile