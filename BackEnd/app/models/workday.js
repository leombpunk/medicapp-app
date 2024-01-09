import { DataTypes } from "sequelize"
import { sequelize } from "../config/mysql.js"
import Worktime from "./worktimes.js"
import Day from "./day.js"

const Workday = sequelize.define(
    "workdays",
    {
        idProfesional: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idDay: {
            type: DataTypes.STRING,
            allowNull: false
        },
        enabled: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    { timestamps: false }
)

Worktime.belongsTo(
    Workday, {
        foreignKey: "id"
    }
)

Workday.hasMany(
    Worktime, {
        foreignKey: "idWorkday"
    }
)

Workday.belongsTo(
    Day, {
        foreignKey: "idDay"
    }
)

Workday.getByProfesionalID = (idProfesional) => {
    return Workday.findAll({where: { idProfesional }, include: ["worktimes"]})
}

Workday.getByProfesionalIdV2 = (idProfesional) => {
    return Workday.findAll({where: { idProfesional }, include: ["worktimes"], required: true})
}

export default Workday