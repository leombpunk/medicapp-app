import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useRef } from 'react'

const SearchBar = ({placeholder, handleSearch}) => {
    const searchRef = useRef()

    const handleEnter = ({key}) => {
        if (key === 'Enter') {
            handleSearch(searchRef.current.value)
        }
    }

    return (
        <>
            <div className='input-group'>
                <label className='input-group-text'>
                    <MagnifyingGlassIcon style={{ width: '1.25rem', height:'1.25rem' }}/>
                </label>

                <input
                    ref={searchRef}
                    type='text'
                    className='form-control'
                    placeholder={placeholder}
                    onKeyDown={handleEnter}
                />

                <button className='btn btn-outline-secondary' onClick={() => handleSearch(searchRef.current.value)}>Buscar</button>
            </div>
        </>
    )
}

export default SearchBar
