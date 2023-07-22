# Testes E2E do HealthXp

## Descrição

Projeto de testes E2E da aplicação HealthXp sendo desenvolvido no treinamento **Dual Experience** da [QAXperience](https://qaxperience.com/).

## 🚀 Tecnologias utilizadas

<div>
	<a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript">
    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" heigth="60px" width="50px" title="Javascript" />
  </a>
	<a href="https://www.cypress.io/">
	    <img src="https://static-00.iconduck.com/assets.00/cypress-icon-512x512-ovcrvspz.png" heigth="50px" width="50px" title="Cypress" />
	</a>
  <a href="https://codecept.io/">
	    <img src="https://codecept.io/logo.svg" heigth="60px" width="50px" title="CodeceptJS" />
	</a>
	 <a href="https://appium.io/docs/en/2.0/">
	    <img src="https://static-00.iconduck.com/assets.00/appium-icon-511x512-rm65wi9n.png" heigth="50px" width="50px" title="Appium" />
	</a>
</div>
<br>

 - [Javascript] - Linguagem de programação
 - [Cypress] - Framework utilizado para criar os testes para a aplicação Web e a API
 - [CodeceptJS] - Framework que será utilizado em conjunto com o Appium para testar o app mobile
 - [Appium] - Framework para testes de aplicativos mobile

## 👨🏻‍💻 Como executar o projeto

 **Pré-requisitos**: É necessário ter o [Node](https://nodejs.org/pt-br) instalado no computador.

### Executando o projeto

 - Clonar o projeto.
 - Instalar as dependências com `npm install` ou `yarn install`
 - Criar o arquivo cypress.env.json
        
        cp cypress.env.example.json cypress.env.json

 - Alterar os valores das variáveis para os valores do seu banco no [ElephantSQL](https://www.elephantsql.com/)
 - Executar o Cypress em modo assistido com `npx cypress open` ou em modo headless com `npx cypress run`
---

Feito com 💜 &nbsp;por Tiago Lopes 👋 &nbsp;