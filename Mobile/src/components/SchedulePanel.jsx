import { View, Text } from 'react-native'
import { DATEBAR_HEIGHT, styles } from '../styles'
import { getStringDateInLanguageTimeZone } from '../constants/timeFunctions'
import { ButtonIcon } from '../components'
import { UTC } from '../constants/time'
import { ArrowLeftIcon, ArrowRightIcon } from 'react-native-heroicons/outline'

const SchedulePanel = ({ currentDate, handlePrevDate, handleNextDate }) => {
    return (
        <View style={[{ paddingHorizontal: 8, height: DATEBAR_HEIGHT, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }]}>
            <Text style={[styles.h3]}>{getStringDateInLanguageTimeZone(currentDate, 'es-ES', UTC)}</Text>
            <View style={{ flexDirection: 'row', gap: 16 }}>
                <ButtonIcon
                    Icon={ArrowLeftIcon}
                    style={[styles.border, styles.allCenter, { width: 48, height: 48, borderRadius: 48 }]}
                    stylePressed={styles.buttonPressed}
                    iconStyle={{...styles.buttonText, size: 24 }}
                    iconStylePressed={styles.buttonTextPressed}
                    handleOnPress={handlePrevDate}
                />

                <ButtonIcon
                    Icon={ArrowRightIcon}
                    style={[styles.border, styles.allCenter, { width: 48, height: 48, borderRadius: 48 }]}
                    stylePressed={styles.buttonPressed}
                    iconStyle={{...styles.buttonText, size: 24 }}
                    iconStylePressed={styles.buttonTextPressed}
                    handleOnPress={handleNextDate}
                />
            </View>
        </View>
    )
}

export default SchedulePanel