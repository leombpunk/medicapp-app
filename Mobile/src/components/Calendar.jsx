import { Modal, Text, View } from 'react-native'
import { useDate } from '../hooks'
import { getWeeksInMonth, isCurrentDate } from '../constants/timeFunctions'
import { DAY_ES, MONTH_ES } from '../constants/time'
import { styles } from '../styles'
import { ArrowLeftIcon, ArrowRightIcon } from 'react-native-heroicons/outline'
import ButtonIcon from './ButtonIcon'
import Button from './Button'

const dayIconStyle = { width: 40, height: 40, borderRadius: 40 }
const Calendar = ({ show, handleClose, handleDateButton, currentDate }) => {
    const { date, goToPrevMonth, goToNextMonth } = useDate()

    return (
        <Modal animationType='fade' transparent={true} visible={show} onRequestClose={handleClose}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#000', opacity: 0.5 }}/>
            <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.mainBgColor, styles.border, { width: 350, height: 380, padding: 16, gap: 16, borderRadius: 16 }]}>
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
                    <View style={[styles.flexRow, styles.justifyBetween, styles.alignItemsCenter]}>
                        <Text style={[styles.h2]}>{`${MONTH_ES[date.getUTCMonth()]} ${date.getUTCFullYear()}`}</Text>

                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <ButtonIcon
                                Icon={ArrowLeftIcon}
                                style={[styles.border, styles.allCenter, { width: 40, height: 40, borderRadius: 48 }]}
                                stylePressed={styles.buttonPressed}
                                iconStyle={{...styles.buttonText, size: 16 }}
                                iconStylePressed={styles.buttonTextPressed}
                                handleOnPress={goToPrevMonth}
                            />

                            <ButtonIcon
                                Icon={ArrowRightIcon}
                                style={[styles.border, styles.allCenter, { width: 40, height: 40, borderRadius: 48 }]}
                                stylePressed={styles.buttonPressed}
                                iconStyle={{...styles.buttonText, size: 16 }}
                                iconStylePressed={styles.buttonTextPressed}
                                handleOnPress={goToNextMonth}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                            {
                                DAY_ES.map((day, dayIndex) => 
                                    <View key={dayIndex} style={[styles.justifyCenter, styles.alignItemsCenter, dayIconStyle]}>
                                        <Text style={[styles.h4, styles.mainColor, { textTransform: 'capitalize' }]}>{day.charAt(0)}</Text>
                                    </View>
                                )
                            }
                        </View>
                        {
                            getWeeksInMonth(date.getUTCFullYear(), date.getUTCMonth()).map((week, weekIndex) =>
                                <View key={weekIndex} style={[styles.flexRow, styles.justifyBetween]}>
                                    {
                                        week.map((day) => {
                                            //const isToday = isCurrentDate(day, new Date())
                                            const isCurrent = isCurrentDate(day, currentDate)
                                            const isAnotherMonth = day.getUTCMonth() !== date.getUTCMonth()
                                            return (
                                                <Button
                                                    key={day.getUTCDate()}
                                                    style={[styles.justifyCenter, styles.alignItemsCenter, dayIconStyle, isCurrent && styles.bgPrimary]}
                                                    stylePressed={styles.buttonPressed}
                                                    text={day.getUTCDate()}
                                                    contentStyle={[styles.mainColor, isAnotherMonth && styles.textSecondary]}
                                                    contentStylePressed={styles.buttonTextPressed}
                                                    handleOnPress={() => handleDateButton(day)}
                                                />
                                            )
                                        })
                                    }
                                </View>
                            )
                        }
                    </View>
                </View>
            </View>     
        </Modal>
    )
}

export default Calendar