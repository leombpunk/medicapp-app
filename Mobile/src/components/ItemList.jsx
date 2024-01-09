import { Pressable, Text } from 'react-native'
import { styles } from '../styles'

const mainStyle = [styles.button, styles.flexRow, styles.alignItemsCenter, { padding: 16, gap: 16 }]
const pressedStyle = [styles.buttonPressed]
const textStyle = styles.buttonText
const textPressedStyle = styles.buttonTextPressed

const ItemList = ({ handleOnPress, Icon, text }) => {
    const handleStylePressed = ({ pressed }) => {
        const style = [
          mainStyle,
          pressed && pressedStyle
        ]
        return style
    }

    const handleTextStylePressed = ({ pressed }) => {
        const styleText = [
          textStyle,
          pressed && textPressedStyle
        ]
        return styleText
    }

    return (
        <Pressable 
            style={handleStylePressed}
            onPress={handleOnPress}
        >
            {({ pressed }) => (
            <>
                <Icon size={24} style={handleTextStylePressed({ pressed })}/>
                <Text style={[styles.h4, handleTextStylePressed({ pressed })]}>{text}</Text>
            </>
            )}

        </Pressable>
    )
}

export default ItemList