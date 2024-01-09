import { View, Modal, Pressable } from 'react-native'
import { styles } from '../styles'
import { UserIcon } from 'react-native-heroicons/solid'
import { useUserContext } from '../providers/UserProvider'
import ItemList from './ItemList'
import Button from './Button'
import { PowerIcon } from 'react-native-heroicons/outline'

const Menu = ({ show, handleClose }) => {
  const { user, handleLogOut } = useUserContext()

  return (
    <Modal animationType='fade' transparent={true} visible={show}>
      <View style={{ flexDirection: 'row', flexGrow: 1 }}>
        <View style={[styles.mainBgContrastColor, { width: 300, padding: 16, gap: 16 }]}>

          <ItemList
            //handleOnPress={() => navigate(Routes.Patient, { data: patient })}
            Icon={UserIcon}
            text={user.surnames ? `${user.surnames} ${user.names}` : `${user.names}`}
          />

          <View>
            <Button
              style={{ padding: 8, borderRadius: 4 }}
              stylePressed={styles.buttonPressed}
              Icon={PowerIcon}
              iconSize={24}
              text='Cerrar Sesion'
              contentStyle={styles.h4}
              contentStylePressed={styles.buttonTextPressed}
              handleOnPress={handleLogOut}
            />
          </View>
        </View>
        <Pressable onPress={handleClose} style={{ backgroundColor: '#00000080', flexGrow: 1 }}/>
      </View>      
    </Modal>
  )
}

export default Menu