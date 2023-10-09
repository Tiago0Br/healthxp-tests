describe('/sessions', () => {
    it('Deve retornar o token do usuário ao informar credenciais válidas', () => {
        cy.api({
            url: '/sessions',
            method: 'POST',
            body: {
                email: 'admin@healthxp.com',
                password: 'xperience'
            }
        }).then(({ status, body }) => {
            expect(status).to.be.equal(200)
            expect(body.token).to.be.a('string')
        })
    })
})