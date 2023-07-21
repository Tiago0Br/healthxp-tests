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
        if (name) cy.get('input[name=name]').type(name)
        if (email) cy.get('input[name=email]').type(email)
        if (age) cy.get('input[name=age]').type(age)
        if (weight) cy.get('input[name=weight]').type(weight)
        if (feet_tall) cy.get('input[name=feet_tall]').type(feet_tall)

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

    requiredMessage(field, message) {
        cy.contains('div', field)
            .find('span')
            .should('have.text', message)
    }
}

export default new StudentPage()