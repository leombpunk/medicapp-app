import { DataTypes, Op, Sequelize } from "sequelize"
import { sequelize } from "../config/mysql.js"
import File from "./file.js"
import Note from "./note.js"

const Patient = sequelize.define(
    "patients",
    {
        names: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surnames: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATEONLY
        },
        phone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        }
    }, 
    { timestamps: false }
)

Patient.hasMany(
    File,{
        foreignKey: "idPatient"
    }
)

File.belongsTo(
    Patient,{
        foreignKey: "id",
        as: "file"
    }
)

Patient.hasMany(
    Note,{
        foreignKey: "idPatient"
    }
)

Note.belongsTo(
    Patient,{
        foreignKey: "id",
        as: "note"
    }
)


Patient.getByID = (id) => {
    return Patient.findOne({ where: { id } })
}

Patient.getByDNI = (dni) => {
    return Patient.findOne({ where: { dni } })
}

Patient.getPage = async ({ search, page, order, idProfesional, idTreatment }) => {
    const limit = 100
    const offset = limit * (page ? page : 0)

    const where = {
        [Op.or]: [
            Sequelize.where(
                Sequelize.fn('concat', Sequelize.col('surnames'), ' ', Sequelize.col('names')), {
                    [Op.like]: `%${search}%`
                }
            ),
            {
                dni: {
                    [Op.like]: `%${search}%`
                }
            }
        ],
    }

    if (idProfesional) {
        const query = `
            select distinct idPatient
            from turns
            where turns.idProfesional = ${idProfesional}
            ${idTreatment ? `and turns.idTreatment = ${idTreatment}`  : ''}
        `
        const [results] = await sequelize.query(query)
        const patients = results.map(row => row.idPatient)
        where.id = patients
    }

    const { count, rows } = await Patient.findAndCountAll({
        offset,
        limit,
        where,
        order: [ order ]
    })

    return {
        total_pages: Math.ceil(count / limit),
        results: rows 
    }
}

Patient.getFilePage = async (idPatient, search, page, order, storage) => {
    const limit = 10
    const offset = limit * (page ? page : 0)
    
    const { count, rows } = await File.findAndCountAll({
        offset,
        limit,
        where: { name: { [Op.like]: `%${search}%` } ,idPatient, type: { [Op.not]: 'image' }, storage },
        order: [ order ]
    })

    return {
        total_pages: Math.ceil(count / limit),
        results: rows 
    }
}

Patient.getPhotoPage = async (idPatient, search, page, order, storage) => {
    const limit = 10
    const offset = limit * (page ? page : 0)
    const type = 'image'
    
    const { count, rows } = await File.findAndCountAll({
        offset,
        limit,
        where: { name: { [Op.like]: `%${search}%` }, idPatient, type, storage },
        order: [ order ]
    })

    return {
        total_pages: Math.ceil(count / limit),
        results: rows 
    }
}

Patient.getNotePage = async (idPatient, search, page, order) => {
    const limit = 100
    const offset = limit * (page ? page : 0)
    
    const { count, rows } = await Note.findAndCountAll({
        offset,
        limit,
        where: {
            //content: { [Op.like]: `%${search}%` },
            idPatient         
        },
        order: [ order ]
    })

    return {
        total_pages: Math.ceil(count / limit),
        results: rows 
    }
}

Patient.getStats = (idProfesional) => {
    const query = `
        select year(turns.dateTime) as year, month(turns.dateTime) as month, count(distinct idPatient) as patients
        from turns
        where idProfesional = ${Number(idProfesional)}
        group by year(dateTime), month(dateTime)
        order by year desc, month asc
    `
    return sequelize.query(query)
}

export default Patient