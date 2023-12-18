const students = require('../fixtures/students.json')

Feature('Login')

Scenario('Deve logar com sucesso', async ({ I, loginScreen, accountScreen }) => {
    const data = students.success_login
    I.resetStudent(data.student)
    const enrollmentCode = await I.createEnroll(data)

    loginScreen.submit(enrollmentCode)
    accountScreen.userLoggedIn()
})

Scenario('Não deve logar com um código de matrícula incorreto', ({ I, loginScreen }) => {
    const message = 'Acesso não autorizado! Entre em contato com a central de atendimento.'
    
    loginScreen.submit('123456')
    I.seeThatPopHaveText(message)
})

Scenario('Não deve logar com o plano health', async ({ I, loginScreen }) => {
    const message = 'Seu plano não possui permissão para uso do App! Entre em contato com a central de atendimento.'
    const data = students.not_login
    I.resetStudent(data.student)
    const enrollmentCode = await I.createEnroll(data)
    
    loginScreen.submit(enrollmentCode)
    I.seeThatPopHaveText(message)
})