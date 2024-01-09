import pool from "../database/database.js"

class Schedule {
    static async getAll() {
        const sql = `select * from pacientes`
        const [admins, _] = await pool.execute(sql)
        return admins
    }

    static async getByID(id) {
        const sql = `select * from administradores where id = ${id}`
        const [admins, _] = await pool.execute(sql)
        return admins[0]
    }

    static async getByUsername(username) {
        const sql = `select * from administradores where username = "${username}"`
        const [admins, _] = await pool.execute(sql)
        return admins[0]
    }
}

//consulta de configurar agenda
/*  -- retorna los dias y sus franjas horarias de un profesional (solo los dias de trabajo habilidatos)
SELECT u.id, u.username, wd.idDay, d.description, wt.startTime, wt.endTime, wd.enabled 
FROM users AS u
INNER JOIN workdays AS wd ON u.id = wd.idProfesional
INNER JOIN days AS d ON d.id = wd.idDay
INNER JOIN worktimes AS wt ON wd.id = wt.idWorkday
WHERE u.id = 2 AND wd.enabled = 1
*/

export default Admin