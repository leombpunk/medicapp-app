import { DataTypes, Op } from 'sequelize'
import { sequelize } from '../config/mysql.js'

const Treatment = sequelize.define(
    'treatments',
    {
        idProfesional: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    { timestamps: false }
)

Treatment.getPage = async ({ search, page, order, idProfesional }) => {
    const limit = 10
    const offset = limit * (page ? page : 0)
    
    const { count, rows } = await Treatment.findAndCountAll({
        offset,
        limit,
        where: {
            idProfesional,
            description: {
                [Op.like]: `%${search}%`
            }   
        },
        order: [ order ],
        include: [ "profesional" ]
    })

    return {
        total_pages: Math.ceil(count / limit),
        results: rows 
    }
}
/*
Treatment.geByPatientID = async (idPatient, order) => {
    const turns = await Turn.findAll({ where: { idPatient }, raw: true })
    const treatmentsOfPatient = turns.map(turn => turn.idTreatment)

    return await Treatment.findAll({ 
        where: {
            id: treatmentsOfPatient
        },
        order: [ order ]
    })
}
*/
export default Treatment