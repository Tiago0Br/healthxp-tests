const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter')
const { TESULTS_TOKEN } = require('./cypress.env.json')

cypress.run({ })
    .then((results) => {
        const args = {
            target: TESULTS_TOKEN,
        }
        tesults.results(results, args);
    })
    .catch((err) => {
        console.error(err)
    })