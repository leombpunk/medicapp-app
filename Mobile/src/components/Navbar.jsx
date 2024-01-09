import { View, Text } from 'react-native'
import { NAVBAR_HEIGHT, styles } from '../styles'
import { Bars3Icon } from 'react-native-heroicons/solid'
import { useMenu } from '../hooks'
import Menu from './Menu'
import ButtonIcon from './ButtonIcon'

const Navbar = ({ title, children, before }) => {
    const { showMenu, handleOpenMenu, handleCloseMenu } = useMenu()
    return (
        <>
            <View style={[styles.navbar, styles.flexRow, styles.alignItemsCenter, styles.justifyBetween, { height: NAVBAR_HEIGHT }]}>
                <View style={[styles.flexRow, styles.alignItemsCenter, { paddingStart: 16 }]}>
                    {/*
                    <View style={{ paddingStart: 16 }}>
                        <ButtonIcon
                            Icon={Bars3Icon}
                            handleOnPress={handleOpenMenu}
                            style={styles.button}
                            stylePressed={styles.buttonPressed}
                            iconStyle={{ ...styles.buttonText, size: 24 }}
                            iconStylePressed={styles.buttonTextPressed}
                        />
                    </View>
                    */}
                    {before}
                </View>

                <View style={[styles.alignItemsCenter, styles.justifyCenter, styles.positionAbsolute, { zIndex: -1 }]}>
                    <Text style={[styles.mainColor, styles.h2]}>{title}</Text>
                </View>

                <View style={[styles.flexRow, styles.alignItemsCenter, { paddingEnd: 16 }]}>
                    {children}
                </View>
            </View>
            <Menu show={showMenu} handleClose={handleCloseMenu} />
        </>
    )
}

export default Navbar
