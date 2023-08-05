const { defineConfig } = require('cypress')
const { BASE_URL } = require('./cypress.env.json')

module.exports = defineConfig({
    e2e: {
        baseUrl: BASE_URL,
    },
});
