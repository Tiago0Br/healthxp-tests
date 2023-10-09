import data from '../fixtures/enrollments.json'
import enrollsPage from '../support/pages/EnrollsPage'

describe('Matrículas', () => {
    it('Deve realizar matrícula de um aluno', () => {
        const enrollment = data.create

        cy.resetStudent(enrollment.student)
        cy.adminLogin()

        enrollsPage.navbar.goToEnrolls()
        enrollsPage.goToForm()
        enrollsPage.submitForm(enrollment)

        enrollsPage.popup.haveText('Matrícula cadastrada com sucesso.')
    })

    it('Não deve criar matrícula duplicada', () => {
        const enrollment = data.duplicate

        cy.resetStudent(enrollment.student)
        cy.createEnroll(enrollment)
        cy.adminLogin()

        enrollsPage.navbar.goToEnrolls()
        enrollsPage.goToForm()
        enrollsPage.submitForm(enrollment)

        enrollsPage.popup.haveText('O aluno já possui matrícula cadastrada!')
    })
})