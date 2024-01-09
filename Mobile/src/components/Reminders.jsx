import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { styles } from '../styles'
import { COLORS } from '../constants/eventColors'
import { CalendarDaysIcon } from 'react-native-heroicons/outline'
import { getStringTimeInTimeZone } from '../constants/timeFunctions'
import { useSettingsContext } from '../providers/SettingsProvider'

const Reminder = ({ data, handleOnPress }) => {
    const { timeZone } = useSettingsContext()
    const backgroundColor = COLORS[data.id % COLORS.length]
    const startTime = getStringTimeInTimeZone(new Date(data.dateTime), timeZone)

    return (
        <Pressable onPress={handleOnPress} style={[styles.border, styles.flexRow, { backgroundColor, borderRadius: 12, minHeight: 64 }]}>
            <View style={{ alignItems: 'center', justifyContent: 'center',  paddingLeft: 4, paddingRight: 4, borderEndColor: 'white', borderEndWidth: 1 }}>
                <CalendarDaysIcon style={styles.textLight} size={24}/>
            </View>
            <View style={[{ paddingHorizontal: 8, paddingVertical: 4 }]}>
                <Text style={styles.textLight}>{`${startTime} hs`}</Text>
                {
                    data?.patient &&
                    <Text style={styles.textLight}>{`${data.patient.surnames} ${data.patient.names}`}</Text>          
                }
                {
                    data?.description &&
                    <Text style={styles.textLight}>{data.description}</Text>
                }
            </View>
        </Pressable>
    )
}

const Reminders = ({ events, handleEventModal }) => {
    return (
        <SafeAreaView style={[styles.border, { flexGrow: 1, height: '100%', borderRadius: 16, overflow: 'hidden' }]}>
            <ScrollView>
                <View style={{ padding: 16, gap: 16 }}>
                    {
                        events.reminders.map(reminder =>
                            <Reminder key={reminder.id} data={reminder} handleOnPress={() => handleEventModal(reminder)}/>
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Reminders