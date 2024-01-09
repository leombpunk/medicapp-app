import { createContext, useContext, useEffect, useState } from 'react'
import { TIMEZONES } from '../constants/time'
import AsyncStorage from '@react-native-async-storage/async-storage'

const settingsContext = createContext()

const SettingsProvider = ({ children }) => {
    const getCurrentTheme = async () => {
        return await AsyncStorage.getItem('theme') || 'light'
    }

    const getCurrentTimeZone = async () => {
        return TIMEZONES[await AsyncStorage.getItem('timeZone') || 0]
    }

    const getCurrentScheduleFormat = async () => {
        return await AsyncStorage.getItem('scheduleFormat24') || false
    }

    const [theme, setTheme] = useState()
    const [timeZone, setTimeZone] = useState()
    const [format24, setFormat24] = useState()

    const toggleTheme = async () => {
        const isThemeDark = theme === 'dark'
        setTheme(isThemeDark ? 'light' : 'dark')
        await AsyncStorage.setItem('theme', isThemeDark ? 'light' : 'dark')
    }

    const toggleFormat = async () => {
        const value = !format24
        setFormat24(value)
        await AsyncStorage.setItem('scheduleFormat24', value)
    }

    useEffect(() => {
        const start = async () => {
            const currentTheme = await getCurrentTheme()
            const currentTimeZone = await getCurrentTimeZone()
            const currentFormat = await getCurrentScheduleFormat()

            setTheme(currentTheme)
            setTimeZone(currentTimeZone)
            setFormat24(currentFormat)
        }

        start()
    }, [])

    return (
        <settingsContext.Provider value={{ theme, toggleTheme, timeZone, format24, toggleFormat }}>
            {children}
        </settingsContext.Provider>
    )
}

const useSettingsContext = () => {
    return useContext(settingsContext)
}

export { SettingsProvider, useSettingsContext }