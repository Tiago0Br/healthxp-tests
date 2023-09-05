import data from '../fixtures/questions.json'
import studentPage from '../support/pages/StudentPage'

describe('Receber perguntas', () => {
    it('Deve receber uma notificação com uma pergunta de um aluno', () => {
        const dataTest = data.notification

        cy.resetStudent(dataTest.student)
        cy.createEnroll(dataTest)
        cy.createQuestion(dataTest.question)
        cy.adminLogin()

        studentPage.navbar.openNotifications()
        studentPage.notifications.haveQuestion(dataTest.question)
    })

    it('Deve responder a pergunta de um aluno', () => {
        const dataTest = data.prof_answer

        cy.resetStudent(dataTest.student)
        cy.createEnroll(dataTest)
        cy.createQuestion(dataTest.question)
        cy.adminLogin()

        studentPage.navbar.openNotifications()
        studentPage.notifications.openQuestion(dataTest.question)
        studentPage.notifications.sendAnswer(dataTest.answer)
        studentPage.popup.haveText('Resposta enviada com sucesso')
    })
})