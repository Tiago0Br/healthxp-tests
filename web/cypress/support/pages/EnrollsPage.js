import navbar from './components/Navbar'
import popup from './components/Popup'

class EnrollsPage {
    constructor() {
        this.navbar = navbar
        this.popup = popup
    }

    goToForm() {
        cy.get('a[href="/enrollments/new"]').click()
    }

    selectItem(item, value) {
        cy.get(`.select_${item}`)
            .click()
        
        cy.get(`input[aria-label="select_${item}"]`)
            .type(value)

        cy.contains('div[id*=option]', value)
            .click()
    }

    fillCard(name) {
        cy.get('#card_number').type('4242424242424242')
        cy.get('#card_holder').type(name)
        cy.get('#card_month').type('10')
        cy.get('#card_year').type('2030')
        cy.get('#card_cvv').type('123')
    }

    submit() {
        cy.get('button[type=submit]').click()
    }

    submitForm(enrollment) {
        this.selectItem('student', enrollment.student.name)
        this.selectItem('plan', enrollment.plan.name)
        this.fillCard(enrollment.student.name)
        this.submit()
    }
}

export default new EnrollsPage()