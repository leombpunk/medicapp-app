import { View, SafeAreaView, Text, ScrollView } from 'react-native'
import { Container, Loading, Navbar } from '../components'
import { styles } from '../styles'
import { usePatientTurns } from '../hooks'
import { getStringTimeInTimeZone } from '../constants/timeFunctions'
import { BuenosAires, MONTH_ES } from '../constants/time'
import { COLORS } from '../constants/eventColors'

const TurnItem = ({ data }) => {
    const date = new Date(data.dateTime)
    return (
        <View key={data.id} style={[styles.border, styles.flexRow, styles.overflowHidden, { borderRadius: 8 }]}>
            <View style={[styles.borderEnd, styles.alignItemsCenter, { backgroundColor: `${COLORS[data.id % COLORS.length]}99`,padding: 8 }]}>
                <Text style={styles.h3}>{date.getUTCDate()}</Text>
                <Text style={[styles.h4, styles.textUppercase]}>{MONTH_ES[date.getUTCMonth()].slice(0,3)}</Text>
                <Text style={styles.h4}>{date.getUTCFullYear()}</Text>
            </View>
            <View style={{ padding: 8 }}>
                <Text style={styles.mainColor}>{`${getStringTimeInTimeZone(date, BuenosAires)} hs`}</Text>

                <Text style={styles.mainColor}>{`${data.profesional.surnames} ${data.profesional.names}`}</Text>
                {
                    data?.treatment &&
                    <Text style={styles.mainColor}>{data.treatment.description}</Text>
                }
                {
                    data?.description &&
                    <Text style={styles.mainColor}>{data.description}</Text>
                }
            </View>
        </View>
    )
}
const PatientTurns = ({ route }) => {
    const { data } = route.params
    const idPatient = data?.id
    const { isLoading, turns } = usePatientTurns(idPatient)

    return (
        <Container>
            <Navbar title={`${data.surnames} ${data.names}`}/>
            <SafeAreaView style={styles.content}>
                <ScrollView>
                    <View style={{ padding: 16, gap: 16 }}>
                        {
                            isLoading
                            ? <>
                                <Loading/>
                            </>
                            : <>
                                {
                                    turns.length
                                    ? <>
                                    {
                                        turns.map(turn =>
                                            <TurnItem key={turn.id} data={turn}/>
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
                </ScrollView>
            </SafeAreaView>
        </Container>
    )
}

export default PatientTurns
