import { useSettingsContext } from "../providers/SettingsProvider"

const ACPatientItem = ({ data, handleOnPress, isSelected, index, totalItems }) => {
    const { isThemeDark } = useSettingsContext()

    return (
        <div
            className={`d-flex justify-content-between ${index === totalItems - 1 ? '' : 'border-bottom'} py-2 px-2 ${isSelected ? 'text-bg-primary' : isThemeDark ? 'text-bg-dark' : 'text-bg-light'} autocomplete-option`}
            style={{
                borderTopLeftRadius: index === 0 ? 'inherit' : '',
                borderTopRightRadius: index === 0 ? 'inherit' : '',
                borderBottomLeftRadius: index === totalItems - 1 ? 'inherit' : '',
                borderBottomRightRadius: index === totalItems - 1 ? 'inherit' : '',

            }}
            onClick={handleOnPress}
        >
            <div>{`${data.surnames} ${data.names}`}</div> <div>DNI {data.dni}</div>
        </div>
    )
}

export default ACPatientItem