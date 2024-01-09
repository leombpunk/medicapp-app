const Input = ({
    label,
    type,
    name,
    value,
    placeholder,
    options,
    defaultValue,
    before,
    after,
    disabled,
    required,
    readOnly,
    handleChange,
    handleKeyDown,
    height
}) => {
    return (
        <div>
            { label && <div className='form-label'>{label}</div> }
            <div className='input-group'>
                { before && <div className='input-group-text'>{before}</div> }
                { 
                    type === 'select' 
                    ? <select
                        className='form-select'
                        defaultValue={defaultValue}
                        onChange={handleChange}
                        disabled={disabled}
                    >
                        {options.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
                    </select>
                    : type === 'textarea'
                    ? <textarea
                        className='form-control'
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        value={value}
                        style={{ resize : 'none', height }}
                    />
                    : <input
                        type={type}
                        name={name}
                        className='form-control'
                        placeholder={placeholder}
                        value={value}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                }
                { after && <div className='input-group-text'>{after}</div> }
            </div>
        </div>
    )
}

export default Input