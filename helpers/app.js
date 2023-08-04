const express = require('express')
const app = express()
const db = require('./db')

app.use(express.json())

app.get('/', (_, res) => {
  res.json({ message: 'Hello API Helper' })
})

app.post('/students', db.createAndDeleteStudent)
app.delete('/students/:email', db.deleteStudentByEmail)
app.get('/students/:email', db.selectStudentByEmail)
app.post('/enrollments', db.insertEnroll)

app.listen(5000, () => {
    console.log('API Helper rodando na porta 5000')
})