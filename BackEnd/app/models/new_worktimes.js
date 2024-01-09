import { DataTypes } from "sequelize"
import { sequelize } from "../config/mysql.js"

const NewWorktime = sequelize.define(
    "new_worktimes",
    {
        idProfesional: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        idDay: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false
        }
    }, 
    { timestamps: false }
)

export default NewWorktime