import { View, SafeAreaView, Text } from 'react-native'
import { Container, Loading, Navbar } from '../components'
import { styles } from '../styles'
import { usePatientNotes } from '../hooks'
import { getStringDateTimeInLanguageTimeZone } from '../constants/timeFunctions'
import { BuenosAires } from '../constants/time'

const NoteItem = ({ data }) => {
    const date = new Date(data.updatedAt)
    return (
        <View style={[styles.border, styles.overflowHidden, { borderRadius: 8 }]}>
            <View style={[styles.borderBottom, styles.mainBgContrastColor, { padding: 8 }]}>
                <Text style={styles.mainColor}>{getStringDateTimeInLanguageTimeZone(date, 'es-AR', BuenosAires)}</Text>
            </View>
            <View style={{ padding: 8 }}>
                <Text style={styles.mainColor}>{data.content}</Text>
            </View>
        </View>
    )
}
const PatientNotes = ({ route }) => {
    const { data } = route.params
    const idPatient = data?.id
    const { isLoading, notes } = usePatientNotes(idPatient)

    return (
        <Container>
            <Navbar title={`${data.surnames} ${data.names}`}/>
            <View style={{ padding: 16, gap: 16 }}>
                {
                    isLoading
                    ? <>
                        <Loading/>
                    </>
                    : <>
                        {
                            notes.length
                            ? <>
                            {
                                notes.map(note =>
                                    <NoteItem key={note.id} data={note}/>
                                )
                            }    
                            </>
                            : <>
                                <View style={[styles.justifyCenter, styles.alignItemsCenter, { flexGrow: 1 }]}>
                                    <Text style={styles.mainColor}>No se han encontrado resultados</Text>
                                </View>
                            </>
                        }
                    </>
                }

            </View>
        </Container>
    )
}

export default PatientNotes
