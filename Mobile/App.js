import { StatusBar } from 'expo-status-bar'
import { UserProvider } from './src/providers/UserProvider'
import Main from './src/Main'
import { SettingsProvider } from './src/providers/SettingsProvider'

const App = () => {
  return (
    <UserProvider>
      <SettingsProvider>
        <StatusBar/>
        <Main/>
      </SettingsProvider>
    </UserProvider>
  )
}

export default App