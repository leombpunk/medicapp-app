const Loading = () =>{
    return (
        <div className='flex-grow-1 d-flex flex-column gap-4 justify-content-center align-items-center p-4'>
            <div className='spinner-border' style={{width: '3.5rem', height: '3.5rem', borderWidth: '0.4rem'}}></div>
            <div>Cargando...</div>
        </div>
    )
}

export default Loading
