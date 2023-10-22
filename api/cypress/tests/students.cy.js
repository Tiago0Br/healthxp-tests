import sessions from '../fixtures/sessions.json'

describe('/students', () => {
    const user = sessions.valid

    beforeEach(() => {
        cy.login(user).then(({ body }) => {
            Cypress.env('TOKEN', body.token)
        })
    })

    it('/POST com dados válidos', () => {
        cy.fixture('students').then(({ valid: student }) => {
            cy.deleteStudent(student.email)

            cy.registerStudent(student).then(({ status, body }) => {
                expect(status).to.be.equal(201)
                expect(body.id).to.be.a('number')
            })
        })
    })

    it('/POST sem passar o token', () => {
        Cypress.env('TOKEN', '')

        cy.registerStudent({}).then(({ status, body }) => {
            expect(status).to.be.equal(401)
            expect(body.error).to.be.equal('Token invalid')
        })
    })

    it('/POST sem enviar os campos', () => {
        const requiredFields = [ 'name', 'email', 'age', 'weight', 'feet_tall' ]

        cy.registerStudent({}).then(({ status, body }) => {
            expect(status).to.be.equal(400)
            requiredFields.forEach((field, i) => {
                expect(body.messsages[i].errors[0]).to.be.equal(`${field} is a required field`)
            })
        })
    })
})