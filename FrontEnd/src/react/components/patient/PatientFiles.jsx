import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { SearchBar, Table, Pagination } from "../basis";
import useFileModal from "./modals/useFileModal";
import useFile from "../hooks/useFile";
import FileModalPreview from "./modals/FileModalPreview";
import NewFileModal from "./modals/NewFileModal";
import useFileModalPreview from "./modals/useFileModalPreview";

const PatientFiles = ({ patient }) => {
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
    } = useFile(patient.id)

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
        formManager
    } = useFileModal(patient.id, createFile, editFile, deleteFile)

    const handleEdit = (data) => {
        handleOpenEditMode(data)
        handleClosePreview()
    }

    const handleDelete = (data) => {
        handleOpenDeleteMode(data)
        handleClosePreview()
    }
    
    return (
        <div className="d-flex flex-column gap-4">

            <div className="panel">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-1">
                        <div className="title-icon">
                            <DocumentTextIcon/>                  
                        </div>

                        <div className="title">
                            Archivos del Paciente
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column align-items-center gap-4">

                <div className='d-flex align-items-center gap-3 w-100'>
                    <SearchBar placeholder='Buscar archivo...' handleSearch={handleSearch}/>

                    <button type="button" className="btn btn-outline-primary width-auto" onClick={handleOpen}>
                        <div className="d-flex align-items-center gap-1">
                            <PlusIcon style={{width: '1.25rem', height:'1.25rem'}}/>
                            <div>
                                Añadir
                            </div>
                        </div>
                    </button>
                </div>

                <Table
                    loading={loading}
                    items={files}
                    columns={[
                        //{ name: "ID", key:"id", ordered: true },
                        { name: "Nombre", key:"name", ordered: true },
                        { name: "Descripción", key:"description", ordered: true },
                        { name: "Última modificación", key:"updatedAt", ordered: true },
                        //{ name: "", key:"buttons", ordered: false },
                    ]}
                    order={order}
                    handleOrder={handleOrder}
                    isPressable={true}
                    handleOnPress={handleOpenPreview}
                    tableHeight={`635px`}
                />

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

export default PatientFiles;