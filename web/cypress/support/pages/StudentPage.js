import popup from './components/Popup'
import navbar from './components/Navbar'

class StudentPage {
    constructor() {
        this.navbar = navbar
        this.popup = popup
    }

    goToRegister() {
        cy.get('a[href="/students/new"]').click()
    }

    submitForm(student) {
        const { name, email, age, weight, feet_tall } = student

        cy.get('input[name=name]').as('name')
        cy.get('input[name=email]').as('email')
        cy.get('input[name=age]').as('age')
        cy.get('input[name=weight]').as('weight')
        cy.get('input[name=feet_tall]').as('feetTall')

        name ? cy.get('@name').type(name) : cy.log('Empty name')
        email ? cy.get('@email').type(email) : cy.log('Empty email')
        age ? cy.get('@age').type(age) : cy.log('Empty age')
        weight ? cy.get('@weight').type(weight) : cy.log('Empty weight')
        feet_tall ? cy.get('@feetTall').type(feet_tall) : cy.log('Empty feet_tall')

        cy.contains('button', 'Cadastrar').click()
    }

    search(name) {
        cy.get('input[placeholder="Buscar por nome"]').type(name)
    }

    remove(email) {
        cy.contains('tr', email, { timeout: 8000 })
            .find('button')
            .click()
    }

    errorMessage(label, message) {
        cy.contains('label', label)
            .parent()
            .find('span')
            .should('have.text', message)
    }
}

export default new StudentPage()