import { Pressable, Text, View } from 'react-native'
import { COLORS } from '../constants/eventColors'
import { styles } from '../styles'
import { getStringTimeInTimeZone } from '../constants/timeFunctions'
import { UserIcon, LockClosedIcon } from 'react-native-heroicons/solid'
import { CheckCircleIcon } from 'react-native-heroicons/outline'
import { useSettingsContext } from '../providers/SettingsProvider'
import { TURN_STATUS } from '../constants/turnstatus'

const Event = ({ data, height, positionY, handleOnPress }) => {
  const { timeZone } = useSettingsContext()
  const backgroundColor = COLORS[data.id % COLORS.length]
  const isConfirm = data.status === TURN_STATUS.Confirmed
  const isException = data.type === 'exception'
  const startTime = getStringTimeInTimeZone(new Date(data.startTime), timeZone)
  const endTime = getStringTimeInTimeZone(new Date(data.endTime), timeZone)

  return (
    <View style={{ position: 'absolute', width: '100%', height: `${height}%`, top: `${positionY}%`, padding: 6 }}>
      <Pressable onPress={handleOnPress} style={{ flexGrow: 1, backgroundColor, borderRadius: 12, flexDirection: 'row' }}>
        
        <View style={{ alignItems: 'center', justifyContent: 'center',  paddingLeft: 4, paddingRight: 4, borderEndColor: 'white', borderEndWidth: 1 }}>
          {
            isException
            ? <LockClosedIcon style={styles.textLight} size={24}/>
            : <UserIcon style={styles.textLight} size={24}/>
          }
        </View>
        
        <View style={{ flexWrap: 'wrap', paddingLeft: 8, paddingTop: 4, flexGrow: 1, overflow: 'hidden' }}>
          <Text style={styles.textLight}>{`${startTime} hs - ${endTime} hs`}</Text>
          { data?.patient &&
            <Text style={styles.textLight}>{`${data.patient.surnames} ${data.patient.names}`}</Text>          
          }
          {
            isException && data?.description &&
            <Text style={styles.textLight}>{data.description}</Text>
          }
        </View>

        {
          isConfirm &&
          <View style={{ alignItems: 'center', justifyContent: 'center',  paddingLeft: 4, paddingRight: 4, borderStartColor: 'white', borderStartWidth: 1 }}>
            <CheckCircleIcon style={styles.textLight} size={24}/>
          </View>
        }
        
      </Pressable>
    </View>
  )
}

export default Event