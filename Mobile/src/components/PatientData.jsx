import { View, Text } from 'react-native'
import { getStringDateInLanguageTimeZone } from '../constants/timeFunctions'
import { UTC } from '../constants/time'
import { styles } from '../styles'
import { UserCircleIcon } from 'react-native-heroicons/outline'

const FIELD_STYLE = { gap: 0 }

const PatientData = ({ data }) => {
  return (
    <View style={{ gap: 8, marginHorizontal: 0 }}>
      {/*
      <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
        <UserCircleIcon style={[styles.mainColor]} size={32}/>
        <Text style={[styles.h3, styles.mainColor]}>Datos del Paciente</Text>
      </View>
      */}
      <View style={{ gap: 16 }}>
        <View style={FIELD_STYLE}>
          <Text style={[styles.textSecondary]}>Nombre</Text>
          <Text style={[styles.h4, styles.mainColor]}>{`${data.surnames} ${data.names}`}</Text>
        </View>

        <View style={FIELD_STYLE}>
          <Text style={[styles.textSecondary]}>DNI</Text> 
          <Text style={[styles.h4, styles.mainColor]}>{data.dni}</Text>
        </View>

        <View style={FIELD_STYLE}>
          <Text style={[styles.textSecondary]}>Fecha de Nacimiento</Text>
          <Text style={[styles.h4, styles.mainColor]}>{getStringDateInLanguageTimeZone(new Date(data.birthdate), 'es-ES', UTC)}</Text>
        </View>

        <View style={FIELD_STYLE}>
          <Text style={[styles.textSecondary]}>Teléfono</Text>
          <Text style={[styles.h4, styles.mainColor]}>{data.phone}</Text>
        </View>

        <View style={FIELD_STYLE}>
          <Text style={[styles.textSecondary]}>Dirección</Text>
          <Text style={[styles.h4, styles.mainColor]}>{data.address || 'No especificada'}</Text>
        </View>
      </View>
    </View>
  )
}

export default PatientData