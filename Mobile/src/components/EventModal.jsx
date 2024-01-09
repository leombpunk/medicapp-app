import { Modal, Text, View } from 'react-native'
import { getStringDateInLanguageTimeZone, getStringTimeInTimeZone } from '../constants/timeFunctions'
import { styles } from '../styles'
import { COLORS } from '../constants/eventColors'
import { CheckIcon } from 'react-native-heroicons/solid'
import { TURN_STATUS } from '../constants/turnstatus'
import { useSettingsContext } from '../providers/SettingsProvider'
import Button from './Button'

const EventModal = ({ show, handleClose, data }) => {
    const { timeZone } = useSettingsContext()
    const startDate =  getStringDateInLanguageTimeZone(new Date(data?.startTime), 'es-AR',timeZone)
    const endDate =  getStringDateInLanguageTimeZone(new Date(data?.endTime), 'es-AR',timeZone)
    const startTime = getStringTimeInTimeZone(new Date(data?.startTime), timeZone)
    const endTime = getStringTimeInTimeZone(new Date(data?.endTime), timeZone)
    const isTurn = data?.type === 'turn'
    const isException = data?.type === 'exception'
    const isReminder = data?.type === 'reminder'

    return (
        <Modal animationType='fade' transparent={true} visible={show} onRequestClose={handleClose}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#000', opacity: 0.5 }}/>
            <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.border, { backgroundColor: COLORS[data?.id % COLORS.length],width: 350, height: 200, padding: 16, gap: 16, borderRadius: 16 }]}>
                    {/*
                    <View style={[ styles.flexRow, styles.justifyEnd ]}>
                        <ButtonIcon
                            Icon={XMarkIcon}
                            style={[styles.button, { borderRadius: 32 }]}
                            stylePressed={styles.buttonPressed}
                            iconStyle={{ ...styles.buttonText, size: 24 }}
                            iconStylePressed={styles.buttonTextPressed}
                        />
                    </View>
                    */}

                    <View style={{ flexGrow: 1 }}>
                        {
                            isReminder &&
                            <>
                                <Text style={[styles.textLight]}>{`${startDate} ${startTime} hs`}</Text>
                            </>
                        }
                        {
                            isTurn &&
                            <>
                                <Text style={[styles.textLight]}>{`${startDate} ${startTime} hs - ${endTime} hs`}</Text>
                            </>
                        }
                        {
                            isException &&
                            <>
                                <Text style={[styles.textLight]}>{`${startDate} ${startTime} hs`}</Text>
                                <Text style={[styles.textLight]}>{`${endDate} ${endTime} hs`}</Text>
                            </>
                        }
                        {
                            data?.patient &&
                            <Text style={[styles.h3, styles.textLight]}>{`${data.patient.surnames} ${data.patient.names}`}</Text>
                        }
                        {
                            data?.treatment &&
                            <Text style={[styles.h4, styles.textLight]}>{data.treatment.description}</Text>
                        }
                        {
                            data?.description &&
                            <Text style={[styles.h4, styles.textLight]}>{data.description}</Text>
                        }
                    </View>

                    {
                        data?.status === TURN_STATUS.Confirmed &&
                        <View style={[ styles.flexRow, styles.justifyEnd ]}>
                            <Button
                                Icon={CheckIcon}
                                text='Atendido'
                                iconSize={24}
                                style={[styles.buttonPressed, styles.border, { borderRadius: 8, padding: 8 }]}
                                contentStyle={styles.buttonTextPressed}
                            />
                        </View>
                    }              
                </View>
            </View>     
        </Modal>
    )
}

export default EventModal