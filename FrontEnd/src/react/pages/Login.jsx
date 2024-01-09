import { useState } from 'react'
import { Button, InputV2, ToggleSeeButton } from '../components/basis'
import useLogin from '../components/hooks/useLogin'
import { useResetPassword } from '../components/hooks'

const Login = () => {
    const [mode, setMode] = useState(false)
    const { loading, formManager, seePassword, toggleSeePassword } = useLogin()
    const { isLoading: isLoadingReset, formManager: formReset, isConfirmed: isConfirmedReset } = useResetPassword()
    const required = { value: true, message: 'El campo no puede estar vacío' }

    const toggleMode = () => {
        setMode(mode => !mode)
    }

    return (
        <>
            <div className='d-flex'>
                <div
                    className='d-flex justify-content-center align-items-center card'
                    style={{ width: '500px', height: '100vh', borderWidth: 0, borderRadius: 0 }}
                >
                    {
                        !mode
                        ? <>
                            <div className='p-4 d-flex flex-column gap-4'>
                                <div className='row'>
                                    <InputV2
                                        formManager={formManager}
                                        label='Usuario o Correo'
                                        name='user'
                                        type='text'
                                        errors={{ required }}
                                    />
                                </div>
                                
                                <div className='row'>
                                    <InputV2
                                        formManager={formManager}
                                        label='Contraseña'
                                        name='password'
                                        after={<ToggleSeeButton enabled={seePassword} handleSee={toggleSeePassword}/>}
                                        type={seePassword ? 'text' : 'password'}
                                        errors={{ required }}
                                    />
                                </div>

                                <Button
                                    className='btn-primary'
                                    text='Iniciar Sesión'
                                    isLoading={loading}
                                    isDisabled={loading}
                                    handleOnClick={formManager.handleSubmit}
                                />

                                <div className='d-flex justify-content-center'>
                                    <div className='text-primary cursor-pointer' onClick={toggleMode}>¿Olvido su contraseña?</div>
                                </div>
                            </div>
                        </>
                        : <>
                            <div className='p-4 d-flex flex-column gap-4'>
                                {
                                    !isConfirmedReset
                                    ? <>
                                        <div className='row'>
                                            <InputV2
                                                formManager={formReset}
                                                label='Correo'
                                                name='mail'
                                                placeholder='Escriba su correo aquí'
                                                type='text'
                                            />
                                        </div>

                                        <Button
                                            className='btn-primary'
                                            text='Reiniciar contraseña'
                                            isLoading={isLoadingReset}
                                            isDisabled={isLoadingReset}
                                            handleOnClick={formReset.handleSubmit}
                                        />
                                    </>
                                    : <>
                                        <div>
                                            Se le ha enviado un correo con su nueva contraseña.
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <div className='text-primary cursor-pointer' onClick={toggleMode}>Volver</div>
                                        </div>
                                    </>
                                }

                            </div>
                        </>
                    }

                </div>
                <div className='login-page' style={{ width: 'calc(100%)', filter: 'blur(0.2rem)' }}></div>     
            </div>       
        </>
    )
}

export default Login