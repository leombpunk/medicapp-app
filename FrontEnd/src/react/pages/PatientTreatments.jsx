import { useNavigate, useParams } from 'react-router-dom'
import { usePatientTreatments } from '../components/hooks'
import { Loading, Title } from '../components/basis'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import { RoutesNavigation } from '../constants/RoutesNavigation'

const PatientTreatments = () => {
    const { id: idPatient } = useParams()
    const { loading, treatments } = usePatientTreatments(idPatient)
    const navigate = useNavigate()

    return (
        <div className='d-flex flex-column gap-4'>
            <Title Icon={ClipboardDocumentListIcon} text='Tratamientos del paciente'/>
            
            {
                loading
                ? <>
                    <Loading/>
                </>
                : <>
                    <div className='d-flex flex-column gap-3'>
                        {
                            treatments.length
                            ? <>
                                {
                                    treatments.map(treatment => {
                                        return (
                                            <div
                                                key={treatment.id}
                                                className='card d-flex flex-column py-2 px-4 cursor-pointer'
                                                onClick={() => navigate(`${RoutesNavigation.Turns}?idProfesional=${treatment?.profesional.id}&idTreatment=${treatment.id}`)}
                                            >
                                                <div>{treatment.description}</div>
                                                {
                                                    treatment.profesional &&
                                                    <strong>{`${treatment.profesional.surnames} ${treatment.profesional.names}`}</strong>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </>
                            : <>
                                <div className='flex-grow-1 d-flex justify-content-center align-items-center border rounded-2 p-2'>
                                    <div>No se han encontrado resultados.</div>
                                </div>
                            </>
                        }
                        
                    </div>
                </>
            }
        </div>
    )
}

export default PatientTreatments