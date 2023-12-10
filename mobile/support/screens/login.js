const { I } = inject();

module.exports = {
    locators: {
        ip: { android: '#ipAddress' },
        enrollment: { android: '#enrollment_code' },
        message: { android: '#android:id/message' }
    },

    submit(enrollmentCode) {
        I.seeAppIsInstalled('com.papitorocks.healthxp')

        I.waitForElement(this.locators.ip, 10)
        I.fillField(this.locators.ip, '192.168.1.51')

        I.waitForElement(this.locators.enrollment)
        I.fillField(this.locators.enrollment, enrollmentCode)

        I.tap('Entrar')
    }
}
