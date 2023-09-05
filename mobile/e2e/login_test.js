Feature('Login')

Scenario('Deve logar com sucesso',  ({ I, loginScreen }) => {
    loginScreen.submit('X8DBGI')
    I.see('Minha conta')
})

Scenario('Não deve logar com um código de matrícula incorreto', ({ loginScreen }) => {
    const message = 'Acesso não autorizado! Entre em contato com a central de atendimento.'
    
    loginScreen.submit('123456')
    loginScreen.messageHaveText(message)
})

Scenario('Não deve logar com o plano health', ({ loginScreen }) => {
    const message = 'Seu plano não possui permissão para uso do App! Entre em contato com a central de atendimento.'
    
    loginScreen.submit('S4S9BC')
    loginScreen.messageHaveText(message)
})