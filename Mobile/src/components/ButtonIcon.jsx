import { Pressable } from 'react-native'
import { buttons } from '../styles'

const ButtonIcon = ({ Icon, style, stylePressed, iconStyle, iconStylePressed, handleOnPress, isDisabled, isActived }) => {
  const handleStylePressed = ({ pressed }) => {
    const styleButton = [
      style,
      (pressed || isActived) && stylePressed
    ]
    return styleButton
  }

  const handleIconStylePressed = ({ pressed }) => {
    const styleIcon = [
      iconStyle,
      (pressed || isActived) && iconStylePressed
    ]
    return styleIcon
  }

  return (
    <Pressable onPress={handleOnPress} disabled={isDisabled} style={handleStylePressed}>
      {({ pressed }) => (<Icon size={iconStyle?.size ?? 16} style={handleIconStylePressed({ pressed })}/>)}
    </Pressable>
  )
}

export default ButtonIcon