Feature('Realizar pergunta')

Before(({ I, loginScreen, questionScreen }) => {
    loginScreen.submit('X8DBGI')
    I.see('Minha conta')
    
    questionScreen.access()
})

Scenario('Deve enviar a dúvida com sucesso', ({ questionScreen }) => {
    const question = 'Que exercícios devo fazer para ganhar massa muscular?'
    
    questionScreen.submit(question)
    questionScreen.messageHaveText('Sua dúvida foi recebida e será avaliada pela nossa equipe.')
})

Scenario('Não deve enviar dúvida em branco', ({ questionScreen }) => {
    const question = ''

    questionScreen.submit(question)
    questionScreen.messageHaveText('Por favor escreva a sua dúvida!')
})