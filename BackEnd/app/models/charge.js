import { DataTypes, Sequelize, Op } from "sequelize"
import { sequelize } from "../config/mysql.js"

const Charge = sequelize.define(
    "charges",
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    { timestamps: false }
)

Charge.getPage = async (search, page, order) => {
    const limit = 100
    const offset = limit * (page ? page : 0)
    
    const { count, rows } = await Charge.findAndCountAll({
        offset,
        limit,
        where: {
            description: { [Op.like]: `%${search}%` }         
        },
        order: [ order ]
    })

    return {
        total_pages: Math.ceil(count / limit),
        results: rows 
    }
}

export default Charge