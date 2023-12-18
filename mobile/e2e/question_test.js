const order = require('../fixtures/orders.json')

Feature('Realizar pergunta')
const data = order.help

Before(async ({ I, loginScreen, questionScreen, accountScreen }) => {

    I.resetStudent(data.student)
    const enrollmentCode = await I.createEnroll(data)

    loginScreen.submit(enrollmentCode)
    accountScreen.userLoggedIn()
    
    questionScreen.access()
})

Scenario('Deve enviar a dúvida com sucesso', ({I,  questionScreen }) => {
    questionScreen.submit(data.question)
    I.seeThatPopHaveText('Sua dúvida foi recebida e será avaliada pela nossa equipe.')
})

Scenario('Não deve enviar dúvida em branco', ({ I, questionScreen }) => {
    questionScreen.submit('')
    I.seeThatPopHaveText('Por favor escreva a sua dúvida!')
})