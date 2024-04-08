import { faker } from '@faker-js/faker';


const loginsAleatorios = [
    { Login: faker.internet.email(), Senha: faker.internet.password() },
];

describe('Login de usuarios', () => {


    const logins = [
        { LoginAdmin: Cypress.env('LoginAdmin'), SenhaAdmin: Cypress.env('SenhaAdmin'), nome: "joao marcos", admin: true },

        { Login: Cypress.env('Login'), Senha: Cypress.env('Senha'), admin: false },

    ];


    //    it('Login realizado com sucesso', () => {
    //        for (let index = 0; index < logins.length; index++) {
    //            const login = logins[index];
    //            cy.visit(Cypress.env('baseUrl'));
    //            cy.get("h1").should('have.text', 'Login');
    //            if (login.admin) {
    //                cy.get('[data-testid="email"]').type(login.LoginAdmin);
    //                cy.get('[data-testid="senha"]').type(login.SenhaAdmin);
    //            } else {
    //                cy.get('[data-testid="email"]').type(login.Login);
    //                cy.get('[data-testid="senha"]').type(login.Senha);
    //
    //            }
    //            cy.get('[data-testid="entrar"]').click();
    //            cy.wait(1000);
    //
    //            if (login.admin) {
    //                cy.get("h1").should('have.text', 'Bem Vindo  ' + login.nome);
    //            } else {
    //                cy.get("h1").should('have.text', 'Serverest Store');
    //            }
    //        }
    //    });


    it('Login invalido', () => {
        cy.visit(Cypress.env('baseUrl'));
        cy.get("h1").should('have.text', 'Login');
        cy.get('[data-testid="email"]').type(loginsAleatorios[0].Login);
        cy.get('[data-testid="senha"]').type(loginsAleatorios[0].Senha);
        cy.get('[data-testid="entrar"]').click();
        cy.get('[class="alert alert-secondary alert-dismissible"]').should('contain', 'Email e/ou senha inválidos')
    });

})