import { View, Text } from 'react-native'
import { styles } from '../styles'

const FIELD_STYLE = { gap: 0 }

const UserData = ({ data }) => {
    return (
        <View style={{ gap: 8, marginHorizontal: 0 }}>
            <View style={{ gap: 16 }}>
                
                <View style={FIELD_STYLE}>
                    <Text style={[styles.textSecondary]}>Nombre</Text>
                    <Text style={[styles.h4, styles.mainColor]}>{`${data.surnames} ${data.names}`}</Text>
                </View>

                <View style={FIELD_STYLE}>
                    <Text style={[styles.textSecondary]}>Usuario</Text>
                    <Text style={[styles.h4, styles.mainColor]}>{data.username}</Text>
                </View>

                <View style={FIELD_STYLE}>
                    <Text style={[styles.textSecondary]}>Correo</Text>
                    <Text style={[styles.h4, styles.mainColor]}>{data.mail}</Text>
                </View>
                
                <View style={FIELD_STYLE}>
                    <Text style={[styles.textSecondary]}>Rol</Text>
                    <Text style={[styles.h4, styles.mainColor]}>{data.role.description}</Text>
                </View>

                <View style={FIELD_STYLE}>
                    <Text style={[styles.textSecondary]}>Cargo</Text>
                    <Text style={[styles.h4, styles.mainColor]}>{data.charge.description}</Text>
                </View>

                <View style={FIELD_STYLE}>
                    <Text style={[styles.textSecondary]}>Teléfono</Text>
                    <Text style={[styles.h4, styles.mainColor]}>{data.phone}</Text>
                </View>

            </View>
        </View>
    )
}

export default UserData
