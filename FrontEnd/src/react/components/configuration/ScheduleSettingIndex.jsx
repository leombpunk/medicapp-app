import { Pagination, SearchBar, TableV2 } from '../basis'
import useScheduleSettings from '../hooks/useScheduleSettings'

const ScheduleSettingIndex = () => {
    const { 
        loading,
        settings, 
        totalPages,
        page,
        order,
        handleSearch,
        handlePage,
        handleOrder,
        handleOnPress
    } = useScheduleSettings()

    return (
        <>
            <div className='flex-grow-1 d-flex flex-column gap-4'>
                <div className='panel'>
                    <div className='d-flex align-items-center justify-content-between gap-3 w-100'>
                        <SearchBar placeholder='Buscar profesionales por nombre' handleSearch={handleSearch}/>
                    </div>
                </div>
                
                <div className='flex-grow-1 d-flex flex-column align-items-center justify-content-between gap-4'>
                    <TableV2 
                        loading={loading}
                        items={settings}
                        columns={[
                            { name: 'Apellidos', key: 'surnames', ordered: true },
                            { name: 'Nombres', key: 'names', ordered: true },
                            { name: 'Agenda Configurada', key: 'boolWorkdays', ordered: false },
                        ]}
                        order={order}
                        handleOrder={handleOrder}
                        isPressable={true}
                        handleOnPress={handleOnPress}
                        // 100vh - borders (top and bottom) - search - gap -  pagination
                        //calc(100vh - 4rem - (3rem + 38px + 3rem + 38px))
                        tableHeight={'calc(100vh - 9rem - 4.5rem - (3rem + 38px + 3rem + 38px))'}
                    />
                    <Pagination page={page} totalPages={totalPages} handlePage={handlePage}/>
                </div>
            </div>
        </>
    )
}

export default ScheduleSettingIndex
