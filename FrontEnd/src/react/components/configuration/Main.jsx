import { TIMEZONES } from '../../constants/constants'
import { useSettingsContext } from '../../components/providers/SettingsProvider'
import { Input } from '../basis'

const Main = () => {
    const { isThemeDark, toggleTheme, experimentalMode, toggleExperimentalMode } = useSettingsContext()

    return (
        <div className='d-flex flex-column gap-3'>
            <div>
                <Input
                    label='Lenguaje'
                    type='select'
                    name='language'
                    options={[
                        { value: 0, label: 'Español' },
                        { value: 1, label: 'Ingles' }
                    ]}
                    disabled={true}
                />
            </div>

            <div>
                <Input
                    label='Zona horaria'
                    type='select'
                    name='timeZone'
                    options={TIMEZONES.map(timeZone => ({ value: timeZone.numeric, label: timeZone.description }))}
                    disabled={true}
                />
            </div>

            <div className='form-check form-switch'>
                <label className='form-check-label'> Modo oscuro </label>
                <input className='form-check-input' type='checkbox' checked={isThemeDark} onChange={toggleTheme}/>
            </div>
            {/*
            <div className='form-check form-switch'>
                <label className='form-check-label'> Modo experimental </label>
                <input className='form-check-input' type='checkbox' checked={experimentalMode} onChange={toggleExperimentalMode}/>
            </div>
            */}
        </div>
    )
}

export default Main