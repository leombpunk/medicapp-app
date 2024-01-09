const Title = ({ Icon, text, children }) => {
    return (
        <div className='d-flex'>
            <div className='flex-grow-1 d-flex align-items-center gap-1'>
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