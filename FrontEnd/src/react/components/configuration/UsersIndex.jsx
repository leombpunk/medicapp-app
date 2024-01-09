import useUsers from '../hooks/useUsers';
import AddUserModal from '../user/modals/AddUserModal';
import { Pagination, SearchBar, TableV2 } from '../basis';

const UsersIndex = () => {
    const { 
        loading, 
        users, 
        addUser,
        totalPages, 
        page, 
        order, 
        handleSearch, 
        handlePage, 
        handleOrder,
        handleOnPress
    } = useUsers()

    return (
        <>
            <div className='d-flex flex-column gap-4'>
                <div className='d-flex align-items-center justify-content-between gap-3 w-100'>
                    <SearchBar placeholder='Buscar pacientes por nombre o DNI' handleSearch={handleSearch}/>
                    <AddUserModal users={users} handleAddUser={addUser}/>
                </div>
        
                <div className='flex-grow-1 d-flex flex-column align-items-center justify-content-between gap-4'>
                    <TableV2
                        loading={loading}
                        items={users.map(user => ({...user, userCharge: user.charge.description, userRole: user.role.description }))}
                        columns={[
                            { name: 'Nombre', key:'names', ordered: true },
                            { name: 'Apellido', key:'surnames', ordered: true },
                            { name: 'Rol', key: 'userRole', dbKey: 'idRole', ordered: true },
                            { name: 'Cargo', key: 'userCharge', dbKey: 'idCharge', ordered: true },
                            { name: 'Estado', key: 'isDeleted', value: (v) => (v ? 'Suspendido' : 'Activo'), ordered: true },
                            { name: 'Correo', key: 'mail', ordered: true },
                            { name: 'Teléfono', key: 'phone', ordered: true }
                        ]}
                        order={order}
                        handleOrder={handleOrder}
                        isPressable={true}
                        handleOnPress={handleOnPress}
                        tableHeight={'calc(100vh - 9rem - 4.5rem - (3rem + 38px + 3rem + 38px))'}
                    />
                    <Pagination page={page} totalPages={totalPages} handlePage={handlePage}/>
                </div>
            </div>
        </>
    )
}

export default UsersIndex;