describe('/sessions', () => {
    it('/POST com credenciais válidas', () => {
        cy.fixture('sessions').then(login => {
            cy.login(login.valid).then(({ status, body }) => {
                expect(status).to.be.equal(200)
                expect(body.token).to.be.a('string')
            })
        })
    })

    it('/POST com senha incorreta', () => {
        cy.fixture('sessions').then(login => {
            cy.login(login.invalid_password).then(({ status, body }) => {
                expect(status).to.be.equal(401)
                expect(body.error).to.be.equal('Password does not match')
            })
        })
    })

    it('/POST com e-mail não cadastrado', () => {
        cy.fixture('sessions').then(login => {
            cy.login(login.invalid_email).then(({ status, body }) => {
                expect(status).to.be.equal(401)
                expect(body.error).to.be.equal('User not found')
            })
        })
    })
})