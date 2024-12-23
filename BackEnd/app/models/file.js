import { DataTypes } from "sequelize"
import { sequelize } from "../config/mysql.js"

const File = sequelize.define(
    "files",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        storage: {
            type: DataTypes.ENUM('local','cloud'),
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
)

File.getByID = (id) => {
    return File.findOne({ where: { id } })
}

export default File