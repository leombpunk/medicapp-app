import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const ToggleSeeButton = ({enabled, handleSee}) => {
    return (
        <button style={{ padding: 0, margin: 0, background: 'none', border: 0 }} onClick={handleSee}>
            {
                enabled
                ? <EyeIcon style={{ width: '1.5rem' }}/>
                : <EyeSlashIcon style={{ width: '1.5rem' }}/>
            }
        </button>
    )
}

export default ToggleSeeButton