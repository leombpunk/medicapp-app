import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Colors
} from 'chart.js'
import { Title } from '../components/basis'
import { ChartBarIcon } from '@heroicons/react/24/solid'
import { useProfesional } from '../components/hooks'
import { useParams } from 'react-router-dom'
import NotFound from './NotFound'
import useProfesionalPatientStats from '../components/hooks/useProfesionalStats'
import PatientsMonthly from '../components/charts/PatientsMonthly'
import Earnings from '../components/charts/Earnings'
import useProfesionalEarnings from '../components/hooks/useProfesionalEarnings'
import Treatments from '../components/charts/Treatments'
import useProfesionalTreatments from '../components/hooks/useProfesionalTreatmentsResume'
import { useSettingsContext } from '../components/providers/SettingsProvider'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Colors
)

const ProfesionalStats = () => {
    const { experimentalMode } = useSettingsContext()
    const { id: idProfesional } = useParams()
    const { isLoading, profesional } = useProfesional(idProfesional)
    const { loading: isLoadingPatients, data: dataPatients } = useProfesionalPatientStats(idProfesional)
    const { loading: isLoadingEarnings, data: dataEarnings } = useProfesionalEarnings(idProfesional)
    const { loading: isLoadingTreatments, data: dataTreatments } = useProfesionalTreatments(idProfesional) 


    return (
        <div className='flex-grow-1 d-flex flex-column gap-3'>
            {
                isLoading
                ? <>
                </>
                : profesional
                ? <>
                    <div className='d-flex flex-column gap-3'>
                        <Title Icon={ChartBarIcon} text={`Estadísticas de ${profesional.surnames} ${profesional.names}`}/>


                        
                        <div className='d-grid gap-3' style={{ gridTemplateColumns: '1fr' }}>
                            <div className='d-flex flex-column gap-3'>
                            {
                                experimentalMode &&
                                <Earnings isLoading={isLoadingEarnings} data={dataEarnings}/>
                            }
                            <PatientsMonthly isLoading={isLoadingPatients} data={dataPatients}/>
                            <Treatments isLoading={isLoadingTreatments} data={dataTreatments}/>
                            </div>
                            {/*
                                <div className='d-flex flex-column gap-3'>
                                    <div className='border rounded d-flex overflow-hidden'>
                                        <div className='bg-primary border-end' style={{ width: '0.30rem' }}></div>
                                        <div className='p-2'>
                                            <h5>Ganancias 2023</h5>
                                            <h3>{Number(dataEarnings.length ? dataEarnings[0].total : 0).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</h3>
                                        </div>
                                    </div>

                                    <div className='border rounded d-flex overflow-hidden'>
                                        <div className='bg-danger border-end' style={{ width: '0.30rem' }}></div>
                                        <div className='p-2'>
                                            <h5>Pacientes 2023</h5>
                                            <h3>{Number(dataPatients.length ? dataPatients[0].total : 0).toLocaleString('es-AR')}</h3>
                                        </div>
                                    </div>

                                    <div className='border rounded d-flex overflow-hidden'>
                                        <div className='bg-warning border-end' style={{ width: '0.30rem' }}></div>
                                        <div className='p-2'>
                                            <h5>Tratamientos realizados 2023</h5>
                                            <h3>{Number(dataTreatments.length ? dataTreatments[0].total : 0).toLocaleString('es-AR')}</h3>
                                        </div>
                                    </div>
                                </div>
                            */}
                        </div>
                    </div>
                </>
                : <>
                    <NotFound/>
                </>
            }
           
        </div>                
    )
}

export default ProfesionalStats
