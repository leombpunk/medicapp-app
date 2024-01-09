import { DataTypes } from "sequelize"
import { sequelize } from "../config/mysql.js"

const Day = sequelize.define(
    'days',
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, 
    { timestamps: false }
)

export default Day