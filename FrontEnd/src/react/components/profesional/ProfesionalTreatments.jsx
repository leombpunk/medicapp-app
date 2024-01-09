import { Button, Pagination, SearchBar, TableV2, Title } from '../basis'
import { ClipboardDocumentListIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useModal, useProfesionalTreatments } from '../hooks'
import { useSettingsContext } from '../providers/SettingsProvider'
import { MODALMODES } from '../../constants/modal'
import { useNavigate } from 'react-router-dom'
import { RoutesNavigation } from '../../constants/RoutesNavigation'
import { useUserContext } from '../providers/UserProvider'
import { USER_ROLES } from '../../constants/roles'
import TreatmentModalPreview from '../treatments/TreatmentModalPreview'
import TreatmentModal from '../treatments/TreatmentModal'
import useTreatmentModal from '../treatments/useTreatmentModal'

const ProfesionalTreatments = ({ profesional }) => {
    const { user } = useUserContext()
    const { experimentalMode } = useSettingsContext()
    const {
        treatments, order, handleOrder, handleSearch,
        page, handlePage, totalPages,
        createTreatment, deleteTreatment, editTreatment 
    } = useProfesionalTreatments(profesional.id)
    const { show: showPreview, handleOpen, handleClose: handleClosePreview } = useModal()
    const { show: showModal, mode, handleOpen: handleOpenModal, handleClose: handleCloseModal, formManager } = useTreatmentModal({ createTreatment, editTreatment, deleteTreatment })
    const navigate = useNavigate()

    const canModify = !profesional.isDeleted && (user.role.id === USER_ROLES.Admin || user.id === profesional.id)

    const handleOpenPreview = (data) => {
        formManager.reset(data)
        handleOpen()
    }

    const handlePatients = (data) => {
        const URL = `${RoutesNavigation.Patients}?idProfesional=${profesional.id}&idTreatment=${data.id}`
        navigate(URL)
    }

    const handleAdd = () => {
        handleOpenModal(MODALMODES.Add)
    }

    const handleEdit = (data) => {
        handleClosePreview()
        handleOpenModal(MODALMODES.Edit, data)
    }

    const handleDelete = (data) => {
        handleClosePreview()
        handleOpenModal(MODALMODES.Delete, data)
    }

    return (
        <div className='d-flex flex-column gap-3'>
            <Title Icon={ClipboardDocumentListIcon} text='Tratamientos'/>

            <div className='d-flex gap-3'>
                <SearchBar placeholder='Buscar tratamiento...' handleSearch={handleSearch}/>
                {
                    canModify &&
                    <div>
                        <Button
                            className='btn-outline-primary'
                            Icon={PlusIcon}
                            text='Añadir'
                            handleOnClick={handleAdd}
                        />
                    </div>
                }
            </div>

            <div className='d-flex flex-column align-items-center gap-3'>
                <TableV2
                    loading={false}
                    items={treatments}
                    columns={[
                        { name: 'Descripción', key: 'description', ordered: true },
                        experimentalMode && { name: 'Precio', key: 'price', value: (data) => (Number(data).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })),ordered: true },
                    ]}
                    order={order}
                    handleOrder={handleOrder}
                    isPressable={true}
                    handleOnPress={handleOpenPreview}
                    // 100vh - borders (top and bottom) - search - gap -  pagination
                    tableHeight={'calc(100vh - 3rem - 208px - 310px)'}
                />

                <Pagination page={page} totalPages={totalPages} handlePage={handlePage}/>

                <TreatmentModalPreview
                    showModal={showPreview}
                    handleClose={handleClosePreview}
                    handlePatients={handlePatients}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    formManager={formManager}
                    canModify={canModify}
                />
                {
                    canModify &&
                    <TreatmentModal showModal={showModal} modalMode={mode} handleClose={handleCloseModal} formManager={formManager}/>
                }
            </div>
        </div>
    )
}

export default ProfesionalTreatments