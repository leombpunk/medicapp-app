import { DataTypes, Op, Sequelize } from "sequelize"
import { sequelize } from "../config/mysql.js"
import Charge from "./charge.js"
import Exception from "./exception.js"
import Role from "./role.js"
import Turn from "./turn.js"
import Reminder from "./reminder.js"
import Workday from "./workday.js"
import Worktime from "./worktimes.js"
import NewWorktime from "./new_worktimes.js"
import Day from "./day.js"
import Treatment from "./treatment.js"

const User = sequelize.define(
    "users",
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        names : {
            type: DataTypes.STRING,
            allowNull: true
        },
        surnames : {
            type: DataTypes.STRING,
            allowNull: true
        },
        mail : {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone : {
            type: DataTypes.STRING,
            allowNull: true
        },
        idRole: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idCharge: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, 
    { 
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: {
                attributes: {},
            }
        },
        timestamps: false
    }
)

/* ----------- */
Turn.belongsTo(
    User,{
        foreignKey: "createdBy",
        as: "createdByUser"
    }
)

Turn.belongsTo(
    User,{
        foreignKey: "modifiedBy",
        as: "modifiedByUser"
    }
)

Turn.belongsTo(
    User,{
        foreignKey: "idProfesional",
        as: "profesional"
    }
)

Reminder.belongsTo(
    User,{
        foreignKey: "createdBy",
        as: "createdByUser"
    }
)

Reminder.belongsTo(
    User,{
        foreignKey: "modifiedBy",
        as: "modifiedByUser"
    }
)

Reminder.belongsTo(
    User,{
        foreignKey: "idProfesional",
        as: "profesional"
    }
)


Exception.belongsTo(
    User,{
        foreignKey: "createdBy",
        as: "createdByUser"
    }
)

Exception.belongsTo(
    User,{
        foreignKey: "modifiedBy",
        as: "modifiedByUser"
    }
)

Exception.belongsTo(
    User,{
        foreignKey: "idProfesional",
        as: "profesional"
    }
)

/* ----------- */
User.hasMany(
    Turn,{
        foreignKey: "idProfesional"
    }
)

User.hasMany(
    Exception,{
        foreignKey: "idProfesional"
    }
)

Workday.belongsTo(
    User,{
        foreignKey: "id",
        as: "profesional"
    }
)

User.hasMany(
    Workday,{
        foreignKey: "idProfesional",
        as: "workdays"
    }
)

User.hasMany(
    NewWorktime,{
        foreignKey: "idProfesional",
        as: "worktimes"
    }
)

/* ----------- */

User.belongsTo(
    Role, {
        foreignKey: "idRole"
    }
)


User.belongsTo(
    Charge, {
        foreignKey: "idCharge"
    }
)

/* ----------- */

User.hasMany(
    Treatment, {
        foreignKey: "idProfesional",
        as: "treatments"
    }
)

Treatment.belongsTo(
    User, {
        foreignKey: "idProfesional",
        as: "profesional"
    }
)

/* ----------- */

User.getByID = (id) => {
    return User.findOne({
        where: { id }, 
        include: [{ model: Charge }, { model: Role }]
    })
}

User.getByUsername = (username) => {
    return User.scope('withPassword').findOne({
        where: { username },
        include: [{ model: Role }, { model: Charge }]
    })
}

User.getByMail = (mail) => {
    return User.findOne({
        where: { mail },
        include: [{ model: Charge }, { model: Role }]
    })
}

User.getByUsernameOrMail = (data) => {
    return User.scope('withPassword').findOne({
        where: {
            isDeleted: 0, 
            [Op.or]: [
                {
                    username: data,
                },
                {
                    mail: data
                }
            ]
        },
        include: [{ model: Role }, { model: Charge }]
    })
}

User.getProfesionals = async () => {
    /*
    return User.findAll({where: { idRole: 1 }, include: [
        { model: Turn, include: ["patient"], as: "turns"},
        { model: Exception, as: "exceptions"}, 
        { model: Workday, include: ["worktimes"], as: "workdays"}
    ]})
    */
    // return User.findAll({where: { idRole: 1 }}) //linea original
    return User.findAll({where: { idRole: 1 }, include: [
        { model: Workday, required: true, where: { enabled: 1 }, as: "workdays"},
    ]})
    //incluir a la consulta para traer solo los profesionales con la agenda configurada y por lo menos un dia activo
    // include: [
    //     { model: Workday, required: true, where: { enabled: 1 }, as: "workdays"},
    // ]
}

User.getProfesionalPage = async (search, page, order) => {
    const limit = 100
    const offset = limit * (page ? page : 0)
    
    const { count, rows } = await User.findAndCountAll({
        offset,
        limit,
        where: {
            idRole: 1,
            [Op.or]: [
                Sequelize.where(
                    Sequelize.fn('concat', Sequelize.col('surnames'), ' ', Sequelize.col('names')), {
                        [Op.like]: `%${search}%`
                    }
                ),
                {
                    username: {
                        [Op.like]: `%${search}%`
                    }
                }
            ]            
        },
        order: [ order ],
        include: []
    })

    return {
        total_pages: Math.ceil(count / limit),
        results: rows 
    }
}

User.getProfesionalByID = (id) => {
    return User.findOne({where: { id, idRole: 1 }, include: [
        //{ model: Turn, include: ["patient"], as: "turns"},
        //{ model: Exception, as: "exceptions"}, 
        //{ model: Workday, include: ["worktimes"], as: "workdays" },
        { model: NewWorktime, as: 'worktimes' },
    ]})
}

//retorna los dias y sus franjas horarias (inner join)
User.getProfesionalByIdV1 = (id) => {
    return User.findOne({ where: { id, idRole: 1 }, include: [
        { model: Workday, required: false, include: [{ model: Worktime, required: false}, { model: Day, required: true }], as: "workdays"}, //
    ]})
}

//retorna los dias y sus franjas horarias (inner join) -> solo habilitados
User.getProfesionalByIdV2 = (id) => {
    return User.findOne({ where: { id, idRole: 1 }, include: [
        { model: Workday, required: true, include: { model: Worktime, required: true}, as: "workdays", where: { enabled: 1 }}, //
    ]})
}

//da igual si no estan habilitados
User.getProfesionalByIdV3 = (id) => {
    return User.findOne({ where: { id, idRole: 1 }, include: [
        { model: Workday, required: true, include: { model: Worktime, required: true}, as: "workdays"}, //
    ]})
}

User.getAllScheduleConfig = async (search, page, order) => {
    const limit = 100
    const offset = limit * (page ? page : 0)
    
    const { count, rows } = await User.findAndCountAll({
        offset, 
        limit,
        where: {
            idRole : 1,
            fullName: Sequelize.where(
                Sequelize.fn('concat', Sequelize.col('surnames'), ' ', Sequelize.col('names')), {
                    [Op.like]: `%${search}%`
                }
            ),
            //isDeleted: 0,
        },
        order: [ order ],
        include: [
            // { model: Workday, required: false, include: { model: Worktime, required: false}, as: "workdays"},
            // { model: Workday, required: false, where: { enabled: 1 }, as: "workdays"},
            { model: NewWorktime, required: false, as: "worktimes" },
        ],
        distinct: true
    })

    return {
        total_pages: Math.ceil(count / limit),
        results: rows 
    }
}

User.getPage = async (search, page, order) => {
    const limit = 100
    const offset = limit * (page ? page : 0)
    
    const { count, rows } = await User.findAndCountAll({
        offset,
        limit,
        where: {
            fullName: Sequelize.where(
                Sequelize.fn('concat', Sequelize.col('surnames'), ' ', Sequelize.col('names')), {
                    [Op.like]: `%${search}%`
                }
            ),
            //isDeleted: 0,
        },
        order: [ order ],
        include: [Charge, Role]
    })

    return {
        total_pages: Math.ceil(count / limit),
        results: rows 
    }
}

export default User