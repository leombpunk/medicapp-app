import { useParams } from 'react-router-dom';
import PatientData from '../components/patient/PatientData';
import PatientNotes from '../components/patient/PatientNotes';
import PatientFiles from '../components/patient/PatientFiles';
import PatientPhotos from '../components/patient/PatientPhotos';
import usePatient from '../components/hooks/usePatient';
import NotFoundPage from './NotFound';
import { Loading } from '../components/basis';
import PatientTreatments from './PatientTreatments';
import PatientTurns from '../components/patient/PatientTurns';

const Patient = () => {
    const { id: idPatient } = useParams()
    const { loading, patient, editPatient } = usePatient(idPatient)

    return (
        <>
            {
                loading                    
                ? <Loading/>
                : patient 
                    ? <>
                            <div className='d-grid gap-4' style={{ gridTemplateColumns: '3fr 2fr'}}>
                                <div className='d-flex flex-column gap-4'>
                                    <PatientData patient={patient} handleEditPatient={editPatient}/>
                                    <PatientNotes data={patient}/>
                                    <PatientPhotos patient={patient}/>
                                    <PatientFiles patient={patient}/>
                                </div>
                                <div className='d-flex flex-column gap-4'>
                                    <PatientTurns patient={patient}/>
                                    <PatientTreatments/>
                                </div>
                            </div>
                        </>
                    : <NotFoundPage/>
            }
        </>
    )
}

export default Patient