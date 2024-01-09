import { getEventHeight, getEventPositionY, getRowTimes, getStringTimeInTimeZone } from '../constants/timeFunctions'
import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import { ROWTIME_HEIGHT, styles } from '../styles.js'
import { useSettingsContext } from '../providers/SettingsProvider'
import Event from './Event.jsx'
import Loading from './Loading.jsx'

const Row = ({ dateTime }) => {
    const { timeZone } = useSettingsContext()

    return (
        <View style={[{ height: ROWTIME_HEIGHT, borderBottomWidth: 1, borderStyle: dateTime.getUTCMinutes() === 0 ? 'dashed' : 'solid'}, styles.w100, styles.mainBorderColor]}>
            <View style={{ marginTop: 8, marginLeft: 16 }}>
                <Text style={styles.mainColor}>{getStringTimeInTimeZone(dateTime, timeZone)}</Text>
            </View>
        </View>
    )
}

const ScheduleDate = ({ startDate, endDate, isLoading, events, handleEventModal }) => {
    const rowsTimes = getRowTimes(startDate, endDate)
    const rowHeight = 100 / rowsTimes.length

    return (
        <SafeAreaView style={[styles.border, { flexGrow: 1, height: '100%', borderRadius: 16, overflow: 'hidden' }]}>
            {
                isLoading
                ? <>
                    <View style={[styles.justifyCenter, styles.alignItemsCenter, { flexGrow: 1 }]}>
                        <Loading/>
                    </View>
                </>
                : <>
                <ScrollView style={styles.positionRelative}>
                    {
                        rowsTimes.map((timeRow, index) => <Row key={index} dateTime={timeRow}/>)
                    }
                    <View style={styles.positionAbsolute}>
                        {
                            events.normal.map((event, index) => {
                                const eventStartTime = new Date(event.startTime)
                                const eventEndTime = new Date(event.endTime)
                                const height = rowHeight * 2 * getEventHeight(startDate, endDate, eventStartTime, eventEndTime)
                                const positionY = rowHeight * 2 * getEventPositionY(startDate, eventStartTime)
                                return <Event key={index} data={event} height={height} positionY={positionY} handleOnPress={() => handleEventModal(event)}/>
                            })
                        }
                    </View>
                    
                </ScrollView>
                </>
            }
        </SafeAreaView>
    )
}

export default ScheduleDate