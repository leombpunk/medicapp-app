import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useSettingsContext } from '../providers/SettingsProvider'
import { Loading } from './'

const arrowIcon = { padding: 0, margin: 0, width: '1.25rem', height:'1.25rem' }
const TableHeadColumn = ({ columnKey, columnName, ordered, order, handleSorted }) => {
    const { isThemeDark } = useSettingsContext()
    const buttonColor = isThemeDark ? 'btn-outline-light border-0' : 'btn-outline-dark border-0' 
    const buttonActiveColor = isThemeDark ? 'btn-light' : 'btn-dark'

    return (
        <th>
            <div className='d-flex justify-content-between align-items-center'>
                {columnName}
                {
                    ordered &&
                    <div 
                        className={`btn ${columnKey === order.column ? buttonActiveColor : buttonColor} d-flex justify-content-center align-items-center`}
                        style={{ padding: 0, margin: 0, borderRadius: '50%', width: '1.5rem', height: '1.5rem' }}
                        onClick={() => {handleSorted(columnKey)}}
                    >
                        {
                            columnKey === order.column && order.direction === 'DESC'
                            ? <ChevronUpIcon style={arrowIcon}/>
                            : <ChevronDownIcon style={arrowIcon}/>
                        }
                    </div>
                }
            </div>
        </th>
    )
} 

const Table = ({ loading, items, columns, order, handleOrder, tableHeight, isPressable, handleOnPress }) => {
    const toggleSorted = (atribute) => {
        if (order.direction === 'DESC' && order.column === atribute) {
            return handleOrder({column: 'id', direction: 'DESC'})
        }
        if (order.direction === 'ASC' && order.column === atribute) {
            return handleOrder({column: order.column, direction: 'DESC'})
        }
        handleOrder({column: atribute, direction: 'ASC'})
    }
    
    return (
        <div className='card'>
            <table className={`table table-overflow table-striped ${items.length ? 'table-hover' : ''}`}>
                <thead>
                    <tr>
                        {
                            columns.map((column, index) =>
                                <TableHeadColumn
                                    key={index}
                                    columnKey={column.key}
                                    columnName={column.name}
                                    ordered={column.ordered}
                                    order={order}
                                    handleSorted={toggleSorted}
                                />
                            )
                        }
                    </tr>
                </thead>
                {
                    <tbody className='table-group-divider' style={{ maxHeight: tableHeight, height: tableHeight }}>
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
                            ? items.map((item, index) => 
                                <tr key={index} className={isPressable && 'cursor-pointer'} onClick={isPressable ? () => handleOnPress(item) : undefined}>
                                    {
                                        columns.map((column, jndex) => 
                                            <td key={jndex} className='text-truncate'>
                                                {column.key === 'charge'?item[column.key].description:item[column.key]}
                                            </td>
                                        )
                                    }
                                </tr>
                            )
                            : <tr className='h-100'>
                                <td  className='h-100'>
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

export default Table