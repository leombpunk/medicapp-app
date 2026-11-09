import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { DropdownButton, Dropdown } from 'react-bootstrap'
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

/* ================= Cards en mobile (patrón: RESPONSIVE-GUIDE.md §6) =================
   En < md los listados se renderizan como cards (d-md-none) en lugar de la tabla
   (d-none d-md-block), evitando columnas comprimidas y scroll horizontal.
   La card se genera de la MISMA config `columns`:
   - `cardHighlight` (opcional): destacado como título. true = usar la columna,
     o función (item) => string para armarlo a medida.
   - Default: si las dos primeras columnas son Apellido/Nombre (surnames + names),
     se combinan como título y no se repetifican como campos.
   - El resto de las columnas se listan como etiqueta (column.name) + valor
     (column.value(item) como en la tabla). Campos cuyo valor es objeto o vacío
     se omiten para no romper el render. */

const getDefaultCardColumns = (columns) => {
    return columns[0]?.key === 'surnames' && columns[1]?.key === 'names'
        ? ['surnames', 'names']
        : null
}

const getCardTitleColumn = (columns) => {
    const highlight = columns.find(column => column.cardHighlight)
    return highlight ?? columns[0]
}

const getCardTitle = (columns, item) => {
    if (getDefaultCardColumns(columns)) {
        return `${item.surnames} ${item.names}`
    }

    const column = getCardTitleColumn(columns)
    if (typeof column.cardHighlight === 'function') {
        return column.cardHighlight(item)
    }
    return column.value ? column.value(item[column.key], item) : item[column.key]
}

const getCardFields = (columns, item) => {
    // claves consumidas por el título: par Apellido/Nombre por defecto, o la
    // columna destacada con cardHighlight
    const titleKeys = getDefaultCardColumns(columns) ?? [getCardTitleColumn(columns).key]

    return columns
        .filter(column => !titleKeys.includes(column.key))
        .map(column => ({
            key: column.key,
            name: column.name,
            value: column.value ? column.value(item[column.key], item) : item[column.key],
        }))
        // omitir valores vacíos u objetos (no renderizables como hijos de JSX)
        .filter(field => field.value !== undefined && field.value !== null && field.value !== '' && typeof field.value !== 'object')
}

const CardTitle = ({ columns, item }) => <h5 className='mb-1 text-truncate'>{getCardTitle(columns, item)}</h5>

const controlOrder = (order, handleOrder, row) => {
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

    
    const sortableColumns = columns.filter(column => column.ordered)

    // === ramas de contenido de una card ===
    const renderCardContent = (item, itemIndex) => (
        <div
            key={itemIndex}
            className={`card p-2 px-3 ${isPressable ? 'cursor-pointer' : ''}`}
            role={isPressable ? 'button' : undefined}
            onClick={isPressable ? () => handleOnPress(item) : undefined}
        >
            <CardTitle columns={columns} item={item}/>
            {
                getCardFields(columns, item).map((field) =>
                    <div key={field.key} className='text-truncate'>
                        <small className='text-body-secondary'>{field.name}:</small>
                        <span className='ms-1'>{field.value}</span>
                    </div>
                )
            }
        </div>
    )

    const renderEmptyCards = () => (
        <div className='border rounded-2 p-4 text-center text-body-secondary'>
            No se han encontrado resultados
        </div>
    )

    const isEmpty = !loading && items.length === 0

    return (
        <>
            {/* --- Tabla: solo >= md (igual a la original) --- */}
            <div className='table-responsive d-none d-md-block'>
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
                                        handleSorted={(row) => controlOrder(order, handleOrder, row)}
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

            {/* --- Cards: solo < md (patrón «cards en mobile») --- */}
            <div className='d-md-none d-flex flex-column gap-2'>
                {
                    sortableColumns.length > 0 &&
                    <div className='d-flex justify-content-end mb-1'>
                        <DropdownButton
                            size='sm'
                            variant='outline-system'
                            title='Ordenar por'
                        >
                            {
                                sortableColumns.map((column, index) =>
                                    {
                                        // misma convención de la tabla: orden por dbKey si existe
                                        const orderKey = column.dbKey || column.key
                                        return (
                                            <Dropdown.Item
                                                key={index}
                                                active={order[orderKey] !== undefined}
                                                onClick={() => controlOrder(order, handleOrder, orderKey)}
                                            >
                                                {column.name}
                                            </Dropdown.Item>
                                        )
                                    }
                                )
                            }
                        </DropdownButton>
                    </div>
                }

                { loading &&
                    <div className='d-flex justify-content-center py-4'>
                        <Loading/>
                    </div>
                }
                { isEmpty
                    ? renderEmptyCards()
                    : items.map((item, itemIndex) => renderCardContent(item, itemIndex))
                }
            </div>
        </>
    )
}

export default TableV2