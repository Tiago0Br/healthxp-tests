const { defineConfig } = require('cypress');
const { BASE_URL } = require('./cypress.env.json')

module.exports = defineConfig({
    e2e: {
        baseUrl: BASE_URL,
        specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: 'cypress/support/tests.js'
    },
});
