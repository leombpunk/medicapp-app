import { FingerPrintIcon } from "@heroicons/react/24/solid"
import { InputV2, Title, ToggleSeeButton } from "../basis"
import { ArrowPathIcon } from "@heroicons/react/24/outline"
import useProfilePass from "./useProfilePass"
import { useState } from "react"

const ProfilePass = () => {
    const { formManager } = useProfilePass()
    const [seePassword, setSeePassword] = useState(false)

    const toggleSeePassword = () => {
        setSeePassword(see => !see)
    }

    return (
        <>
            <div className="d-flex flex-column gap-4 my-4">
                <Title Icon={FingerPrintIcon} text='Credenciales del Usuario'>
                    <div className='d-flex gap-2'>
                        <button
                            type='button'
                            className={`btn btn-outline-success d-flex gap-1 align-items-center`}
                            onClick={formManager.handleSubmit}
                            title='Cambiar Contraseña'
                        >
                            <ArrowPathIcon style={{ width: '1rem', height: '1rem' }}/>
                            Cambiar Contraseña
                        </button>
                    </div>
                </Title>

                <div className='d-flex flex-column gap-3'>
                    <div className='row'>
                        <div className='col'>
                            <InputV2
                                formManager={formManager}
                                label='Contraseña actual'
                                name='oldPassword'
                                type={seePassword ? 'text' : 'password'}
                                after={<ToggleSeeButton enabled={seePassword} handleSee={toggleSeePassword}/>}
                            />
                        </div>
                        <div className='col'>
                            <InputV2
                                formManager={formManager}
                                label='Contraseña nueva'
                                name='newPassword'
                                type={seePassword ? 'text' : 'password'}
                                after={<ToggleSeeButton enabled={seePassword} handleSee={toggleSeePassword}/>}
                            />
                        </div>
                        <div className='col'>
                            <InputV2
                                formManager={formManager}
                                label='Repetir Contraseña'
                                name='confirmpassword'
                                type={seePassword ? 'text' : 'password'}
                                after={<ToggleSeeButton enabled={seePassword} handleSee={toggleSeePassword}/>}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePass