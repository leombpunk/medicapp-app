import * as yup from "yup"
import patientServices from "../services/patients"
import userServices from "../services/users"

const checkDNI = async (value) => {
  try {
    const response = await patientServices.getPatientByDNI(value)
    return response.data?.id ? false : true
  } catch (error) {
    return true
  }
}

const checkUsername = async (value) => {
  try {
    const response = await userServices.getUserByUsername(value)
    return response.data?.id ? false : true
  } catch (error) {
    return true
  }
}

const checkMail = async (value) => {
  try {
    const response = await userServices.getUserByMail(value)
    return response.data?.id ? false : true
  } catch (error) {
    return true
  }
}

const schemaCreateUser = yup
  .object({
    names: yup
      .string()
      .min(3, "El nombre debe contener mas de 3 caracteres")
      .max(50, "El nombre debe contener menos de 50 caracteres")
      .matches(
        /^[a-zA-zÑñÁáÉéÍíÓóÚú\s]+$/,
        "El nombre debe contener solamente caracteres alfabeticos"
      )
      .required("El nomrbe es requerido"),
    surnames: yup
      .string()
      .min(3, "El apellido debe contener mas de 3 caracteres")
      .max(50, "El apellido debe contener menos de 50 caracteres")
      .matches(
        /^[a-zA-zÑñÁáÉéÍíÓóÚú\s]+$/,
        "El apellido debe contener solamente caracteres alfabeticos"
      )
      .required("El apellido es requerido"),
    mail: yup
      .string()
      .email("El e-mail es incorrecto")
      .min(8, "El email debe tener 8 carateres minimos")
      .max(50, "El email no debe superar los 50 caracteres")
      .test('unique-mail', 'El correo ingresado ya está en uso', checkMail)
      .required("El e-mail es requerido"),
    phone: yup
      .string()
      .min(6, "El telefono debe tener al menos 6 numeros")
      .max(20, "El telefono no debe superar los 20 numeros")
      .matches(/^[+|\d]\d+$/, "El telefono no tiene el formato correcto")
      .notRequired(),
    username: yup
      .string()
      .min(5, "El usuario debe tener 5 carateres minimos")
      .max(16, "El usuario no debe superar los 16 caracteres")
      .matches(/^[a-zA-z0-9]+$/, "El usuario contiene carateres no soportados")
      .test('unique-username', 'El usuario ingresado ya está en uso', checkUsername)
      .required("El nombre de usuario es requerido"),
    password: yup
      .string()
      .min(8, "La contraseña debe tener 8 caracteres minimos")
      .max(16, "La contraseña no debe superar los 16 caracteres")
      .matches(
        /^[a-zA-z0-9]+$/,
        "La contraseña contiene caracteres no soportados"
      )
      .required("La contraseña es requerida"),
    confirmpassword: yup
      .string().oneOf([yup.ref('password'), null], "Las campos no coinciden")
      .required("El campo no puede estar vacio"),
    idRole: yup
      .number()
      .min(1, "El rol seleccionado no es correcto")
      .max(11, "El rol seleccionado no es correcto")
      .required("Debe seleccionar un rol"),
    idCharge: yup
      .number()
      .min(1, "El cargo seleccionado no es correcto")
      .max(11, "El cargo seleccionado no es correcto")
      .required("Debe seleccionar un cargo"),
  })
  .required()

//se puede usar en la del perfil, dudas con rol y nombre de usuario
const schemaUpdateUser = yup
  .object({
    names: yup
      .string()
      .min(3, "El nombre debe contener mas de 3 caracteres")
      .max(50, "El nombre debe contener menos de 50 caracteres")
      .matches(
        /^[a-zA-zÑñÁáÉéÍíÓóÚú\s]+$/,
        "El nombre debe contener solamente caracteres alfabeticos"
      )
      .required("El nomrbe es requerido"),
    surnames: yup
      .string()
      .min(3, "El apellido debe contener mas de 3 caracteres")
      .max(50, "El apellido debe contener menos de 50 caracteres")
      .matches(
        /^[a-zA-zÑñÁáÉéÍíÓóÚú\s]+$/,
        "El apellido debe contener solamente caracteres alfabeticos"
      )
      .required("El apellido es requerido"),
    mail: yup
      .string()
      .email("El e-mail es incorrecto")
      .min(8, "El email debe tener 8 carateres minimos")
      .max(50, "El email no debe superar los 50 caracteres")
      .required("El e-mail es requerido"),
    phone: yup
      .string()
      .min(6, "El telefono debe tener al menos 6 numeros")
      .max(20, "El telefono no debe superar los 20 numeros")
      .matches(/^[+|\d]\d+$/, "El telefono no tiene el formato correcto")
      .notRequired(),
    username: yup
      .string()
      .min(5, "El usuario debe tener 5 carateres minimos")
      .max(16, "El usuario no debe superar los 16 caracteres")
      .matches(/^[a-zA-z0-9]+$/, "El usuario contiene carateres no soportados")
      .required("El nombre de usuario es requerido"),
    idRole: yup
      .number()
      .min(1, "El rol seleccionado no es correcto")
      .max(11, "El rol seleccionado no es correcto")
      .required("Debe seleccionar un rol"),
    idCharge: yup
      .number()
      .min(1, "El cargo seleccionado no es correcto")
      .max(11, "El cargo seleccionado no es correcto")
      .required("Debe seleccionar un cargo"),
  })
  .required()

//se puede usar en la del perfil, dudas con rol y nombre de usuario
const schemaUpdateProfile = yup
.object({
  names: yup
    .string()
    .min(3, "El nombre debe contener mas de 3 caracteres")
    .max(50, "El nombre debe contener menos de 50 caracteres")
    .matches(
      /^[a-zA-zÑñÁáÉéÍíÓóÚú\s]+$/,
      "El nombre debe contener solamente caracteres alfabeticos"
    )
    .required("El nombre es requerido"),
  surnames: yup
    .string()
    .min(3, "El apellido debe contener mas de 3 caracteres")
    .max(50, "El apellido debe contener menos de 50 caracteres")
    .matches(
      /^[a-zA-zÑñÁáÉéÍíÓóÚú\s]+$/,
      "El apellido debe contener solamente caracteres alfabeticos"
    )
    .required("El apellido es requerido"),
  mail: yup
    .string()
    .email("El e-mail es incorrecto")
    //.min(8, "El email debe tener 8 carateres minimos")
    .max(50, "El email no debe superar los 50 caracteres")
    .required("El e-mail es requerido"),
  phone: yup
    .string()
    .min(6, "El telefono debe tener al menos 6 numeros")
    .max(20, "El telefono no debe superar los 20 numeros")
    .matches(/^[+|\d]\d+$/, "El telefono no tiene el formato correcto")
    .notRequired(),
  username: yup
    .string()
    .min(5, "El usuario debe tener 6 carateres minimos")
    .max(16, "El usuario no debe superar los 16 caracteres")
    .matches(/^[a-zA-z0-9]+$/, "El usuario contiene carateres no soportados")
    .required("El nombre de usuario es requerido"),
  idCharge: yup
    .number()
    .min(1, "El cargo seleccionado no es correcto")
    .max(11, "El cargo seleccionado no es correcto")
    .required("Debe seleccionar un cargo"),
})
.required()

const schemaUpdateUserPass = yup
  .object({
    oldPassword: yup
      .string()
      .min(8, "La contraseña debe tener 8 caracteres minimos")
      //.max(16, "La contraseña no debe superar los 16 caracteres")
      //.matches(
      //  /^[a-zA-z0-9]+$/,
      //  "La contraseña contiene caracteres no soportados"
      //)
      .required("La contraseña es requerida"),
    newPassword: yup
      .string()
      .min(8, "La contraseña debe tener 8 caracteres minimos")
      //.max(16, "La nueva contraseña no debe superar los 16 caracteres")
      //.matches(
      //  /^[a-zA-z0-9]+$/,
      //  "La nueva contraseña contiene caracteres no soportados"
      //)
      .required("La nueva contraseña es requerida"),
    confirmpassword: yup
      .string().oneOf([yup.ref('newPassword'), null], "Las campos no coinciden")
      .required("El campo no puede estar vacio"),
  })
  .required()

const schemaPatient = yup
  .object({
    names: yup
      .string()
      .min(3, "El nombre debe contener mas de 3 caracteres")
      //.max(50, "El nombre debe contener menos de 50 caracteres")
      .matches(
        /^[a-zA-zÑñÁáÉéÍíÓóÚú\s]+$/,
        "El nombre debe contener solamente caracteres alfabeticos"
      )
      .required("El nomrbe es requerido"),
    surnames: yup
      .string()
      .min(3, "El apellido debe contener mas de 3 caracteres")
      //.max(50, "El apellido debe contener menos de 50 caracteres")
      .matches(
        /^[a-zA-zÑñÁáÉéÍíÓóÚú\s]+$/,
        "El apellido debe contener solamente caracteres alfabeticos"
      )
      .required("El apellido es requerido"),
    dni: yup
      .string()
      .min(7, "El DNI debe tener una longitud mayor a 6 dígitos")
      //.max(8, "El DNI debe tener una longitud menor a 9 dígitos")
      .matches(/^[1-9][0-9]*$/, "El DNI no tiene el formato correcto")
      .required("El DNI es requerido")
      .test('unique-dni', 'El DNI ingresado ya ha sido registrado', checkDNI),
    birthdate: yup
      .date()
      .nullable().typeError("La fecha ingresada no es válida.")
      .required("La fecha de nacimiento es requerida"),
    phone: yup
      .string()
      //.min(6, "El telefono debe tener al menos 6 numeros")
      .max(20, "El telefono no debe superar los 20 numeros")
      .matches(/^[+|\d]\d+$/, "El telefono no tiene el formato correcto")
      .notRequired(),
    address: yup
      .string()
      //.min(5, "La dirección debe tener 5 o mas caracteres")
      .max(150, "La dirección no debe superar los 150 caracteres")
      //.matches(
      //  /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s\r\n.,]*$/,
      //  "La dirección no tiene el formato correcto"
      //)
      .nullable()
      .notRequired(),
  })
  .required()

  const schemaPatientEdit = yup
  .object({
    names: yup
      .string()
      .min(3, "El nombre debe contener mas de 3 caracteres")
      //.max(50, "El nombre debe contener menos de 50 caracteres")
      .matches(
        /^[a-zA-zÑñÁáÉéÍíÓóÚú\s]+$/,
        "El nombre debe contener solamente caracteres alfabeticos"
      )
      .required("El nomrbe es requerido"),
    surnames: yup
      .string()
      .min(3, "El apellido debe contener mas de 3 caracteres")
      //.max(50, "El apellido debe contener menos de 50 caracteres")
      .matches(
        /^[a-zA-zÑñÁáÉéÍíÓóÚú\s]+$/,
        "El apellido debe contener solamente caracteres alfabeticos"
      )
      .required("El apellido es requerido"),
    dni: yup
      .string()
      .min(7, "El DNI debe tener una longitud mayor a 6 dígitos")
      //.max(8, "El DNI debe tener una longitud menor a 9 dígitos")
      .matches(/^[1-9][0-9]*$/, "El DNI no tiene el formato correcto")
      .required("El DNI es requerido"),
    birthdate: yup
      .date()
      .nullable().typeError("La fecha ingresada no es válida.")
      .required("La fecha de nacimiento es requerida"),
    phone: yup
      .string()
      //.min(6, "El telefono debe tener al menos 6 numeros")
      .max(20, "El telefono no debe superar los 20 numeros")
      .matches(/^[+|\d]\d+$/, "El telefono no tiene el formato correcto")
      .notRequired(),
    address: yup
      .string()
      //.min(5, "La dirección debe tener 5 o mas caracteres")
      .max(150, "La dirección no debe superar los 150 caracteres")
      //.matches(
      //  /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s\r\n.,]*$/,
      //  "La dirección no tiene el formato correcto"
      //)
      .nullable()
      .notRequired(),
  })
  .required()

const schemaCharge = yup
  .object({
    description: yup
      .string()
      .min(3, "La descripción del cargo debe contener más de 3 caracteres")
      .max(20, "La descripción del cargo acepta hasta 20 caracteres")
      //.matches(
      //  /^[a-zA-zÑñÁáÉéÍíÓóÚú\s]+$/,
      //  "La descripción del cargo contiene caracteres no soportados"
      //)
      .required(),
  })
  .required()

const schemaNotes = yup
.object({
  content: yup
    .string()
    .required("El contenido de la nota no puede estar vacío")
})
.required()

const schemaTreatment = yup
.object({
  description: yup
    .string()
    .required("La descripción no puede estar vacía")
})
.required()

const schemaTurns = yup
  .object({
    patient: yup
      .object()
      .shape({
        id: yup.string().required("El paciente ingresado no es válido"),
      }),
    date: yup.string().required("Fecha requerida"),
    time: yup.string().required("Horario requerido"),
    duration: yup.string().required("Duración del turno requerida"),
    description: yup
      .string()
      .max(300, "La descripción es demasiado larga")
      //.matches(
      //  /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s\r\n]*$/,
      //  "La descripcion contiene caracteres no soportados"
      //)
      .nullable()
      .notRequired(),
  })
  .required()

const schemaReminders = yup
  .object({
  patient: yup
    .object({
      id: yup.string()//.required("El paciente ingresado no es válido"),
    }).notRequired(),
    date: yup.string().required("Fecha requerida"),
    time: yup.string().required("Horario requerido"),
    description: yup
      .string()
      .max(300, "La descripción es demasiado larga")
      //.matches(
      //  /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s\r\n]*$/,
      //  "La descripcion contiene caracteres no soportados"
      //)
      .nullable()
      .notRequired(),
  })
  .required()

const schemaExceptions = yup
  .object({
    startDate: yup.string().required("Fecha de inicio requerida"),
    startTime: yup.string().required("Hora de inicio requerida"),
    endDate: yup.string().required("Fecha de fin requerida"),
    endTime: yup.string().required("Hora de fin requerida"),
    description: yup
      .string()
      .max(300, "La descripción es demasiado larga")
      //.matches(
      //  /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s\r\n]*$/,
      //  "La descripcion contiene caracteres no soportados"
      //)
      .nullable()
      .notRequired(),
  })
  .required()

const schemaResetPassword = yup
  .object({
    mail: yup
      .string()
      .email("El correo no es válido")
      .required("El correo no puede estar vacio"),
  })
  .required()

export {
  schemaCreateUser,
  schemaUpdateUser,
  schemaUpdateProfile,
  schemaCharge,
  schemaPatient,
  schemaPatientEdit,
  schemaExceptions,
  schemaReminders,
  schemaTurns,
  schemaUpdateUserPass,
  schemaTreatment,
  schemaNotes,
  schemaResetPassword
}