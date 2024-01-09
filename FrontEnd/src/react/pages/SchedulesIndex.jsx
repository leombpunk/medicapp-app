import { Pagination, SearchBar, TableV2 } from '../components/basis';
import useProfesionals from '../components/hooks/useProfesionals';

const SchedulesIndex = () => {
    const {
        loading,
        profesionals,
        totalPages,
        page,
        order,
        handleSearch,
        handlePage,
        handleOrder,
        handleOnPress
    } = useProfesionals()
    
    return (
        <>
            <div className='d-flex flex-column align-items-center gap-4'>

                <div className='d-flex align-items-center gap-3 w-100'>
                    <SearchBar placeholder='Buscar profesionales por nombre' handleSearch={handleSearch}/>
                </div>

                <div className='flex-grow-1 d-flex flex-column align-items-center justify-content-between gap-4'>
                    <TableV2
                        loading={loading}
                        items={profesionals}
                        columns={[
                            //{ name: 'ID', key:'id', ordered: true },
                            { name: 'Apellidos', key: 'surnames', ordered: true },
                            { name: 'Nombres', key: 'names', ordered: true },
                            { name: 'Usuario', key: 'username', ordered: true },
                            { name: 'Correo', key: 'mail', ordered: true },
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

export default SchedulesIndex
