import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useSettingsContext } from '../providers/SettingsProvider'
import { Loading } from './'
import { ORDER } from '../../constants/constants'

const arrowIcon = { padding: 0, margin: 0, width: '1.25rem', height:'1.25rem' }
const TableHeadColumn = ({ data, isOrdered, order, handleSorted }) => {
    const { isThemeDark } = useSettingsContext()
    const isActive = order[data.key] !== undefined

    return (
        <th>
            <div className='d-flex align-items-center gap-3'>
                {data.name}
                {
                    isOrdered &&
                    <div 
                        className={`btn ${isThemeDark ? 'btn-outline-light' : 'btn-outline-dark'} ${isActive ? 'active' : ''} border-0 d-flex justify-content-center align-items-center`}
                        style={{ padding: 0, margin: 0, borderRadius: '50%', width: '1.5rem', height: '1.5rem' }}
                        onClick={() => {handleSorted(data.dbKey || data.key)}}
                    >
                        {
                            isActive && order[data.key] === ORDER.Descending
                            ? <ChevronUpIcon style={arrowIcon}/>
                            : <ChevronDownIcon style={arrowIcon}/>
                        }
                    </div>
                }
            </div>
        </th>
    )
}

const TableV2 = ({ loading, items, columns, order, handleOrder, tableHeight, isPressable, handleOnPress }) => {
    /*
    const toggleSorted = (atribute) => {
        if (order.direction === 'DESC' && order.column === atribute) {
            return handleOrder({column: 'id', direction: 'DESC'})
        }
        if (order.direction === 'ASC' && order.column === atribute) {
            return handleOrder({column: order.column, direction: 'DESC'})
        }
        handleOrder({column: atribute, direction: 'ASC'})
    }
    */
    const controlOrder = (row) => {
        if (order[row] === undefined) {
            return handleOrder(row, ORDER.Ascending)
        } else {
            if (order[row] === ORDER.Ascending) {
                return handleOrder(row, ORDER.Descending)
            } else {
                return handleOrder('id', ORDER.Ascending)
            }
        }
    }

    
    return (
        <div>
            <table className='table table-striped table-overflow table-hover'>
                <thead style={{ borderColor: '#00000000' }}>
                    <tr>
                        {
                            columns.map((column, index) =>
                                <TableHeadColumn
                                    key={index}
                                    data={column}
                                    isOrdered={column.ordered}
                                    order={order}
                                    handleSorted={controlOrder}
                                />
                            )
                        }
                    </tr>
                </thead>
                {
                    <tbody className='border rounded-2' style={{ maxHeight: tableHeight }}>
                        {
                            loading ?
                                <tr className='h-100'>
                                    <td className='h-100'>
                                        <div className='h-100 d-flex justify-content-center align-items-center'>
                                            <Loading/>
                                        </div>    
                                    </td>
                                </tr>
                            : items.length 
                            ? items.map((item, itemIndex) => 
                                <tr
                                    key={itemIndex}
                                    className={isPressable ? 'cursor-pointer' : ''}
                                    onClick={isPressable ? () => handleOnPress(item) : undefined}
                                >
                                    {
                                        columns.map((column, columnIndex) => 
                                            <td
                                                key={columnIndex}
                                                className={`text-truncate ${itemIndex === items.length - 1 ? 'border-bottom-0' : ''}`}
                                            >
                                                {column.value ? column.value(item[column.key], item) : item[column.key]}
                                            </td>
                                        )
                                    }
                                </tr>
                            )
                            : <tr className='h-100'>
                                <td  className='h-100 border-bottom-0'>
                                    <div className='h-100 d-flex justify-content-center align-items-center'>
                                        <div>No se han encontrado resultados</div>
                                    </div>
                                </td>
                            </tr>
                        }
                    </tbody>
                }
            </table>
        </div>
    )
}

export default TableV2