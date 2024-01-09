const iconStyle = { width: '1.25rem', height: '1.25rem' }

const Button = ({ handleOnClick, isDisabled, Icon, text, title, className, isActived, isLoading }) => {
    return (
        <button
            className={`btn d-flex justify-content-center align-items-center gap-1 text-truncate ${className} ${isActived ? 'active' : ''}`}
            onClick={handleOnClick}
            title={title}
            disabled={isDisabled}
        >
            {Icon && !isLoading && <Icon style={iconStyle}/>}
            {isLoading && <div className='spinner-border' style={{ width: '1.25rem', height: '1.25rem', borderWidth: '2px' }}/>}
            {text}
        </button> 
    )
}

export default Button