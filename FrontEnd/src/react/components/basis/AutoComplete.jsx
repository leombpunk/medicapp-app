import { XMarkIcon } from '@heroicons/react/24/solid'
import { useRef, useState } from 'react'
import Button from './Button'

const AutoComplete = ({ label, before, after, handleSearch, items, value, currentValue, handleValue, isDisabled }) => {
    const [showItems, setShowItems] = useState(false)
    const searchInput = useRef()

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(searchInput.current.value)
            return
        }
    }

    const handleRemove = () => {
        handleValue(undefined)
    }

    const handleOnClick = (item) => {
        handleValue(item)
        setShowItems(false)
    }

    const enableShowItems = () => {
        setShowItems(true)
    }

    const disableShowItems = () => {
        setShowItems(false)
    }

    return (
        <>
            {label && <label className='form-label'>{label}</label>}
            <div className='input-group flex-nowrap'>
                { before && <div className='input-group-text'>{before}</div> }
                {
                    currentValue
                    ? <>
                        <input className='form-control' value={value(currentValue)} disabled readOnly/>
                        {
                            !isDisabled &&
                            <Button
                                className='btn-outline-system'
                                Icon={XMarkIcon}
                                handleOnClick={handleRemove}
                            />
                        }
                    </>
                    : <>
                        <div className='position-relative rounded w-100' onFocus={enableShowItems}>
                            <input
                                ref={searchInput}
                                className='form-select'
                                onKeyDown={handleKeyDown}
                                style={{
                                    borderTopLeftRadius: before ? 0 : 'inherit', borderBottomLeftRadius: before ? 0 : 'inherit',
                                    borderTopRightRadius: after ? 0 : 'inherit', borderBottomRightRadius: after ? 0 : 'inherit'
                                }}
                                disabled={isDisabled}
                            />
                            {
                                showItems
                                ? <>
                                    <div
                                        className='border rounded-2 position-absolute overflow-hidden'
                                        style={{ top: '100%', left: 0, right: 0, zIndex: 1055 }}
                                        onBlur={disableShowItems}
                                    >
                                        {
                                            items.length
                                            ? <>
                                                {
                                                    items.map((item, index) => {
                                                            return (
                                                            <div
                                                                key={index}
                                                                className={`p-2 bg-body-tertiary autocomplete-option ${index === items.length - 1 ? '' : 'border-bottom'}`}
                                                                onClick={() => handleOnClick(item)}
                                                            >
                                                                <div>{value(item)}</div>
                                                            </div>
                                                            )
                                                        }
                                                    )
                                                }
                                            </>
                                            : <>
                                                <div className='d-flex justify-content-center align-items-center p-2 bg-body-tertiary'>
                                                    No se han encontrado resultados
                                                </div>
                                            </>
                                        }
                                    </div>
                                </>
                                : <></>
                            }
                        </div>
                    </>
                }
                { after && <div className='input-group-text'>{after}</div> }
            </div>
        </>
    )
}

export default AutoComplete