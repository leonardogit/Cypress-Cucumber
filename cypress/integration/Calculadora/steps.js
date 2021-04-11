/// <reference types="cypress" />

Given(/^que eu acesso a calculadora$/, () => {
    cy.visit('/')
});


When(/^desejo realizar uma "([^"]*)"$/, (OperacaoDesejada) => {

    let operador;

    switch (OperacaoDesejada) {
        case 'soma':
            operador = '+'
            break;

        case 'subtração':
            operador = '-'
            break;

        case 'multiplicação':
            operador = 'x'
            break;

        case 'divisão':
            operador = '÷'
            break;

        default:
            break;
    }


    Cypress.env('operador', operador)

});

When(/^informar os valores "([^"]*)" e "([^"]*)"$/, (primeiroValor, segundoValor) => {
    cy.get('div[class="button"] , .button.zero').as('valores')
    cy.get('.operator').as('operadores') // salvando

    //informar o valor 1 
    //clicar na operação desejada(soma)
    //informar o valor 2 

    cy.get('@valores').contains(primeiroValor).click()
    cy.get('@operadores').contains(`${Cypress.env('operador')}`).click()
    cy.get('@valores').contains(segundoValor).click()

});

When(/^finalizar a conta$/, () => {
    cy.get('@operadores').contains('=').click()
});

Then(/^devo obter o resultado "([^"]*)"$/, (resultadoEsperado) => {

    cy.get('.display').as('resultado')

    cy.get('@resultado')
        .invoke('text') // retorna o valor de texto de um elemento atraves de uma função
        .should('be.equal',resultadoEsperado)
});

