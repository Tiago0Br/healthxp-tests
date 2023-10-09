const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3333',
        specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: 'cypress/support/tests.js'
    },
});
