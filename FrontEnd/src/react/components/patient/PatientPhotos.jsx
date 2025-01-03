import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'
import { Bars3Icon, PhotoIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import { SearchBar, Table, Pagination } from '../basis'
import useFile from '../hooks/useFile'
import useFileModal from './modals/useFileModal'
import ImagesViewer from '../basis/ImagesViewer'
import FileModalPreview from './modals/FileModalPreview'
import useFileModalPreview from './modals/useFileModalPreview'
import NewFileModal from './modals/NewFileModal'

const PatientPhotos = ({ patient }) => {

    const {
        loading,
        files,
        createFile,
        editFile,
        deleteFile,
        order,
        page,
        totalPages,
        handleOrder,
        handleSearch,
        handlePage,
    } = useFile(patient.id, 'image')

    const {
        data,
        show: showPreview,
        handleOpen: handleOpenPreview,
        handleClose: handleClosePreview,
        handleDownload,
    } = useFileModalPreview()

    const {
        show: showModal,
        mode: modalMode,
        loading: isLoading,
        handleOpen,
        handleClose,
        handleOpenEditMode,
        handleOpenDeleteMode,
        formManager,
    } = useFileModal(patient.id, createFile, editFile, deleteFile)

    const [viewerMode, setViewerMode] = useState(false)

    const enableViewerMode = () => {
        setViewerMode(true)
    }

    const disableViewerMode = () => {
        setViewerMode(false)
    }

    const handleEdit = (data) => {
        handleOpenEditMode(data)
        handleClosePreview()
    }

    const handleDelete = (data) => {
        handleOpenDeleteMode(data)
        handleClosePreview()
    }

    return (
        <div className='d-flex flex-column gap-4'>

            <div className='panel'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center gap-1'>
                        <div className='title-icon'><PhotoIcon/></div>
                        <div className='title'>Fotografías del Paciente</div>
                    </div>
                </div>
            </div>

            <div className='d-flex flex-column align-items-center gap-4'>
                <div className='d-flex align-items-center gap-3 w-100'>
                    <SearchBar placeholder='Buscar archivo...' handleSearch={handleSearch}/>
                    
                    <div className='d-flex'>
                        <button
                            type='button'
                            className={`btn btn-outline-system  rounded-end-0 ${viewerMode ? '' : 'active'} d-flex justify-content-center align-items-center`}
                            style={{ padding: 0, width: '2.75rem', height: '2.375rem' }}
                            onClick={disableViewerMode}
                            title='Ver en lista'
                        >
                            <Bars3Icon style={{ width: '1.5rem' }}/>
                        </button>

                        <button
                            type='button'
                            className={`btn btn-outline-system rounded-start-0 ${viewerMode ? 'active' : ''}`}
                            style={{ padding: 0, width: '2.75rem', height: '2.375rem' }}
                            onClick={enableViewerMode}
                            title='Ver en iconos'
                        >
                            <Squares2X2Icon style={{ width: '1.5rem' }}/>
                        </button>
                    </div>

                    <div>
                        <button type='button' className='btn btn-outline-primary width-auto' onClick={handleOpen}>
                            <div className='d-flex align-items-center gap-1'>
                                <PlusIcon style={{ width: '1.25rem' }}/>
                                <div>
                                    Añadir
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {
                    viewerMode
                    ? <ImagesViewer
                        loading={loading}
                        items={files}
                        columns={[
                            //{ name: 'ID', key:'id', ordered: true },
                            { name: 'Nombre', key:'name', ordered: true },
                            { name: 'Descripción', key:'description', ordered: true },
                            { name: 'Última modificación', key:'updatedAt', ordered: true },
                            //{ name: '', key:'buttons', ordered: false },
                        ]}
                        height={`694px`}
                        handleOnPress={handleOpenPreview}
                    />
                    : <Table
                        loading={loading}
                        items={files}
                        columns={[
                            //{ name: 'ID', key:'id', ordered: true },
                            { name: 'Nombre', key:'name', ordered: true },
                            { name: 'Descripción', key:'description', ordered: true },
                            { name: 'Última modificación', key:'updatedAt', ordered: true },
                            //{ name: '', key:'buttons', ordered: false },
                        ]}
                        order={order}
                        handleOrder={handleOrder}
                        isPressable={true}
                        handleOnPress={handleOpenPreview}
                        tableHeight={`635px`}
                    />
                }

                <Pagination page={page} totalPages={totalPages} handlePage={handlePage}/>
            </div>

            <FileModalPreview
                data={data}
                modalShow={showPreview}
                handleModalClose={handleClosePreview}
                handleDownload={handleDownload}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

            <NewFileModal
                showModal={showModal}
                modalMode={modalMode}
                isLoading={isLoading}
                handleClose={handleClose}
                formManager={formManager}
            />
        </div>
    )
}

export default PatientPhotos