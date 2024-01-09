import useCharges from '../hooks/useCharges'
import { SearchBar, Pagination, TableV2, Button } from '../basis'
import ChargeModal from '../charge/ChargeModal'
import useChargeModal from '../charge/useChargeModal'
import { PencilIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { MODALMODES } from '../../constants/modal'

const ActionsButtons = ({ data, handleOpenModal }) => {
    return (
        <div className='d-flex gap-2'>
            <Button
                className='btn-outline-secondary'
                text='Editar'
                Icon={PencilIcon}
                handleOnClick={() => handleOpenModal(MODALMODES.Edit, data)}
            />

            <Button
                className='btn-outline-secondary'
                text='Eliminar'
                Icon={XMarkIcon}
                handleOnClick={() => handleOpenModal(MODALMODES.Delete, data)}
            />
        </div>
    )
}

const ChargesIndex = () => {
    const {
        loading, 
        chargesList,
        totalPages,
        page,
        order,
        handleSearch,
        handleOrder,
        handlePage,
        createCharge,
        updateCharge,
        deleteCharge 
    } = useCharges()

    const { show, mode, handleOpen, handleClose, formManager } = useChargeModal({ createCharge, editCharge: updateCharge, deleteCharge })

    return (
        <>
            <div className='d-flex flex-column gap-4'>
                <div className='d-flex align-items-center justify-content-between gap-3 w-100'>
                    <SearchBar placeholder='Buscar cargos por nombre' handleSearch={handleSearch}/>

                    <div>
                        <Button
                            className='btn-outline-primary'
                            Icon={PlusIcon}
                            text='Añadir'
                            handleOnClick={() => handleOpen()}
                        />
                    </div>
                </div>
        
                <div className='flex-grow-1 d-flex flex-column align-items-center justify-content-between gap-4'>
                    <TableV2
                        loading={loading}
                        items={chargesList}
                        columns={[
                            //{ name: 'ID', key: 'id', ordered: true },
                            { name: 'Descripcion', key: 'description', ordered: true },
                            { name: 'Acciones', value: (_, item) => <ActionsButtons data={item} handleOpenModal={handleOpen}/>, ordered: false}
                        ]}
                        order={order}
                        handleOrder={handleOrder}
                        isPressable={false}
                        tableHeight={'calc(100vh - 9rem - 4.5rem - (3rem + 38px + 3rem + 38px))'}
                    />
                    <Pagination page={page} totalPages={totalPages} handlePage={handlePage}/>
                </div>

                <ChargeModal showModal={show} modalMode={mode} handleClose={handleClose} formManager={formManager}/>
            </div>
        </>
    )
}

export default ChargesIndex