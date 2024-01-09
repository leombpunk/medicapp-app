import { useEffect, useState } from 'react'
import statServices from '../../services/stats'

const useProfesionalEarnings = (idProfesional) => {
    const [loading, setLoading] = useState()
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            setLoading(true)
            const response = await statServices.getProfesionalEarnings({ idProfesional })
            if (response.status === 200) {
                setData(response.data)
            }
        } catch(error) {
            
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [idProfesional])

    return {
        loading,
        data
    }
}

export default useProfesionalEarnings