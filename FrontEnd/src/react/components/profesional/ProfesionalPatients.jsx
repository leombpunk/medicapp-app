import { useNavigate } from 'react-router-dom'
import { TableV2, Title } from '../basis'
import { usePatients } from '../hooks'
import { UserGroupIcon } from '@heroicons/react/24/outline'
import { RoutesNavigation } from '../../constants/RoutesNavigation'

const ProfesionalPatients = ({ profesional }) => {
    const navigate = useNavigate()
    const { patients, order: patientsOrder, handleOrder, handleOnPress } = usePatients({ idProfesional :profesional.id })

    return (
        <div className='d-flex flex-column gap-3'>
            <Title Icon={UserGroupIcon} text='Pacientes'>
                <button
                    className='btn btn-outline-system'
                    onClick={() => navigate(`${RoutesNavigation.Patients}?idProfesional=${profesional.id}`)}
                >
                    Ver más
                </button>
            </Title>
            <div>
                <TableV2
                    loading={false}
                    items={patients}
                    columns={[
                        { name: 'Apellidos', key:'surnames', ordered: true },
                        { name: 'Nombres', key:'names', ordered: true },
                        { name: 'DNI', key:'dni', ordered: true },
                    ]}
                    order={patientsOrder}
                    handleOrder={handleOrder}
                    isPressable={true}
                    handleOnPress={handleOnPress}
                    // 100vh - borders (top and bottom) - search - gap -  pagination
                    tableHeight={'calc(100vh - 3rem - 8rem'}
                />
            </div>
        </div>
    )
}

export default ProfesionalPatients