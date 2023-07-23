const { defineConfig } = require('cypress');
const { Pool } = require('pg')
const { dbConfig } = require('./cypress.env.json')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        setupNodeEvents(on, _) {
            on('task', {
                async deleteStudent(studentEmail) {
                    const pool = new Pool(dbConfig)
                    try {
                        const query = `DELETE FROM students WHERE email = $1;`
                        await pool.query(query, [studentEmail])
                    } catch (error) {
                        console.log(error)
                    }
                    await pool.end()
                    return null
                },

                async resetStudent(student) {
                    const pool = new Pool(dbConfig)
                    try {
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
                        await pool.query(query, values)
                    } catch (error) {
                        console.log(error)
                    }
                    await pool.end()
                    return null
                }
            })
        },
    },
});
