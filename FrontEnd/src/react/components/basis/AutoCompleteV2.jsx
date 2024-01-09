import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useRef, useState } from 'react'
import { useSettingsContext } from '../providers/SettingsProvider'

const AutoComplete = ({
    label,
    name,
    isDisabled,
    isRequired,
    currentValue,
    handleValue,
    items,
    currentSearch,
    handleSearch,
    ItemComponent,
    ItemSelected,
    formManager,
}) => {
    const { isThemeDark } = useSettingsContext()
    const [current, setCurrent] = useState(null)
    const [showItems, setShowItems] = useState(false)
    const searchInput = useRef()

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowDown'){
            setCurrent(items.length > 0 ? current === null || current + 1 >= items.length ? 0 : current + 1 : null)
        } else if (event.key === 'ArrowUp'){
            setCurrent(items.length > 0 ? current === null || current - 1 < 0 ? items.length - 1 : current - 1 : null)
        } else if (event.key === 'Enter') {
            event.preventDefault()
            if (current !== null) {
                formManager.setValue(name, items[current])
                handleValue(items[current])
            } else {
                handleSearch(searchInput.current.value)
            }
        } else {
            setCurrent(null)
        }
    }

    const handleOnPress = (item) => {
        formManager.setValue(name, item)
        handleValue(item)
    }

    const handleButtonSearch = (event) => {
        event.preventDefault()
        handleSearch(searchInput.current.value)
    }

    const reset = () => {
        handleValue(undefined)
        handleSearch(undefined)
        formManager.setValue(name, undefined)
    }

    const enableShowItems = () => {
        setShowItems(true)
    }

    const disableShowItems = () => {
        setShowItems(false)
    }

    return (
        <>
            <div>
                {label && <label className='form-label'>{label}</label>}
                <div className='d-flex gap-2'>
                    <div className='input-group'>
                        <span className='input-group-text'>
                            <MagnifyingGlassIcon style={{width: '1.5rem', height:'1.5rem'}}/>
                        </span>
                        {
                            currentValue
                            ? <>
                                <ItemSelected data={currentValue}/>
                                {
                                    !isDisabled &&
                                    <button
                                        className='d-flex btn btn-outline-danger justify-content-center align-items-center'
                                        style={{ padding: 0, width: '3rem' }}
                                        onClick={reset}
                                        title='Eliminar'
                                    >
                                        <XMarkIcon style={{width: '1.25rem', height: '1.25rem'}}/>
                                    </button>
                                }
                            </>
                            : <>
                                <input
                                    ref={searchInput}
                                    type='text'
                                    name='patient'
                                    className={`form-control ${
                                        formManager.errors[name] ? "is-invalid" : ""
                                    }`}
                                    placeholder='Buscar...'
                                    onKeyDown={handleKeyDown}
                                    style={{ position: 'relative' }}
                                    required={isRequired}
                                    disabled={isDisabled}
                                    onFocus={enableShowItems}
                                    onBlur={disableShowItems}
                                />
                                {
                                    (currentSearch && !currentValue) &&
                                    //showItems &&
                                    <div
                                        style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50 }}
                                        className='border rounded-2'
                                        tabIndex='100'
                                        onFocus={enableShowItems}
                                        onBlur={disableShowItems}
                                    >
                                        {
                                            items.length
                                            ? items.map((item, index) => 
                                                <ItemComponent
                                                    key={index}
                                                    index={index}
                                                    totalItems={items.length}
                                                    isSelected={index === current}
                                                    data={item}
                                                    handleOnPress={() => handleOnPress(item)}
                                                />
                                            )
                                            : <>
                                            <div
                                                className={`d-flex justify-content-center align-items-center p-4 ${isThemeDark ? 'text-bg-dark' : 'text-bg-light'}`}
                                                style={{ borderRadius: 'inherit' }}
                                            >
                                                No se han encontrado resultados
                                            </div>
                                            </>
                                        }
                                    </div>
                                }
                                <button className='btn btn-outline-secondary' onClick={handleButtonSearch}>Buscar</button>
                            </>
                        }
                    </div>
                </div>

                {
                    formManager.errors[name] &&
                    <div>
                        {
                            Object.keys(formManager.errors[name]).map(key =>
                                <div key={key} className='invalid-feedback' style={{ display: 'inherit' }}>
                                    {formManager.errors[name][key].message}
                                </div>
                            )
                        }
                        
                    </div>
                }
            </div>
        </>
    )
}

export default AutoComplete