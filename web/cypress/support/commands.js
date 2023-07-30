import loginPage from './pages/LoginPage'
import studentPage from './pages/StudentPage'
import users from '../fixtures/users.json'

Cypress.Commands.add('adminLogin', () => {
    const user = users.admin
    loginPage.doLogin(user)
    studentPage.navbar.userLoggedIn(user.name)
})

Cypress.Commands.add('createEnroll', enroll => {
    cy.task('selectStudentId', enroll.student.email).then(studentId => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env('apiUrl')}/sessions`,
            body: {
                email: users.admin.email,
                password: users.admin.password
            }
        }).then(({ body }) => {
            const payload = {
                student_id: studentId,
                plan_id: enroll.plan.id,
                credit_card: "4242"
            }

            cy.request({
                method: 'POST',
                url: `${Cypress.env('apiUrl')}/enrollments`,
                headers: {
                    Authorization: `Bearer ${body.token}`
                },
                body: payload
            }).its('status').should('eq', 201)
        })
    })
})