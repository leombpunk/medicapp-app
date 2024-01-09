import { useUserContext } from '../providers/UserProvider'
import { blobToBase64 } from '../constants/blob'
import { useEffect, useState } from 'react'
import { View, Image, Pressable, ActivityIndicator } from 'react-native'
import fileServices from '../services/files'
import { useNavigation } from '@react-navigation/native'
import { Routes } from '../constants/Routes'
import { styles } from '../styles'

const Photo = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(undefined)
    const { getUserToken } = useUserContext()
    const { navigate } = useNavigation()

    const getThumnail = async () => {
        try {
            setIsLoading(true)
            const userToken = getUserToken()
            const response = await fileServices.getThumbnail(userToken, data)
            const objectURL = await blobToBase64(response)
            setImage(objectURL)
        } catch (error) {
            console.log({ error })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getThumnail()
    }, [])

    const handleStylePressed = ({ pressed }) => {
        const style = [
            styles.justifyCenter,
            styles.alignItemsCenter,
            { flexGrow: 1, width: '100%', height: 150 },
            pressed && { opacity: 0.5 }
        ]
        return style
    }

    return (
        <Pressable onPress={() => navigate(Routes.PatientPhoto, { data })} style={{ flexGrow: 1 }}>
            {({ pressed }) => 
                <View style={handleStylePressed({ pressed })}>
                    {
                        isLoading
                        ? <ActivityIndicator size='large'/>
                        : <Image source={{ uri: image }} style={{ width: '100%', height: 150 }}/>
                    }
                </View>
            }
        </Pressable>
    )
}

export default Photo