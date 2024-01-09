const InputV2 = ({
        formManager,
        label,
        type,
        name,
        errors,
        placeholder,
        options,
        before,
        after,
        disabled,
        readOnly,
        defaultValue,
        onBlur,
        height,
        styled
    }) => {
    return (
        <div>
            { label && <div className='form-label'>{label}</div> }
            <div className='input-group'>
                { before && <div className='input-group-text'>{before}</div> }
                { 
                    type === 'select' 
                    ? <select
                        className={`form-select ${styled}`}
                        disabled={disabled}
                        readOnly={readOnly}
                        defaultValue={defaultValue}
                        { ...formManager.register(name, errors) }
                    >
                        {options.map((option, index) => <option key={index} value={option.value}>{option.description}</option>)}
                    </select>
                    : type === 'textarea'
                    ? <textarea
                            className={`form-control ${formManager.errors[name] ? "is-invalid" : ""} ${styled}`}
                            disabled={disabled}
                            readOnly={readOnly}
                            placeholder={placeholder}
                            style={{ resize : 'none', height }}
                            { ...formManager.register(name, errors) }
                        />
                    : <input
                        type={type}
                        className={`form-control ${
                            formManager.errors[name] ? "is-invalid" : ""
                            } ${styled}`}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        { ...formManager.register(name, errors) }
                        onBlur={onBlur}
                    />
                }
                { after && <div className='input-group-text'>{after}</div> }
            </div>
            {formManager.errors[name] && <div className='invalid-feedback' style={{ display: 'inherit' }}>{formManager.errors[name]?.message}</div>}
        </div>
    )
}

export default InputV2