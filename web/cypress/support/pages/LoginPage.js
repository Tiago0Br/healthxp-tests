import popup from './components/Popup'

class LoginPage {
    constructor() {
        this.popup = popup
    }

    go() {
        cy.visit('/')
    }

    fill(user) {
        const { email, password } = user

        cy.get('#email').clear({ force: true }).as('email')
        cy.get('#password').clear({ force: true }).as('password')

        email ? cy.get('@email').type(email) : cy.log('Empty email.')
        password ? cy.get('@password').type(password) : cy.log('Empty password.')
    }

    submit() {
        cy.contains('button', 'Entrar').click()
    }

    doLogin(user) {
        this.go()
        this.fill(user)
        this.submit()
    }
}

export default new LoginPage()