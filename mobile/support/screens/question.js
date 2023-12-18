const { I } = inject();

module.exports = {
    locators: {
        questionField: { android: '#textQuestion' },
        btnSubmit: { android: '#btnSubmit' },
        menuHelp: { android: 'Pedir ajuda' },
        btnNewQuestion: { android: 'Enviar dúvida' }
    },

    access() {
        I.click(this.locators.menuHelp)
        I.click(this.locators.btnNewQuestion)
    },

    submit(question) {
        I.fillField(this.locators.questionField, question)
        I.click(this.locators.btnSubmit)
    }
}
