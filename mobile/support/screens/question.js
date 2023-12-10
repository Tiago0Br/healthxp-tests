const { I } = inject();

module.exports = {
    locators: {
        questionField: { android: '#textQuestion' },
        btnSubmit: { android: '#btnSubmit' },
        menuHelp: { android: 'Pedir ajuda' },
        btnNewQuestion: { android: 'Enviar dúvida' }
    },

    access() {
        I.tap(this.locators.menuHelp)
        I.tap(this.locators.btnNewQuestion)
    },

    submit(question) {
        I.fillField(this.locators.questionField, question)
        I.tap(this.locators.btnSubmit)
    }
}
