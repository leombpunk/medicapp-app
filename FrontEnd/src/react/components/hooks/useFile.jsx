import { useEffect, useState } from 'react'
import patientServices from '../../services/patients'
import fileServices from '../../services/files'
import { getStringDateTimeInLanguageTimeZone } from '../../constants/constants'
import { useSettingsContext } from '../providers/SettingsProvider'

const useFile = (idPatient, type) => {
    const { timeZone } = useSettingsContext()
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState({column: "id", direction: "DESC"})
    const [search, setSearch] = useState('')

    const handleSearch = (value) => {
        setSearch(value)
        setPage(1)
    }

    const getFiles = async () => {
        try {
            setLoading(true)
            const response = type === 'image' ? await patientServices.getPatientPhotos(idPatient, search, page, order) : await patientServices.getPatientFiles(idPatient, search, page, order)
            
            if (response.status === 200) {
                setTotalPages(response.total_pages)
                /*
                const filesFetching = await Promise.all(
                    response.data.map(async (file) => {
                        if (file.type === 'image') {
                            try {
                                //const response = await fileServices.getPhoto(file)
                                const response = await fileServices.getThumbnail(file)
                                return {
                                    ...file,
                                    image: URL.createObjectURL(response.data)
                                }
                            } catch (error) {
                                return file
                            }
                        } else {
                            return file
                        }
                    })
                )
                setFiles(
                    filesFetching.map(
                        file => { 
                            return {
                                ...file,
                                updatedAt: getStringDateTimeInLanguageTimeZone(new Date(file.updatedAt), 'es-ES', timeZone)
                            }
                        }
                    )
                )
                */
                setFiles(
                    response.data.map(
                        file => { 
                            return {
                                ...file,
                                updatedAt: getStringDateTimeInLanguageTimeZone(new Date(file.updatedAt), 'es-ES', timeZone)
                            }
                        }
                    )
                )
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFiles()
    }, [search, page, order])

    const createFile = async (file) => {
        try {
            const response = await fileServices.uploadFile(file)

            if (response.status === 201) {
                getFiles()
            }
    
            return response
        } catch(error) {
            return error.response
        }
    }

    const editFile = async (id, file) => {
        try {
            const response = await fileServices.updateFile(id, file)

            if (response.status === 200) {
                getFiles()
            }
    
            return response
        } catch(error) {
            return error.response
        }
    }

    const deleteFile = async (id) => {
        try {
            const response = await fileServices.deleteFile(id)

            if (response.status === 200) {
                getFiles()
            }
    
            return response
        } catch(error) {
            return error.response
        }
    }


    return {
        loading,
        files,
        page,
        totalPages,
        order,
        createFile,
        editFile,
        deleteFile,
        handleSearch,
        handlePage: setPage,
        handleOrder: setOrder,
    }
}

export default useFile
