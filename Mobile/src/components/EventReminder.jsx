import { Text, View } from 'react-native'
import { COLORS } from '../constants/eventColors'
import { styles } from '../styles'
import { getStringTimeInTimeZone } from '../constants/timeFunctions'
import { CalendarDaysIcon } from 'react-native-heroicons/solid'
import { useSettingsContext } from '../providers/SettingsProvider'

const EventReminder = ({ data }) => {
  const { timeZone } = useSettingsContext()
  const backgroundColor = COLORS[data.id % COLORS.length]
  const startTime = getStringTimeInTimeZone(new Date(data.startTime), timeZone)

  return (
    <View>
      <View style={{ flexGrow: 1, backgroundColor, borderRadius: 12, flexDirection: 'row' }}>
        
        <View style={{ alignItems: 'center', justifyContent: 'center',  paddingHorizontal: 4, borderEndColor: 'white', borderEndWidth: 1 }}>
          <CalendarDaysIcon style={styles.textLight} size={24}/>
        </View>
        
        <View style={{ flexWrap: 'wrap', paddingHorizontal: 8, paddingVertical: 4, flexGrow: 1, overflow: 'scroll', gap: 4 }}>
          <Text style={styles.textLight}>{`${startTime} hs`}</Text>
          { data?.patient &&
            <Text style={styles.textLight}>{`${data.patient.surnames} ${data.patient.names}`}</Text>          
          }
          <Text style={styles.textLight}>{data?.description}</Text>
        </View>

      </View>
    </View>
  )
}

export default EventReminder