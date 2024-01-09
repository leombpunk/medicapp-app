import { View } from 'react-native'
import { styles } from '../styles'

const Container = ({ children }) => {
  return (
    <View style={[styles.container, styles.mainBgColor]}>
      {children}
    </View>
  )
}

export default Container