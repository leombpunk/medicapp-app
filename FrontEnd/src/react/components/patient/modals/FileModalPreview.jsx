import { ArrowDownTrayIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '../../basis'
import { useEffect, useState } from 'react'
import fileServices from '../../../services/files'
/*
const Modal = ({ show, title, image, modalSize, children, handleClose }) => {
    return (
        <>
            {
                show && 
                <>
                    <div className='fade modal-backdrop show'></div>
                    <div className='fade modal show d-block' tabIndex='-1'>
                        <div className={`modal-dialog modal-dialog-centered ${modalSize}`}>
                            <div className='modal-content p-0'>
                                { 
                                    image &&
                                    <div className='w-100'>
                                        <img className='w-100 rounded-top-2 position-relative' src={image} alt='img-preview' loading='lazy'/>
                                        <div className='position-absolute' style={{ top: '1rem', right: '1rem' }}>
                                            <button
                                                className='btn btn-outline-light rounded-circle d-flex justify-content-center align-items-center p-0'
                                                style={{ width: '40px', height: '40px' }}
                                                onClick={handleClose}
                                            >
                                                <XMarkIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
                                            </button>
                                        </div>
                                    </div>
                                }
                                <div className='modal-body'>
                                    {
                                        !image &&
                                        <div className='mb-3 d-flex align-items-center justify-content-between'>
                                            <h4>{title}</h4>
                                            {
                                                !image &&
                                                <button
                                                    className='btn btn-outline-system rounded-circle d-flex justify-content-center align-items-center p-0'
                                                    style={{ width: '40px', height: '40px' }}
                                                    onClick={handleClose}
                                                >
                                                    <XMarkIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
                                                </button>
                                            }
                                        </div>
                                    }
                                    <div>
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
*/

const Modal = ({ show, title, image, children, handleClose }) => {
    return (
        <>
            {
                show && 
                <>
                    <div className='fade modal-backdrop show'></div>
                    <div className='position-absolute d-flex justify-content-center align-items-center' tabIndex='-1' style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
                        <div className='card' style={{ zIndex: 1055 }}>
                            <div className='d-flex flex-row'>
                                {
                                    image &&
                                    <div>
                                        <img className='rounded-start-2' src={image} alt='img-preview' loading='lazy' style={{ maxHeight: '500px' }}/>
                                    </div>
                                }

                                <div className='card-body' style={{ minWidth: '500px', maxWidth: '500px'}}>
                                    <div>
                                        <div className='mb-3 d-flex align-items-center justify-content-between'>
                                            <h4>{title}</h4>
                                            
                                            <button
                                                className='btn btn-outline-system rounded-circle d-flex justify-content-center align-items-center p-0'
                                                style={{ width: '40px', height: '40px' }}
                                                onClick={handleClose}
                                            >
                                                <XMarkIcon style={{ width: '1.5rem', height: '1.5rem' }}/>
                                            </button>
                                        </div>

                                        <div>
                                            {children}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

const FileModalPreview = ({ modalShow, handleModalClose, handleDownload, handleEdit, handleDelete, data }) => {
    const [image, setImage] = useState(undefined)
    // console.log({data})

    const handleSaveFile = async (event) => {
        event.preventDefault()
        // Get file name from url.
        var filename = data?.name;
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function() {
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
            a.download = filename; // Set the file name.
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            // delete a;
        };
        xhr.open('GET', image);
        xhr.send();
    }

    useEffect(() => {
        const getPhoto = async () => {
            try {
                // console.log({ data })
                const response = await fileServices.getPhoto(data)
                if (response.status === 200) {
                    if (data.storage === 'cloud') {
                        setImage(response.data.data)
                    } else {
                        setImage(URL.createObjectURL(response.data))
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (data?.type === 'image') {
            getPhoto()            
        }
    }, [data])

    return (
        <Modal image={image} show={modalShow} title={'Archivos'} handleClose={handleModalClose}>
            <div className='d-flex flex-column gap-3'>

                <div>
                    <strong>Nombre del archivo</strong>
                    <div className='text-truncate'>{data?.name}</div>
                </div>

                <div>
                    <strong>Descripción</strong>
                    <div className='text-truncate'>{data?.description}</div>
                </div>

                <div>
                    <strong>Última modificación</strong>
                    <div>{data?.updatedAt}</div>
                </div>

                <div className='d-flex gap-2 justify-content-end'>
                    <Button
                        className='btn-outline-system'
                        Icon={ArrowDownTrayIcon}
                        text='Descargar'
                        handleOnClick={data?.storage === 'cloud' ? handleSaveFile : handleDownload}
                    />

                    <Button
                        className='btn-outline-system'
                        Icon={PencilIcon}
                        text='Editar'
                        handleOnClick={() => handleEdit(data)}
                    />

                    <Button
                        className='btn-outline-system'
                        Icon={TrashIcon}
                        text='Eliminar'
                        handleOnClick={() => handleDelete(data)}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default FileModalPreview