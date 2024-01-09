import { CheckIcon, TrashIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Button, Input, Title } from '../basis'

const ProfesionalData = ({ profesional }) => {
    return (
        <div className='d-flex flex-column gap-3'>
            <Title Icon={UserCircleIcon} text='Datos del Profesional'/>
            <div className='d-flex flex-column gap-3'>

                <div className='row'>
                    <div className='col'>
                        <Input
                            label='Apellidos'
                            name='surnames'
                            type='text'
                            placeholder='Apellidos del profesional'
                            disabled={true}
                            value={profesional.surnames}
                        />
                    </div>

                    <div className='col'>
                        <Input
                            label='Nombres'
                            name='names'
                            type='text'
                            placeholder='Nombres del profesional'
                            disabled={true}
                            value={profesional.names}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <Input
                            label='Correo'
                            name='mail'
                            type='text'
                            placeholder='Correo del profesional'
                            disabled={true}
                            value={profesional.mail}
                        />
                    </div>

                    <div className='col'>
                        <Input
                            label='Teléfono'
                            name='phone'
                            type='text'
                            placeholder='Teléfono del profesional'
                            disabled={true}
                            value={profesional.phone}
                        />
                    </div>
                </div>


                {/*
                <div className='d-flex justify-content-end gap-2'>
                    <Button className='btn-outline-system' Icon={CheckIcon} text='Guardar'/>
                    <Button className='btn-outline-system' Icon={TrashIcon} text='Eliminar'/>
                </div>
                */}
            </div>
        </div>
    )
}

export default ProfesionalData