import { TextInput, View, Text, Pressable, ImageBackground, ActivityIndicator } from 'react-native'
import { styles } from '../styles'
import { Button, Container } from '../components'
import { useLogin, usePassword } from '../hooks'
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid'
import logo from '../../assets/adaptive-icon.png'

const Init = () => {
  const { isLoading, form } = useLogin()
  const { showPassword, toggleShowPassword } = usePassword()

  return (
    <Container>
    <View style={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={{ margin: 32, gap: 64 }}>

        <View style={[{ flexGrow: 1, alignItems: 'center' }]}>
          <ImageBackground source={logo} style={{ width: 150, height: 150 }}/>
        </View>
        
        <View style={{ gap: 32 }}>
          <View style={{ gap: 8 }}>
            <View>
              <Text style={[styles.h4, styles.textSecondary]}>Usuario o Correo</Text>
            </View>
            <TextInput
              style={[{ width: '100%', borderBottomWidth: 1, paddingVertical: 8 }, styles.mainBorderColor, styles.h3, styles.mainColor]}
              ref={form.username}
              onChangeText={(event) => form.username.current.value = event}
            />
          </View>

          <View style={{ gap: 8 }}>
            <View>
              <Text style={[styles.h4, styles.textSecondary]}>Contraseña</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%'}}>
            <TextInput
              style={[{ flexGrow: 1, borderBottomWidth: 1, paddingVertical: 4 }, styles.mainBorderColor, styles.h3, styles.mainColor]}
              ref={form.password}
              onChangeText={(event) => form.password.current.value = event}
              secureTextEntry={!showPassword}
            />
            <Pressable style={[{ borderBottomWidth: 1, paddingHorizontal: 8, paddingVertical: 8 }, styles.mainBorderColor]} onPress={toggleShowPassword}>
              {
                showPassword
                ? <EyeIcon size={32} style={styles.mainColor}/>
                : <EyeSlashIcon size={32} style={styles.mainColor}/>
              }
            </Pressable>
            </View>
          </View>
        </View>

        <View  style={[{ flexGrow: 1, alignItems: 'center' }]}>
          {
            isLoading
            ? <>
              <ActivityIndicator size='large'/>
            </>
            : <>
              <Button
                style={[{ borderRadius: 8, paddingVertical: 16, paddingHorizontal: 32 }, styles.bgPrimary]}
                stylePressed={{ opacity: 0.5 }}
                text='Iniciar Sesión'
                contentStyle={[styles.h3]}
                handleOnPress={form.handleSubmit}
              />
            </>
          }

        </View>

      </View>
    </View>
    </Container>
  )
}

export default Init