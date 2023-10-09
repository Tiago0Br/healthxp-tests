class Popup {
    content() {
        return cy.get('#swal2-content')
    }

    haveText(expectedText) {
        cy.get('#swal2-content')
            .should('be.visible')
            .and('have.text', expectedText)
    }

    confirm() {
        cy.get('button.swal2-confirm').click()
    }

    close() {
        cy.get('button.swal2-cancel').click()
        cy.get('.swal2-popup').should('not.exist')
    }
}

export default new Popup()