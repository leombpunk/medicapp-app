import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useDate } from '../hooks'
import { getStringDateInTimeZone, getYear, isCurrentDate } from '../constants/timeFunctions'
import { DAY_ES, MONTH_ES, UTC } from '../constants/time'
import { styles } from '../styles'
import { useState } from 'react'

const Calendar = () => {
    const { date } = useDate()
    const [months, setMonths] = useState(getYear(date.getFullYear()))

    return (
        <View>
            <View style={{ paddingHorizontal: 16 }}>
                <Text style={[styles.h1, styles.mainColor]}>{`Calendario ${date.getFullYear()}`}</Text>
            </View>
            <SafeAreaView style={styles.calendar}>
                <ScrollView>
                    <View style={{ paddingHorizontal: 16, gap: 8 }}>
                    {
                        months.map((month, monthIndex) => {
                            return (
                                <View key={monthIndex}>
                                    <View style={[{ borderBottomWidth: 1 }, styles.mainBorderColor]}>
                                        <Text style={[styles.h3, styles.mainColor]}>{MONTH_ES[monthIndex]}</Text>
                                    </View>
                                    <View>
                                        <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                                            {
                                                DAY_ES.map((day, dayIndex) => 
                                                    <View key={dayIndex} style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={[styles.h4, styles.mainColor, { textTransform: 'capitalize' }]}>{day.charAt(0)}</Text>
                                                    </View>
                                                )
                                            }
                                        </View>
                                        {
                                            month.map((week, weekIndex) => 
                                                <View key={weekIndex} style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                                                    {
                                                        week.map((day, index) => {
                                                            const isCurrent = isCurrentDate(day, date)
                                                            const isAnotherMonth = day.getUTCMonth() !== monthIndex
                                                            return (
                                                                <View
                                                                    key={index}
                                                                    style={[
                                                                        { width: 48, height: 48, justifyContent: 'center', alignItems: 'center', borderRadius: 48 },
                                                                        isCurrent && styles.bgPrimary
                                                                    ]}
                                                                >
                                                                    <Text style={[styles.h4, styles.mainColor, isAnotherMonth && styles.textSecondary]}>
                                                                        {day.getUTCDate()}
                                                                    </Text>
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </View>
                                            )
                                        }
                                    </View>
                                </View>
                            )
                        })
                    }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default Calendar