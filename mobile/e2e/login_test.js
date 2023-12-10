Feature('Login')

Scenario('Deve logar com sucesso',  ({ loginScreen, accountScreen }) => {
    loginScreen.submit('X8DBGI')
    accountScreen.userLoggedIn()
})

Scenario('Não deve logar com um código de matrícula incorreto', ({ I, loginScreen }) => {
    const message = 'Acesso não autorizado! Entre em contato com a central de atendimento.'
    
    loginScreen.submit('123456')
    I.seeThatPopHaveText(message)
})

Scenario('Não deve logar com o plano health', ({ I, loginScreen }) => {
    const message = 'Seu plano não possui permissão para uso do App! Entre em contato com a central de atendimento.'
    
    loginScreen.submit('S4S9BC')
    I.seeThatPopHaveText(message)
})