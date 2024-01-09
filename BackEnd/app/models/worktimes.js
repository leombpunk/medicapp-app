import { DataTypes } from "sequelize"
import { sequelize } from "../config/mysql.js"

const Worktime = sequelize.define(
    "worktimes",
    {
        idWorkday: {
            type: DataTypes.INTEGER,
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

export default Worktime