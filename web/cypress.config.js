const { defineConfig } = require('cypress')
const { baseUrl } = require('./cypress.env.json')

module.exports = defineConfig({
    e2e: {
        baseUrl,
    },
});
