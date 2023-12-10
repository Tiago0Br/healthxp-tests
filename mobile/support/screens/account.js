const { I } = inject();

module.exports = {
    userLoggedIn() {
        I.see('Minha conta')
    }
}
