const ACPatientItemSelected = ({ data }) => {
    return (
        <div className='form-control input-group-text'>
            {`${data.surnames} ${data.names}`}
        </div>
    )
}

export default ACPatientItemSelected
