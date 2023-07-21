import students from '../fixtures/students.json'
import studentPage from '../support/pages/StudentPage'

describe('Alunos', () => {
    beforeEach(() => {
        cy.adminLogin()
    })

    it('Deve poder cadastrar um novo aluno', () => {
        const student = students.create

        cy.task('deleteStudent', student.email)

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('Dados cadastrados com sucesso.')
    })

    it('Não deve cadastrar com um e-mail duplicado', () => {
        const student = students.duplicate

        cy.task('deleteStudent', student.email)
        cy.task('insertStudent', student)

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('O email informado já foi cadastrado!')
    })

    it('Deve remover um aluno sem matrícula', () => {
        const student = students.remove

        cy.task('deleteStudent', student.email)
        cy.task('insertStudent', student)

        studentPage.search(student.name)
        studentPage.remove(student.email)
        
        studentPage.popup.confirm()
        studentPage.popup.haveText('Exclusão realizada com sucesso.')
    })

    it('Todos os campos devem ser obrigatórios', () => {
        const student = students.required

        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.requiredMessage('Nome completo', 'Nome é obrigatório')
        studentPage.requiredMessage('E-mail', 'O email é obrigatório')
        studentPage.requiredMessage('Idade', 'A idade é obrigatória')
        studentPage.requiredMessage('Peso (em kg)', 'O peso é obrigatório')
        studentPage.requiredMessage('Altura', 'A altura é obrigatória')
    })
})