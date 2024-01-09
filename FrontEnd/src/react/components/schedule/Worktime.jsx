import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Input } from '../basis'

const Worktime = ({ worktime }) => {
    const startTime = worktime.startTime.slice(0, 5)
    const endTime = worktime.endTime.slice(0, 5)

    return (
        <div className='card'>
            <div className='card-body'>
                <div className='d-flex gap-2'>

                    <div className='d-flex flex-column gap-2'>
                        <div className='d-flex justify-content-between align-items-center gap-2'>
                            <div>Desde</div>
                            <div><Input type='time' value={startTime} after='hs'/></div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center gap-2'>
                            <div>Hasta</div>
                            <div><Input type='time' value={endTime} after='hs'/></div>
                        </div>
                    </div>

                    <div className='d-flex flex-column gap-2'>
                        <button className='btn btn-outline-success' style={{ padding: 0, width: '3rem', height: '2.375rem' }}>
                            <PencilIcon style={{ padding: 0, width: '1.5rem', height: '1.5rem' }}/>
                        </button>
                        <button className='btn btn-outline-danger' style={{ padding: 0, width: '3rem', height: '2.375rem' }}>
                            <TrashIcon style={{ padding: 0, width: '1.5rem', height: '1.5rem' }}/>
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Worktime