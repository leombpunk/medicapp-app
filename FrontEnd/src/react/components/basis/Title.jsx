const Title = ({ Icon, text, children }) => {
    return (
        <div className='d-flex flex-wrap align-items-center gap-2'>
            <div className='flex-grow-1 d-flex align-items-center gap-1 title-text'>
                {
                    Icon &&
                    <div className='title-icon'>
                        <Icon/>
                    </div>
                }
                
                <div className='title'>
                    {text}
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Title