import { DataTypes, Op } from 'sequelize'
import { sequelize } from '../config/mysql.js'
import Patient from './patient.js'
import Treatment from './treatment.js'

const Turn = sequelize.define(
    'turns',
    {
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        modifiedBy: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        idProfesional: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idPatient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Patient,
                key: 'id'
            }
        },
        idTreatment: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        duration: {
            type: DataTypes.TIME,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }
)

Turn.belongsTo(
    Patient,{
        foreignKey: 'idPatient',
        as: 'patient'
    }
)

Treatment.hasMany(
    Turn,{
        foreignKey: 'idTreatment'
    }
)

Turn.belongsTo(
    Treatment,{
        foreignKey: 'idTreatment',
        as: 'treatment'
    }
)

Turn.getByID = (id) => {
    return Turn.findOne({
        where: { id },
        include: ['createdByUser', 'modifiedByUser', 'profesional', 'patient', 'treatment']
    })
}

Turn.getByProfesionalID = (idProfesional, startTime, endTime) => {
    return Turn.findAll({ 
        where: { 
            idProfesional,
            dateTime: { [Op.between]: [startTime, endTime] }
        },
        include: ['createdByUser', 'modifiedByUser', 'profesional', 'patient', 'treatment']
    })
}

Turn.geByPatientID = (idPatient) => {
    return Turn.findAll({ 
        where: { idPatient },
        include: ['createdByUser', 'modifiedByUser', 'profesional', 'patient', 'treatment'],
        order: [ order ]
    })
}

Turn.getPage = async ({ idPatient, idProfesional, idTreatment, page, status, order, startTime, endTime, rows }) => {
    const limit = rows || 100
    const offset = limit * (page > 0 ? page : 0)

    const where = {}

    if (idPatient !== undefined && idPatient !== '') {
        where.idPatient = idPatient
    }
    
    if (idProfesional !== undefined && idProfesional !== '') {
        where.idProfesional = idProfesional
    }

    if (idTreatment !== undefined && idTreatment !== '') {
        where.idTreatment = idTreatment
    }

    if (status !== undefined && status !== '') {
        where.status = status
    }
    
    if (startTime) {
        where.dateTime = { [Op.gte]: startTime }
    }

    if (endTime) {
        where.dateTime = { ...where['dateTime'], [Op.lte]: endTime }
    }
    
    const { count, rows: results } = await Turn.findAndCountAll({ 
        offset,
        limit,
        where,
        include: ['createdByUser', 'modifiedByUser', 'profesional', 'patient', 'treatment'],
        order: [ order ]
    })

    return {
        total_pages: Math.ceil(count / limit),
        results 
    }
}

//pa la home
Turn.getPageHome = async (searchDate, searchProfesional, page, order) => {
    const limit = 100
    const offset = limit * (page ? page : 0)
    
    const { count, rows } = await Turn.findAndCountAll({
        offset,
        limit,
        where: {
            [Op.and]: [
              sequelize.where(
                sequelize.fn("date", sequelize.col("dateTime")),
                "=",
                searchDate
              ),
              searchProfesional && searchProfesional > 0 && { idProfesional: searchProfesional }
            ].filter(Boolean), // Filtrar elementos falsy para excluir condiciones undefined o null
        },
        include: ["profesional", "patient", "treatment"],
        order: [ order ]
    })

    return {
        total_pages: Math.ceil(count / limit),
        results: rows 
    }
}

export default Turn