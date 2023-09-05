class Notifications {
    haveQuestion(question) {
        return cy.contains('.scrollbar-container p', question)
            .should('be.visible')
    }

    openQuestion(question) {
        this.haveQuestion(question).click()
    }

    sendAnswer(answer) {
        cy.get('textarea[name=answer]').type(answer)
        cy.contains('button', 'Enviar resposta').click()
    }
}

export default new Notifications()