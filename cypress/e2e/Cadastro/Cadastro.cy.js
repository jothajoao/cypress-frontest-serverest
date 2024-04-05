import { faker } from '@faker-js/faker';

const usuarios = [
    { nome: faker.person.fullName(), email: faker.internet.email(), password: faker.internet.password() },
    { nome: faker.person.fullName(), email: faker.internet.email(), password: faker.internet.password() }
];

const cadastros = [0, 1, 2, 3];

describe('Cadastro de Usuários', () => {
    it('Cadastro realizado com sucesso', () => {
        for (let index = 0; index < usuarios.length; index++) { // percorre o array de usuarios
            const usuario = usuarios[index];
            cy.visit(Cypress.env('baseUrl'));
            cy.get('[data-testid="cadastrar"]').click();
            cy.get('[class="font-robot"]').should('have.text', 'Cadastro');
            cy.get('[data-testid="nome"]').type(usuario.nome);
            cy.get('[data-testid="email"]').type(usuario.email);
            cy.get('[data-testid="password"]').type(usuario.password);
            if (index === 0) { // verifica se é o primeiro usuario se for o usuario sera administrador
                cy.get('.form-check-label').should('have.text', 'Cadastrar como administrador?').click();
                cy.get('[data-testid="cadastrar"]').click();
                cy.wait(100);
                cy.get('.alert-link').should('contain', 'Cadastro realizado com sucesso')
                cy.get('[data-dismiss="alert"]').click();
                cy.wait(1000);
                cy.get("h1").should('have.text', 'Bem Vindo  ' + usuario.nome);
            } else { // se nao for o primeiro usuario ele vai ser um usuario normal
                cy.get('[data-testid="cadastrar"]').click();
                cy.wait(100);
                cy.get('.alert-link').should('contain', 'Cadastro realizado com sucesso')
                cy.get('[data-dismiss="alert"]').click();
                cy.wait(1000);
                cy.get("h1").should('have.text', 'Serverest Store');
            };
            if (index < usuarios.length - 1) {   // Verifique se é o último usuário antes de continuar
            };
        };
    });

    it('Cadastro ja realizado', () => {
        cy.visit(Cypress.env('baseUrl'));
        cy.get('[data-testid="cadastrar"]').click();
        cy.get('[class="font-robot"]').should('have.text', 'Cadastro');
        cy.get('[data-testid="nome"]').type(Cypress.env('NomeCadastrado'));
        cy.get('[data-testid="email"]').type(Cypress.env('LoginCadastrado'));
        cy.get('[data-testid="password"]').type(Cypress.env('SenhaCadastrada'));
        cy.get('.form-check-label').click();
        cy.get('[data-testid="cadastrar"]').click();
        cy.get('[class="alert alert-secondary alert-dismissible"]').should('contain', 'Este email já está sendo usado')
        cy.get('[data-dismiss="alert"]').click();
    });

    it('Cadastrando um email incorreto', () => {
        cy.visit(Cypress.env('baseUrl'));
        cy.get('[data-testid="cadastrar"]').click();
        cy.get('[class="font-robot"]').should('have.text', 'Cadastro');
        cy.get('[data-testid="nome"]').type(Cypress.env('NomeCadastrado'));
        cy.get('[data-testid="email"]').type(Cypress.env('LoginInvalido'));
        cy.get('[data-testid="password"]').type(Cypress.env('SenhaCadastrada'));
        cy.get('.form-check-label').click();
        cy.get('[data-testid="cadastrar"]').click();
        cy.get('[class="alert alert-secondary alert-dismissible"]').should('contain', 'Email deve ser um email válido')
        cy.get('[data-dismiss="alert"]').click();
    });

    it('Cadastrando nome, email e senha em branco', () => {
        for (let index = 0; index < cadastros.length; index++) {
            const cadastro = cadastros[index];
            if (index === 0) {
                cy.visit(Cypress.env('baseUrl'));
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="font-robot"]').should('have.text', 'Cadastro');
                cy.get('[data-testid="nome"]').type('j').clear()
                cy.get('[data-testid="email"]').type(Cypress.env('LoginCadastrado'));
                cy.get('[data-testid="password"]').type(Cypress.env('SenhaCadastrada'));
                cy.get('.form-check-label').click();
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="alert alert-secondary alert-dismissible"]').then((alert) => {
                    expect(alert).to.contain('Nome não pode ficar em branco');
                });
                cy.get('[data-dismiss="alert"]').click();
            };
            if (index === 1) {
                cy.visit(Cypress.env('baseUrl'));
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="font-robot"]').should('have.text', 'Cadastro');
                cy.get('[data-testid="nome"]').type(Cypress.env('NomeCadastrado'));
                cy.get('[data-testid="email"]').type('j').clear()
                cy.get('[data-testid="password"]').type(Cypress.env('SenhaCadastrada'));
                cy.get('.form-check-label').click();
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="alert alert-secondary alert-dismissible"]').then((alert) => {
                    expect(alert).to.contain('Email não pode ficar em branco');
                });
                cy.get('[data-dismiss="alert"]').click();
            };
            if (index === 2) {
                cy.visit(Cypress.env('baseUrl'));
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="font-robot"]').should('have.text', 'Cadastro');
                cy.get('[data-testid="nome"]').type(Cypress.env('NomeCadastrado'));
                cy.get('[data-testid="email"]').type(Cypress.env('LoginCadastrado'));
                cy.get('[data-testid="password"]').type('j').clear()
                cy.get('.form-check-label').click();
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="alert alert-secondary alert-dismissible"]').then((alert) => {
                    expect(alert).to.contain('Password não pode ficar em branco');
                });
                cy.get('[data-dismiss="alert"]').click();
            };

            if (index === 3) {
                cy.visit(Cypress.env('baseUrl'));
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="font-robot"]').should('have.text', 'Cadastro');
                cy.get('[data-testid="nome"]').type('j').clear();
                cy.get('[data-testid="email"]').type('j').clear();
                cy.get('[data-testid="password"]').type('j').clear();
                cy.get('.form-check-label').click();
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="alert alert-secondary alert-dismissible"]').then((alert) => {
                    expect(alert).to.contain('Nome não pode ficar em branco');
                    expect(alert).to.contain('Email não pode ficar em branco');
                    expect(alert).to.contain('Password não pode ficar em branco');
                });
            }
        };
    });

    it('Cadastro com dados obrigatorios', () => {
        for (let index = 0; index < cadastros.length; index++) {
            const cadastro = cadastros[index];
            if (index === 0) {
                cy.visit(Cypress.env('baseUrl'));
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="font-robot"]').should('have.text', 'Cadastro');
                cy.get('[data-testid="nome"]').clear();
                cy.get('[data-testid="email"]').type(Cypress.env('LoginCadastrado'));
                cy.get('[data-testid="password"]').type(Cypress.env('SenhaCadastrada'));
                cy.get('.form-check-label').click();
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="alert alert-secondary alert-dismissible"]').then((alert) => {
                    expect(alert).to.contain('Nome é obrigatório');
                });
            }
            if (index === 1) {
                cy.visit(Cypress.env('baseUrl'));
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="font-robot"]').should('have.text', 'Cadastro');
                cy.get('[data-testid="nome"]').type(Cypress.env('NomeCadastrado'));
                cy.get('[data-testid="email"]').clear();
                cy.get('[data-testid="password"]').type(Cypress.env('SenhaCadastrada'));
                cy.get('.form-check-label').click();
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="alert alert-secondary alert-dismissible"]').then((alert) => {
                    expect(alert).to.contain('Email é obrigatório');
                });
            }
            if (index === 2) {
                cy.visit(Cypress.env('baseUrl'));
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="font-robot"]').should('have.text', 'Cadastro');
                cy.get('[data-testid="nome"]').type(Cypress.env('NomeCadastrado'));
                cy.get('[data-testid="email"]').type(Cypress.env('LoginCadastrado'));
                cy.get('[data-testid="password"]').clear();
                cy.get('.form-check-label').click();
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="alert alert-secondary alert-dismissible"]').then((alert) => {
                    expect(alert).to.contain('Password é obrigatório');
                });
            };

            if (index === 3) {
                cy.visit(Cypress.env('baseUrl'));
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="font-robot"]').should('have.text', 'Cadastro');
                cy.get('[data-testid="nome"]').clear();
                cy.get('[data-testid="email"]').clear();
                cy.get('[data-testid="password"]').clear();
                cy.get('.form-check-label').click();
                cy.get('[data-testid="cadastrar"]').click();
                cy.get('[class="alert alert-secondary alert-dismissible"]').then((alert) => {
                    expect(alert).to.contain('Nome é obrigatório');
                    expect(alert).to.contain('Email é obrigatório');
                    expect(alert).to.contain('Password é obrigatório');
                });
            }
        };
    });
});





