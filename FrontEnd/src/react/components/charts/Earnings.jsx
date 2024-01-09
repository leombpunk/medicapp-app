import { Line } from 'react-chartjs-2'
import { useSettingsContext } from '../providers/SettingsProvider'
import { monthES } from '../../constants/constants'
import { useState } from 'react'
import { Loading } from '../basis'
/*
const Earnings = ({ isLoading, data }) => {
    const { isThemeDark } = useSettingsContext()
    const [showDetails, setShowDetails] = useState(false)

    const toggleDetails = () => {
        setShowDetails(show => !show)
    }

    const options = {
        scales: {
            x: { grid: { color: isThemeDark ? '#ffffff20' : undefined } },
            y: { grid: { color: isThemeDark ? '#ffffff20' : undefined } }
        }
    }

    return (
        <div className='card'>
            <div className='card-header'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h5>Ganancias</h5>
                    <button
                        className={`btn btn-outline-system ${showDetails ? 'active' : ''}`}
                        onClick={toggleDetails}
                    >
                        Detalles
                    </button>
                </div>
            </div>
            <div className='card-body'>
            <div className=' d-flex flex-column gap-2' style={{ overflowX: 'auto' }}>
                {
                    isLoading
                    ? <>
                        <Loading/>
                    </>
                    : <>
                        {
                            showDetails
                            ? <>
                                <div className='d-flex flex-wrap gap-5'>
                                    {
                                        data.map(row => {
                                            const year = row.year
                                            return (
                                                <div key={year} className='flex-grow-1'>
                                                    <div className='d-flex justify-content-center'>
                                                        <strong>{year}</strong>
                                                    </div>
                                                    <div>
                                                        {
                                                            row.earnings.map((earning, index) =>
                                                            <div className={`d-flex justify-content-between ${index % 2 ? 'text-secondary' : ''}`}>
                                                                <div className='font-monospace text-uppercase'>{monthES[earning.month - 1].slice(0, 3)}</div>
                                                                <div className='font-monospace'>{Number(earning.total).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</div>
                                                            </div>
                                                            )
                                                        }
                                                        <div className={`d-flex justify-content-between fw-bolder`}>
                                                                <div className='font-monospace text-uppercase'>total</div>
                                                                <div className='font-monospace'>{Number(row.total).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</div>
                                                            </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                            : <>
                                <Line
                                    options={options}
                                    data={{
                                        labels: monthES,
                                        datasets: data.map((row, index) => ({
                                            id: index,
                                            data: row.earnings.map(earning => earning.total),
                                            label: row.year
                                        }))
                                    }}
                                    style={{ width: '100%' }}
                                />
                            </>
                        }
                    </>
                }
            </div>
            </div>
        </div>
    )
}
*/

const Earnings = ({ isLoading, data }) => {
    const { isThemeDark } = useSettingsContext()

    const options = {
        scales: {
            x: { grid: { color: isThemeDark ? '#ffffff20' : undefined } },
            y: { grid: { color: isThemeDark ? '#ffffff20' : undefined } }
        }
    }

    return (
        <div className='card'>
            <div className='card-body'>
                {
                    isLoading
                    ? <>
                        <Loading/>
                    </>
                    : <>
                        <div className='d-grid' style={{ gridTemplateColumns: '3fr 1fr' }}>
                            <div className='pe-3'>
                                <Line
                                    options={options}
                                    data={{
                                        labels: monthES,
                                        datasets: data.map((row, index) => ({
                                            id: index,
                                            data: row.earnings.map(month => month.total),
                                            label: row.year
                                        }))
                                    }}
                                />
                            </div>
                            <div className='ps-3 border-start d-flex flex-column align-items-end gap-3'>
                                <h3>Ganancias</h3>
                                <div className='d-flex gap-3 flex-column'>
                                    {
                                        data.map(yearData =>
                                            <div className='d-flex flex-column align-items-end'>
                                                <h5 className='text-secondary'>{yearData.year}</h5>
                                                <h3>{Number(yearData.total).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</h3>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Earnings