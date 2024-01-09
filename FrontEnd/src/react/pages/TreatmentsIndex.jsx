import useTreatments from '../components/hooks/useTreatments'
import { Pagination, TableV2 } from '../components/basis'
import { SearchBar } from '../components/basis'

const TreatmentsIndex = () => {
    const {
        loading,
        treatments,
        totalPages,
        page,
        order,
        handleSearch,
        handlePage,
        handleOrder
    } = useTreatments()
    
    const handleOnPress = () => {

    }

    return (
        <>
            <div className='d-flex flex-column align-items-center gap-4'>

                <div className='d-flex align-items-center justify-content-between gap-3 w-100'>
                    <SearchBar placeholder='Buscar tratamientos' handleSearch={handleSearch}/>
                </div>

                <div className='flex-grow-1 d-flex flex-column align-items-center justify-content-between gap-4'>
                    <TableV2
                        loading={loading}
                        items={treatments}
                        columns={[
                            //{ name: 'ID', key:'id', ordered: true },
                            { name: 'Descripción', key:'description', ordered: true },
                        ]}
                        order={order}
                        handleOrder={handleOrder}
                        //linked={true}
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

export default TreatmentsIndex
