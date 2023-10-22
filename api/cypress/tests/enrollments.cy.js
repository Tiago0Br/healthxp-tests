import sessions from '../fixtures/sessions.json'
import students from '../fixtures/students.json'

describe('/enrollments', () => {
    const user = sessions.valid
    const student = students.valid

    beforeEach(() => {
        cy.login(user).then(({ body }) => {
            Cypress.env('TOKEN', body.token)

            cy.deleteStudent(student.email)
            cy.registerStudent(student).then(({ body }) => {
                Cypress.env('STUDENT_ID', body.id)
            })
        })
    })

    it('/POST com dados válidos', () => {
        cy.fixture('enrollments').then(({ valid: enrollment }) => {
            enrollment.student_id = Cypress.env('STUDENT_ID')

            cy.createEnrollment(enrollment).then(({ status, body }) => {
                expect(status).to.be.equal(201)
                expect(body.id).to.be.a('number')
            })
        })
    })

    it('/POST com cartão de crédito inválido', () => {
        cy.fixture('enrollments').then(({ invalid_credit_card: enrollment }) => {
            enrollment.student_id = Cypress.env('STUDENT_ID')

            cy.createEnrollment(enrollment).then(({ status, body }) => {
                expect(status).to.be.equal(400)
                expect(body.error[0].message).to.be.equal('credit_card must be at least 4 characters')
            })
        })
    })

    it('/POST sem passar o token', () => {
        Cypress.env('TOKEN', '')

        cy.createEnrollment({}).then(({ status, body }) => {
            expect(status).to.be.equal(401)
            expect(body.error).to.be.equal('Token invalid')
        })
    })

    it('/POST sem enviar os campos', () => {
        const requiredFields = [ 'student_id', 'plan_id', 'credit_card' ]

        cy.createEnrollment({}).then(({ status, body }) => {
            expect(status).to.be.equal(400)
            requiredFields.forEach((field, i) => {
                expect(body.error[i].message).to.be.equal(`${field} is a required field`)
            })
        })
    })
})