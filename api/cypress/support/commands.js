Cypress.Commands.add('login', body => {
    return cy.api({
        url: '/sessions',
        method: 'POST',
        body,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('deleteStudent', email => {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env('API_HELPER')}/students/${email}`
    }).its('status').should('eq', 204)
})

Cypress.Commands.add('registerStudent', body => {
    return cy.api({
        method: 'POST',
        url: '/students',
        headers: {
            Authorization: `Bearer ${Cypress.env('TOKEN')}`
        },
        body,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('createEnrollment', body => {
    return cy.api({
        method: 'POST',
        url: '/enrollments',
        headers: {
            Authorization: `Bearer ${Cypress.env('TOKEN')}`
        },
        body,
        failOnStatusCode: false
    })
})