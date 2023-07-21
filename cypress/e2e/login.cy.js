import loginPage from '../support/pages/LoginPage'
import navbar from '../support/pages/components/Navbar'
import users from '../fixtures/users.json'

describe('Login', () => {
    it('Deve logar com o perfil do admin', () => {
        const user = users.admin
        loginPage.doLogin(user)
        navbar.userLoggedIn(user.name)
    })

    it('Não deve logar com uma senha incorreta', () => {
        const user = users.inv_pass
        loginPage.doLogin(user)

        loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')
    })

    it('Não deve logar com um e-mail não cadastrado', () => {
        const user = users.email_not_found
        loginPage.doLogin(user)

        loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')
    })

    it('Não deve logar com emails inválidos', () => {
        const expectedMessages = []
        const receivedMessages = []

        loginPage.go()
        users.inv_emails.forEach(user => {
            loginPage.fill(user)
            loginPage.submit()
            
            loginPage.popup.content().invoke('text').then(message => {
                receivedMessages.push(message)
            })
            expectedMessages.push('Insira um email válido.')

            loginPage.popup.close()
        })

        cy.wrap(expectedMessages).should('deep.equal', receivedMessages)
    })

    it('Não deve logar com o campo e-mail em branco', () => {
        const user = users.empty_email
        loginPage.doLogin(user)

        loginPage.popup.haveText('Os campos email e senha são obrigatórios.')
    })

    it('Não deve logar com o campo senha em branco', () => {
        const user = users.empty_pass
        loginPage.doLogin(user)

        loginPage.popup.haveText('Os campos email e senha são obrigatórios.')
    })
})