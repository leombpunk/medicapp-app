import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
import { useSettingsContext } from '../providers/SettingsProvider'

const arrowIcon = { width: '1.25rem', height: '1.25rem' }

// Máximo de botones de página visibles a la vez
const VISIBLE_PAGES = 5

// Ventana de páginas centrada en la actual, sin salirse de los extremos.
// Si hay menos páginas que VISIBLE_PAGES, se muestran todas.
const getVisiblePages = (page, totalPages) => {
    if (totalPages <= VISIBLE_PAGES) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const half = Math.floor(VISIBLE_PAGES / 2)
    const start = Math.max(1, Math.min((page || 1) - half, totalPages - VISIBLE_PAGES + 1))

    return Array.from({ length: VISIBLE_PAGES }, (_, i) => start + i)
}

const Pagination = ({ page, totalPages, handlePage }) => {
    const { isThemeDark } = useSettingsContext()
    const buttons = getVisiblePages(page, totalPages)

    return (
        <div>
            <div className='input-group'>
                <button
                    className={`btn ${isThemeDark ? 'btn-outline-light' : 'btn-outline-dark'} border`}
                    onClick={() => handlePage(1)}
                    disabled={!totalPages}
                >
                    <ChevronDoubleLeftIcon style={arrowIcon}/>
                </button>

                {
                    buttons.map(index => {
                        const isActive = page === index
                        return (
                            <button
                                key={index}
                                className={`btn ${isThemeDark ? 'btn-outline-light' : 'btn-outline-dark'} border ${isActive ? 'active' : ''}`}
                                onClick={() => handlePage(index)}
                            >
                                {index}
                            </button>
                        )
                    })
                }

                <button
                    className={`btn ${isThemeDark ? 'btn-outline-light' : 'btn-outline-dark'} border`}
                    onClick={() => handlePage(totalPages)}
                    disabled={!totalPages}
                >
                    <ChevronDoubleRightIcon style={arrowIcon}/>
                </button>
            </div>
        </div>
    )
}

export default Pagination