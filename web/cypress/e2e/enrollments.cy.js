import data from '../fixtures/enrollments.json'
import enrollsPage from '../support/pages/EnrollsPage'

describe('Matrículas', () => {
    it('Deve realizar matrícula de um aluno', () => {
        const enrollment = data.create

        cy.task('resetStudent', enrollment.student)
        cy.adminLogin()

        enrollsPage.navbar.goToEnrolls()
        enrollsPage.goToForm()

        enrollsPage.selectItem('student', enrollment.student.name)
        enrollsPage.selectItem('plan', enrollment.plan.name)

        enrollsPage.fillCard(enrollment.student.name)
        enrollsPage.submit()

        enrollsPage.popup.haveText('Matrícula cadastrada com sucesso.')
    })

    it('Não deve criar matrícula duplicada', () => {
        const enrollment = data.duplicate

        cy.task('resetStudent', enrollment.student)
        cy.createEnroll(enrollment)
        cy.adminLogin()

        enrollsPage.navbar.goToEnrolls()
        enrollsPage.goToForm()

        enrollsPage.selectItem('student', enrollment.student.name)
        enrollsPage.selectItem('plan', enrollment.plan.name)

        enrollsPage.fillCard(enrollment.student.name)
        enrollsPage.submit()

        enrollsPage.popup.haveText('O aluno já possui matrícula cadastrada!')
    })
})