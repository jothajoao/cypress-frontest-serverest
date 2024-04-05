const { defineConfig } = require("cypress");

const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    baseUrl: "https://front.serverest.dev/login",
    NomeCadastrado: "Joao marcos jotha da silva",
    LoginCadastrado: "jotha.joao@testi.com.br",
    SenhaCadastrada: "teste123",
    LoginInvalido: "jotha.joao@teste",
    LoginNome: "jotha.joao@gmail.com.br",
  },
});
