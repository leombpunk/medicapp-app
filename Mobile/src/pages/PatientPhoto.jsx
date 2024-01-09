import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native'
import { Button, Container, Loading, Navbar } from '../components'
import { usePhoto } from '../hooks'
import { styles } from '../styles'
import { getStringDateTimeInLanguageTimeZone } from '../constants/timeFunctions'
import { BuenosAires } from '../constants/time'
import { ArrowDownTrayIcon } from 'react-native-heroicons/outline'

const PatientPhotos = ({ route }) => {
    const { data } = route.params
    const { isLoading, photo, handleDownload } = usePhoto(data)

    return (
        <Container>
            {isLoading ? (
                <>
                    <Navbar title='Fotografía' />
                    <View style={[styles.justifyCenter, styles.alignItemsCenter, { flexGrow: 1 }]}>
                        <Loading/>
                    </View>
                </>
            ) : photo ? (
                <>
                    <Navbar title={`${data.name}`} />
                    <SafeAreaView style={styles.content}>
                        <ScrollView>
                            <View style={{ padding: 16, gap: 16 }}>
                            
                                <Image source={{ uri: photo.image }} style={[styles.border, { width: '100%', height: 500, borderRadius: 8 }]}/>

                                <View>
                                    <Text style={[styles.textSecondary]}>Nombre del archivo</Text>
                                    <Text style={[styles.h4, styles.mainColor]}>{data.name}</Text>
                                </View>

                                <View>
                                    <Text style={[styles.textSecondary]}>Descripción</Text>
                                    <Text style={[styles.h4, styles.mainColor]}>{data.description}</Text>
                                </View>

                                <View>
                                    <Text style={[styles.textSecondary]}>Última modificación</Text>
                                    <Text style={[styles.h4, styles.mainColor]}>{getStringDateTimeInLanguageTimeZone(new Date(data.updatedAt), 'es-AR', BuenosAires)}</Text>
                                </View>
                                {/*
                                <View style={[styles.flexRow, styles.justifyEnd]}>
                                    <Button
                                        Icon={ArrowDownTrayIcon}
                                        text='Descargar'
                                        style={styles.button}
                                        stylePressed={styles.buttonPressed}
                                        contentStyle={styles.buttonText}
                                        contentStylePressed={styles.buttonTextPressed}
                                        handleOnPress={handleDownload}
                                    />
                                </View>
                                */}
                            </View>
                        </ScrollView>
                    </SafeAreaView>


                </>
            ) : (
                <></>
            )}
        </Container>
    )
}

export default PatientPhotos
