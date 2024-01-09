import { DataTypes, Op } from "sequelize"
import { sequelize } from "../config/mysql.js"

const Exception = sequelize.define(
    "exceptions",
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
            allowNull: true
        },
        startDateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
)

Exception.getByID = (id) => {
    return Exception.findOne({where: { id }, include: ["createdByUser", "modifiedByUser", "profesional"]})
}

Exception.getByProfesionalID = (idProfesional, startTime, endTime) => {
    return Exception.findAll({ 
        where: { 
            idProfesional,
            startDateTime: { [Op.lte]: endTime },
            endDateTime: { [Op.gte]: startTime }
        },
        include: ["createdByUser", "modifiedByUser", "profesional"]
    })
}

export default Exception