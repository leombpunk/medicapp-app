import { PhotoIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import fileServices from "../../services/files"

const imageIcon = { width: '5rem', height: '5rem' }
const Image = ({ photo, columns, handleOnPress }) => {
    const [image, setImage] = useState(undefined)

    const getPhoto = async () => {
        try {
            console.log({ photo })
            const response = await fileServices.getThumbnail(photo)
            console.log({ response })

            if (response.status === 200) {
                const img = URL.createObjectURL(response.data)
                setImage(img)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPhoto()
    }, [])

    return (
        <div className='card cursor-pointer' onClick={handleOnPress}>
            {
                //photo.image
                image
                ? <img className='card-img-top' src={image} alt={photo.name} style={{ objectFit: 'cover', width: '100%', height: '250px'}}/>
                : <div
                    className='d-flex justify-content-center align-items-center bg-secondary'
                    style={{ width: '100%', height: '250px', borderTopLeftRadius: 'inherit', borderTopRightRadius: 'inherit' }}
                >
                    <PhotoIcon style={imageIcon}/>
                </div>
            }
            <div className='card-body'>
                <div>
                    {
                        columns.map((column, index) => 
                            <div key={index} className='text-truncate'>{ photo[column.key] }</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const ImagesViewer = ({ items, columns, height, handleOnPress }) => {
    return (
        <div className='card w-100' style={{ height, background: 'rgba(0,0,0,0.05)' }}>
            {
                items.length 
                //? <div className='card-body d-flex flex-wrap align-items-baseline gap-3 overflow-auto'>
                ? <div className='card-body d-grid gap-3 overflow-auto' style={{ gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr' }}>
                    {
                        items.map((photo) => 
                            <Image
                                key={photo.id}
                                photo={photo}
                                columns={columns}
                                handleOnPress={() => handleOnPress(photo)}
                            />
                        )
                    }
                </div>
                : <div className='card-body d-flex justify-content-center align-items-center'>
                    <div>No se han encontrado resultados</div>
                </div>
            }
        </div>
    )
}

export default ImagesViewer