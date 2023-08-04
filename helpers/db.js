const { Pool } = require('pg')
require('dotenv').config()

const { DB_HOST, DB_USER, DB_PASSWORD, DATABASE, DB_PORT } = process.env

const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DATABASE,
    port: DB_PORT
})

const createAndDeleteStudent = (req, res) => {
    const student = req.body

    const query = `
        WITH add AS(
            INSERT INTO students (name, email, age, weight, feet_tall)
            VALUES ($1, $2, $3, $4, $5)
        )
        DELETE FROM students WHERE email = $2;
    `
    const values = [
        student.name, student.email, student.age, student.weight, student.feet_tall
    ]
    pool.query(query, values, (error, result) => {
        if (error) {
            return res.status(500).json(error)
        }

        return res.status(201).json(result)
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

const selectStudentByEmail = (req, res) => {
    const email = req.params.email

    const query = 'SELECT id FROM students WHERE email = $1;'
    pool.query(query, [ email ], (error, result) => {
        if (error) {
            return res.status(500).json(error)
        }

        return res.json(result.rows[0])
    })
}

const insertEnroll = (req, res) => {
    const { enrollment_code, student_id, plan_id, credit_card, status, price } = req.body
    const query = `
        INSERT INTO enrollments (enrollment_code, student_id, plan_id, credit_card, status, price)
        VALUES ('${enrollment_code}', ${student_id}, ${plan_id}, '${credit_card}', ${status}, ${price})
    `

    pool.query(query, (error, result) => {
        if (error) {
            return res.status(500).json(error)
        }

        return res.status(201).json(result)
    })
}

module.exports = {
    createAndDeleteStudent,
    deleteStudentByEmail,
    selectStudentByEmail,
    insertEnroll
}