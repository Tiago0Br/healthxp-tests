const { Pool } = require('pg')
const ShortUniqueId = require('short-unique-id')
require('dotenv').config()

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env

const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
})

const deleteAndCreateStudent = (req, res) => {
    const student = req.body

    const queryDelete = `
        DELETE FROM students WHERE email = $1
    `

    const queryInsert = `
        INSERT INTO students (name, email, age, weight, feet_tall)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id as student_id;
    `
    const values = [
        student.name, student.email, student.age, student.weight, student.feet_tall
    ]
    pool.query(queryDelete, [student.email], (error) => {
        if (error) {
            return res.status(500).json(error)
        }

        pool.query(queryInsert, values, (error, result) => {
            if (error) {
                return res.status(500).json(error)
            }

            return res.status(201).json({student_id: result.rows[0].student_id})
        })

    })
}

const deleteStudentByEmail = (req, res) => {
    const email = req.params.email

    const query = 'DELETE FROM students WHERE email = $1;'
    pool.query(query, [ email ], (error) => {
        if (error) {
            return res.status(500).json(error)
        }

        return res.status(204).end()
    })
}

const insertEnrollByEmail = (req, res) => {
    const { email, plan_id, price } = req.body
    const uid = new ShortUniqueId({ length: 6 });

    const query = `
        INSERT INTO enrollments (enrollment_code, student_id, plan_id, credit_card, status, price)
        SELECT 
            '${uid.rnd().toUpperCase()}' AS enrollment_code, 
            id AS student_id, 
            $2 AS plan_id, 
            '4242' AS credit_card, 
            true AS status, 
            $3 AS price
            FROM students
            WHERE email = $1
            RETURNING enrollment_code;
    `

    const values = [email, plan_id, price]
    pool.query(query, values, (error, result) => {
        if (error) {
            return res.status(500).json(error)
        }

        return res.status(201).json({ enrollment_code: result.rows[0].enrollment_code })
    })
}

module.exports = {
    deleteAndCreateStudent,
    deleteStudentByEmail,
    insertEnrollByEmail
}