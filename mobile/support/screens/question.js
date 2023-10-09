const { I } = inject();

module.exports = {
    locators: {
        questionField: { android: '#textQuestion' },
        btnSubmit: { android: '#btnSubmit' },
        message: { android: '#android:id/message' }
    },

    access() {
        I.tap('Pedir ajuda')
        I.tap('Enviar dúvida')
    },

    submit(question) {
        I.fillField(this.locators.questionField, question)
        I.tap(this.locators.btnSubmit)
    },

    messageHaveText(text) {
        I.see(text, this.locators.message)
    }
}
