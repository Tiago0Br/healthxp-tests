import loginPage from './pages/LoginPage'
import studentPage from './pages/StudentPage'
import users from '../fixtures/users.json'

const apiHelper = Cypress.env('apiHelper')

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

Cypress.Commands.add('selectStudentId', email => {
    cy.request({
        method: 'GET',
        url: `${apiHelper}/students/${email}`
    }).then(res => {
        expect(res.status).eq(200)
        return res.body.id
    })
})

Cypress.Commands.add('deleteStudent', email => {
    cy.request({
        method: 'DELETE',
        url: `${apiHelper}/students/${email}`
    }).its('status').should('eq', 204)
})

Cypress.Commands.add('createEnroll', enroll => {
    cy.selectStudentId(enroll.student.email).then(student_id => {
        const payload = {
            enrollment_code: enroll.enrollment_code, 
            student_id, 
            plan_id: enroll.plan.id, 
            credit_card: enroll.credit_card, 
            status: enroll.status, 
            price: enroll.price
        }

        cy.request({
            method: 'POST',
            url: `${apiHelper}/enrollments`,
            body: payload
        }).its('status').should('eq', 201)
    })
})