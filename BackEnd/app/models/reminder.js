import { DataTypes, Op } from "sequelize"
import { sequelize } from "../config/mysql.js"
import Patient from "./patient.js"

const Reminder = sequelize.define(
    "reminders",
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
            allowNull: true,
            references: {
                model: Patient,
                key: 'id'
            }
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
)

Reminder.belongsTo(
    Patient,{
        foreignKey: "idPatient",
        as: "patient"
    }
)

Reminder.getByID = (id) => {
    return Reminder.findOne({
        where: { id },
        include: ["createdByUser", "modifiedByUser", "profesional", "patient"]
    })
}

Reminder.getByProfesionalID = (idProfesional, startTime, endTime) => {
    return Reminder.findAll({ 
        where: { 
            idProfesional,
            dateTime: { [Op.between]: [startTime, endTime] }
        },
        include: ["createdByUser", "modifiedByUser", "profesional", "patient"]
    })
}

Reminder.getPage = async ({ page, order, startTime, endTime }) => {
    const limit = 100
    const offset = limit * (page ? page : 0)
    const where = {}

    if (startTime) {
        where.dateTime = { [Op.gte]: startTime }
    }

    if (endTime) {
        where.dateTime = { ...where['dateTime'], [Op.lte]: endTime }
    }
    
    const { count, rows } = await Reminder.findAndCountAll({
        offset,
        limit,
        where,
        include: ['profesional', 'patient'],
        order: [ order ]
    })

    return {
        total_pages: Math.ceil(count / limit),
        results: rows 
    }
}

export default Reminder