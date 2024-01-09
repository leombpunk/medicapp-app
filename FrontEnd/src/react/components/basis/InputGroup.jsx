const InputGroup = ({label, type, name, value, placeholder, disabled, handleChange}) => {
    return (
        <div className="input-group">
            <label className="form-label">{label}</label>
            <input type={type} className="form-control" placeholder={placeholder} value={value} disabled={disabled} onChange={handleChange}/>
        </div>
    )
}

export default InputGroup