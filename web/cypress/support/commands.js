import loginPage from './pages/LoginPage'
import studentPage from './pages/StudentPage'
import users from '../fixtures/users.json'

const apiHelper = Cypress.env('API_HELPER')

Cypress.Commands.add('adminLogin', () => {
    const user = users.admin
    loginPage.doLogin(user)
    studentPage.navbar.userLoggedIn(user.name)
})

Cypress.Commands.add('resetStudent', student => {
    cy.request({
        method: 'POST',
        url: `${apiHelper}/students`,
        body: student
    }).its('status').should('eq', 201)
})

Cypress.Commands.add('deleteStudent', email => {
    cy.request({
        method: 'DELETE',
        url: `${apiHelper}/students/${email}`
    }).its('status').should('eq', 204)
})

Cypress.Commands.add('createEnroll', enroll => {
    const payload = {
        email: enroll.student.email,
        plan_id: enroll.plan.id,
        price: enroll.price
    }

    cy.request({
        method: 'POST',
        url: `${apiHelper}/enrollments`,
        body: payload
    }).its('status').should('eq', 201)
})