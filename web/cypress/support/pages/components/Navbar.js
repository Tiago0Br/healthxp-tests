class Navbar {
    userLoggedIn(user) {
        cy.get('.logged-user')
            .should('be.visible')
            .and('include.text', `Olá, ${user}`)
    }
}

export default new Navbar()