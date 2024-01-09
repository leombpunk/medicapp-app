import { Pressable, Text, View } from 'react-native'
import { styles } from '../styles'

const Button = ({ style, stylePressed, contentStyle, contentStylePressed, text, Icon, iconSize, handleOnPress, isDisabled }) => {
  const handleStylePressed = ({ pressed }) => {
    const styleButton = [
      style,
      pressed && stylePressed
    ]
    return styleButton
  }

  const handleIconStylePressed = ({ pressed }) => {
    const styleText = [
      contentStyle,
      pressed && contentStylePressed
    ]
    return styleText
  }

  return (
    <Pressable onPress={handleOnPress} disabled={isDisabled} style={handleStylePressed}>
      {({ pressed }) => {
        return (
          <View style={[styles.flexRow, styles.alignItemsCenter, { gap: 8 }]}>
            {
              Icon &&
              <Icon size={iconSize ?? 16} style={handleIconStylePressed({ pressed })}/>
            }
            {
              text &&
              <Text style={handleIconStylePressed({ pressed })}>{text}</Text>
            }
          </View>
        )
      }}
    </Pressable>
  )
}

export default Button