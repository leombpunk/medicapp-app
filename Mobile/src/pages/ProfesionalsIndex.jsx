import { View, SafeAreaView, ScrollView } from 'react-native'
import { styles } from '../styles'
import { useProfesionals } from '../hooks'
import { useNavigation } from '@react-navigation/native'
import { Container, Navbar, ItemList, SearchBar, Loading } from '../components'
import { Routes } from '../constants/Routes'
import { UserIcon } from 'react-native-heroicons/outline'

const Profesionals = () => {
    const { navigate } = useNavigation()
    const { isLoading, profesionals, handleSearch, handleReset } = useProfesionals()

    const handleSearchSubmit = (value) => {
        handleReset()
        handleSearch(value)
    }
    
    return (
        <Container>
            <Navbar title='Profesionales'/>

            <SearchBar handleSearch={handleSearchSubmit}/>

            <View>
                <SafeAreaView style={styles.content}>
                    <ScrollView>
                        <View style={{ padding: 16, gap: 16 }}>
                            {profesionals.map((profesional) => (
                                <ItemList
                                    key={profesional.id}
                                    handleOnPress={() => navigate(Routes.ProfesionalSchedule, { data: profesional })}
                                    Icon={UserIcon}
                                    text={`${profesional.surnames} ${profesional.names}`}
                                />
                            ))}
                        </View>
                            {
                            isLoading &&
                            <Loading/>
                        }
                    </ScrollView>
                </SafeAreaView>
            </View>
        </Container>
    )
}

export default Profesionals
