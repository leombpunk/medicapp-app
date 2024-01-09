import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
import { useSettingsContext } from '../providers/SettingsProvider'

const arrowIcon = { width: '1.25rem', height: '1.25rem' }
const Pagination = ({ page, totalPages, handlePage }) => {
    const { isThemeDark } = useSettingsContext()
    const buttons = Array.from({ length: totalPages }, (_, i) => i + 1)

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