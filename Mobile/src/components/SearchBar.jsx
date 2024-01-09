import { View, TextInput } from 'react-native'
import { styles } from '../styles'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { useRef } from 'react'

const SearchBar = ({ handleSearch }) => {
    const searchInputRef = useRef()

    const handleOnChangeText = (event) => {
        searchInputRef.current.value = event
    }

    const handleOnSubmit = () => {
        handleSearch(searchInputRef.current.value)
    }
    return (
        <View style={{ paddingHorizontal: 16 }}>
            <View style={[ styles.border, styles.flexRow, styles.alignItemsCenter, { height: 48, borderRadius: 8, padding: 0 }]}>
                <View style={[ styles.justifyCenter, styles.alignItemsCenter, { padding: 8 }]}>
                    <MagnifyingGlassIcon size={24} style={styles.buttonText}/>
                </View>
                <TextInput
                    style={[ styles.mainColor, styles.h3, { flexGrow: 1, height: '100%', margin: 0, padding: 0 }]}
                    enterKeyHint='search'
                    ref={searchInputRef}
                    onChangeText={handleOnChangeText}
                    onSubmitEditing={handleOnSubmit}
                />
            </View>
        </View>
    )
}

export default SearchBar