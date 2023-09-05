class Navbar {
    userLoggedIn(user) {
        cy.get('.logged-user')
            .should('be.visible')
            .and('include.text', `Olá, ${user}`)
    }

    goToEnrolls() {
        cy.get('a[href="/enrollments"]').click()
    }

    openNotifications() {
        cy.get('.notifications button').click()
    }
}

export default new Navbar()