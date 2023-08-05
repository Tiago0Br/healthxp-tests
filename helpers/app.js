const express = require('express')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({ passError: true })
const app = express()
const db = require('./db')

app.use(express.json())

app.get('/', (_, res) => {
    res.json({ message: 'Hello API Helper' })
})

const studentSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().required(),
    weight: Joi.number().required(),
    feet_tall: Joi.number().required()
})

const studentEmailSchema = Joi.object({
    email: Joi.string().email().required()
})

const enrollmentSchema = Joi.object({
    email: Joi.string().email().required(),
    plan_id: Joi.number().required(),
    price: Joi.number().required()
})

app.post('/students', validator.body(studentSchema), db.deleteAndCreateStudent)
app.delete('/students/:email', validator.params(studentEmailSchema), db.deleteStudentByEmail)
app.post('/enrollments', validator.body(enrollmentSchema), db.insertEnrollByEmail)

app.use((err, _, res, next) => {
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            type: err.type,
            message: err.error.toString()
        });
    } else {
        next(err);
    }
});

app.listen(5000, () => {
    console.log('API Helper rodando na porta 5000')
})