import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

const NotFound = () => {
    return (
        <>
            <div className='d-flex flex-column gap-1 align-items-center justify-content-center h-100vh w-100'>
                <ExclamationCircleIcon style={{ width: '4rem', height: '4rem' }}/>
                <div className='d-flex flex-column align-items-center'>
                    <h3>Error 404</h3>
                    <div>La página a la que está intentado acceder no existe o no fue encontrada.</div>
                </div>
            </div>
        </>
    )
}

export default NotFound