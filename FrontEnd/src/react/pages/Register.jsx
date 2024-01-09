import { RoutesNavigation } from '../constants/RoutesNavigation'
import { InputV2, ToggleSeeButton } from '../components/basis'
import { useCharges, useRegister } from '../components/hooks'
import { Link } from 'react-router-dom'

const Register = () => {
    const { charges } = useCharges()
    const { loading, formManager, seePassword, toggleSeePassword } = useRegister()

    const required = { value: true, message: 'El campo es obligatorio'}
    const minLength = { value: 8, message: 'El campo debe tener como mínimo 8 caracteres'}

    const coincidence = () => {
        const password = formManager.getValues('password')
        const passwordConfirm = formManager.getValues('passwordConfirm')
        return password === passwordConfirm || 'Las datos no coinciden'
    }

    return (
        <>
             <div className='d-flex'>
                <div className='d-flex justify-content-center align-items-center card border' style={{ width: '400px', height: '100vh', borderWidth: 0, borderRadius: 0 }}>
                
                    <div className='d-flex flex-column gap-4'>

                        <div className='row'>
                            <InputV2
                                formManager={formManager}
                                label='Apellidos'
                                name='surnames'
                                type='text'
                                placeholder=''
                                errors={{}}
                            />
                        </div>

                        <div className='row'>
                            <InputV2
                                formManager={formManager}
                                label='Nombres'
                                name='names'
                                type='text'
                                placeholder=''
                                errors={{}}
                            />
                        </div>

                        <div className='row'>
                            <InputV2
                                formManager={formManager}
                                label='Nombre de usuario'
                                name='username'
                                type='text'
                                errors={{ required }}
                            />
                        </div>

                        <div className='row'>
                            <InputV2
                                formManager={formManager}
                                label='Cargo'
                                name='charge'
                                type='select'
                                options={charges.map(charge => {return { value: charge.id, label: charge.description }})}
                                errors={{}}
                            />
                        </div>

                        <div className='row'>
                            <InputV2
                                formManager={formManager}
                                label='Contraseña'
                                after={<ToggleSeeButton enabled={seePassword} handleSee={toggleSeePassword}/>}
                                name='password'
                                type={seePassword ? 'text' : 'password'}
                                placeholder=''
                                errors={{ required, minLength }}
                            />
                        </div>

                        <div className='row'>
                            <InputV2
                                formManager={formManager}
                                label='Confirmar contraseña'
                                after={<ToggleSeeButton enabled={seePassword} handleSee={toggleSeePassword}/>}
                                name='passwordConfirm'
                                type={seePassword ? 'text' : 'password'}
                                placeholder=''
                                errors={{ required, minLength, validate: coincidence }}
                            />
                        </div>

                        <button className='btn btn-primary' disabled={loading} onClick={formManager.handleSubmit}>
                            {
                                loading 
                                ? <div className='spinner-border' style={{width: '1rem', height: '1rem', borderWidth: '0.2rem'}}></div>
                                : <div>Registrarse</div>
                            }
                        </button>

                        <div className='d-flex justify-content-center'>
                            <Link to={RoutesNavigation.Login} className='text-primary'>Iniciar Sesión</Link>
                        </div>

                    </div>
                </div>
                <div className='login-page' style={{ width: 'calc(100%)', filter: 'blur(0.2rem)' }}></div>     
            </div>
        </>
    )
}

export default Register
