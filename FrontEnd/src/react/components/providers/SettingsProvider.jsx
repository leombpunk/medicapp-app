import { createContext, useContext, useState } from 'react'
import { TIMEZONES } from '../../constants/constants'

const settingsContext = createContext()

const SettingsProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('medicappTheme') || 'light')
    const [showTurns, setShowTurns] = useState(true)
    const [showExceptions, setShowExceptions] = useState(true)
    const [timeZone, setTimeZone] = useState(TIMEZONES[localStorage.getItem('medicappScheduleTimeZone') || 0])
    const [format24, setFormat24] = useState(JSON.parse(localStorage.getItem('medicappScheduleFormat24')) || false)
    const [experimentalMode, setExperimentalMode] = useState(JSON.parse(localStorage.getItem('medicappScheduleExperimental')) || false)

    document.body.setAttribute('data-bs-theme', theme)

    const isThemeDark = theme === 'dark'

    const toggleTheme = () => {
        setTheme(isThemeDark ? 'light' : 'dark')
        localStorage.setItem('medicappTheme', isThemeDark ? 'light' : 'dark')
    }

    const toggleFormat = () => {
        const value = !format24
        setFormat24(value)
        localStorage.setItem('medicappScheduleFormat24', value)
    }

    const toggleShowTurns = () => {
        setShowTurns(show => !show)
    }

    const toggleShowExceptions = () => {
        setShowExceptions(show => !show)
    }

    const toggleExperimentalMode = () => {
        const value = !experimentalMode
        setExperimentalMode(value)
        localStorage.setItem('medicappScheduleExperimental', value)
    }

    const config = {
        theme,
        toggleTheme,
        isThemeDark,
        timeZone,
        handleTimeZone: setTimeZone,
        format24,
        toggleFormat,
        showTurns,
        showExceptions,
        toggleShowTurns,
        toggleShowExceptions,
        experimentalMode,
        toggleExperimentalMode
    }

    return (
        <settingsContext.Provider value={config}>
            {children}
        </settingsContext.Provider>
    )
}

const useSettingsContext = () => {
    return useContext(settingsContext)
}

export { SettingsProvider, useSettingsContext }