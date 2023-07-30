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

        cy.get('#email').as('email')
        cy.get('#password').as('password')

        email && cy.get('@email').clear({ force: true }).type(email)
        password && cy.get('@password').clear({ force: true }).type(password)
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