import usePatients from '../components/hooks/usePatients'
import { AutoComplete, Pagination, TableV2 } from '../components/basis'
import { AddPatientModal } from '../components/patient'
import { SearchBar } from '../components/basis'
import { useSearchParams } from 'react-router-dom'
import { UTC, getStringDateInLanguageTimeZone } from '../constants/constants'
import useProfesionals from '../components/hooks/useProfesionals'
import { useProfesional } from '../components/hooks'

const PatientsIndex = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const idProfesional = searchParams.get('idProfesional')
    const idTreatment = searchParams.get('idTreatment')
    const {
        loading,
        patients,
        addPatient,
        totalPages,
        page,
        order,
        handleSearch,
        handlePage,
        handleOrder,
        handleOnPress
    } = usePatients({ idProfesional, idTreatment })
    const { profesional } = useProfesional(idProfesional)
    const { profesionals, handleSearch: handleSearchProfesional } = useProfesionals()

    const handleProfesional = (profesional) => {
        if (profesional?.id) {
            setSearchParams({ idProfesional: profesional?.id })
        } else {
            setSearchParams({})
        }
    }
    
    return (
        <>
            <div className='d-flex flex-column gap-4'>

                <div className='d-flex align-items-center gap-3 w-100'>
                    <SearchBar placeholder='Buscar pacientes por nombre o DNI' handleSearch={handleSearch}/>

                    <AutoComplete
                        before='Profesional'
                        items={profesionals}
                        handleSearch={handleSearchProfesional}
                        handleValue={handleProfesional}
                        currentValue={profesional}
                        value={(data) => `${data.surnames} ${data.names}`}
                    />

                    <AddPatientModal patients={patients} handleAddPatient={addPatient} handlePatients={null}/>
                </div>

                <div className='flex-grow-1 d-flex flex-column align-items-center justify-content-between gap-4'>
                    <TableV2
                        loading={loading}
                        items={patients}
                        columns={[
                            //{ name: 'ID', key:'id', ordered: true },
                            { name: 'Apellidos', key:'surnames', ordered: true },
                            { name: 'Nombres', key:'names', ordered: true },
                            { name: 'DNI', key:'dni', ordered: true },
                            //{ name: 'Fecha de Nacimiento', key:'birthdate', ordered: true },
                            {
                                name: 'Fecha de Nacimiento',
                                key:'birthdate',
                                value: (data) => (getStringDateInLanguageTimeZone(new Date(data), 'es-ES', UTC)),
                                ordered: true
                            },
                            { name: 'Teléfono', key:'phone', ordered: true }
                        ]}
                        order={order}
                        handleOrder={handleOrder}
                        isPressable={true}
                        handleOnPress={handleOnPress}
                        // 100vh - borders (top and bottom) - search - gap -  pagination
                        tableHeight={'calc(100vh - 4rem - (3rem + 38px + 3rem + 38px))'}
                    />

                    <Pagination page={page} totalPages={totalPages} handlePage={handlePage}/>
                </div>

            </div>
        </>
    )
}

export default PatientsIndex
