import { ActivityIndicator, View, Text } from 'react-native'
import { styles } from '../styles'

const Loading = () => {
    return (
        <View style={[styles.justifyCenter, styles.alignItemsCenter]}>
            <View style={styles.alignItemsCenter}>
                <ActivityIndicator size='large'/>
                <Text style={styles.h4}>Cargando...</Text>
            </View>
        </View>
    )
}

export default Loading