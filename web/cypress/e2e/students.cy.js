import students from '../fixtures/students.json'
import studentPage from '../support/pages/StudentPage'

describe('Alunos', () => {
    beforeEach(() => {
        cy.adminLogin()
    })

    it('Deve poder cadastrar um novo aluno', () => {
        const student = students.create

        cy.deleteStudent(student.email)

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('Dados cadastrados com sucesso.')
    })

    it('Não deve cadastrar com um e-mail duplicado', () => {
        const student = students.duplicate

        cy.resetStudent(student)

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('O email informado já foi cadastrado!')
    })

    it('Todos os campos devem ser obrigatórios', () => {
        const student = students.required

        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.errorMessage('Nome completo', 'Nome é obrigatório')
        studentPage.errorMessage('E-mail', 'O email é obrigatório')
        studentPage.errorMessage('Idade', 'A idade é obrigatória')
        studentPage.errorMessage('Peso (em kg)', 'O peso é obrigatório')
        studentPage.errorMessage('Altura', 'A altura é obrigatória')
    })

    it('Não deve cadastrar aluno com menos de 16 anos', () => {
        const student = students.under_16_years

        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.errorMessage('Idade', 'A idade mínima para treinar é 16 anos!')
    })

    it('Deve remover um aluno sem matrícula', () => {
        const student = students.remove

        cy.resetStudent(student)

        studentPage.search(student.name)
        studentPage.remove(student.email)

        studentPage.popup.confirm()
        studentPage.popup.haveText('Exclusão realizada com sucesso.')
    })

    it.skip('Não deve cadastrar aluno com peso igual ou menor que 0', () => {
        const student = students.invalid_weight

        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.errorMessage('Peso (em kg)', 'Peso não permitido')
    })

    it.skip('Não deve cadastrar aluno com altura igual ou menor que 0', () => {
        const student = students.invalid_width

        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.errorMessage('Altura', 'Altura não permitida')
    })
})