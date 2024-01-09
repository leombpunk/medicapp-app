import { Bar } from 'react-chartjs-2'
import { useSettingsContext } from '../providers/SettingsProvider'
import { monthES } from '../../constants/constants'
import { Loading } from '../basis'
/*
const PatientsMonthly = ({ isLoading, data }) => {
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
                    <h5>Pacientes</h5>
                    <button
                        className={`btn btn-outline-system ${showDetails ? 'active' : ''}`}
                        onClick={toggleDetails}
                    >
                        Detalles
                    </button>
                </div>
            </div>
            <div className='card-body'>
            <div className=' d-flex flex-column gap-2'>
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
                                                            row.patients.map((patients, index) =>
                                                            <div className={`d-flex justify-content-between ${index % 2 ? 'text-secondary' : ''}`}>
                                                                <div className='font-monospace text-uppercase'>{monthES[patients.month - 1]}</div>
                                                                <div className='font-monospace'>{patients.total}</div>
                                                            </div>
                                                            )
                                                        }
                                                        <div className={`d-flex justify-content-between fw-bold`}>
                                                                <div className='font-monospace text-uppercase'>TOTAL</div>
                                                                <div className='font-monospace'>{row.total}</div>
                                                            </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                            : <>
                                <Bar
                                    options={options}
                                    data={{
                                        labels: monthES,
                                        datasets: data.map((row, index) => ({
                                            id: index,
                                            data: row.patients.map(patients => patients.total),
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

const PatientsMonthly = ({ isLoading, data }) => {
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
                                <Bar
                                    options={options}
                                    data={{
                                        labels: monthES,
                                        datasets: data.map((row, index) => ({
                                            id: index,
                                            data: row.patients.map(earning => earning.total),
                                            label: row.year
                                        }))
                                    }}
                                />
                            </div>
                            <div className='ps-3 border-start d-flex flex-column align-items-end gap-3'>
                                <h3>Pacientes</h3>
                                <div className='d-flex gap-3 flex-column align-items-end'>
                                    {
                                        data.map(yearData =>
                                            <div key={yearData.year} className='d-flex flex-column align-items-end'>
                                                <h5 className='text-secondary'>{yearData.year}</h5>
                                                <h3>{Number(yearData.total).toLocaleString('es-AR')}</h3>
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

export default PatientsMonthly