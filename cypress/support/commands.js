// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// 검색
Cypress.Commands.add('search', (text) => {
  cy.get('input[name="query"]').type(text);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('requestAPI', (url) => {
  const apiUrl = `${Cypress.env('apiUrl')}/api/v1/${url}`;
  const authorizationHeader =
    'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0NWIzODQ5ZS1iMzlkLTQ1ZWQtOTg3YS1iZWQxNDcyOTczOTUiLCJhdXRoIjoiUk9MRV9BRE1JTiIsImV4cCI6MTcyMzgxNDQ3OX0.7r6U6lj4jPtF1px026LBn-q0PTY8nm-Y_ILqRLYoJSqU4XujREu3ATZ8XT9PEsBDiAJ_KOPSHdf9RF5FkHXbaw';

  return cy.request({
    method: 'GET',
    url: apiUrl,
    headers: {
      accept: 'application/json, text/plain, */*',
      Authorization: authorizationHeader,
      'sec-fetch-site': 'same-site',
      'accept-language': 'ko-KR,ko;q=0.9',
      'accept-encoding': 'gzip, deflate, br',
      'sec-fetch-mode': 'cors',
      origin: 'https://www.stg.nerget.co.kr',
      'user-agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Nerget/1.7.0',
      referer: 'https://www.stg.nerget.co.kr/',
      'sec-fetch-dest': 'empty',
    },
  });
});

// 로그인 함수
Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://www.saucedemo.com/');

  if (!username) {
    cy.get('#password').type(password);
  }

  if (!password) {
    cy.get('#user-name').type(username);
  }

  if (username && password) {
    cy.get('#user-name').type(username);
    cy.get('#password').type(password);
  }

  cy.get('#login-button').click();
});

// 에러 메시지 확인 함수
Cypress.Commands.add('errorMessage', (message) => {
  cy.get('.error-message-container')
    .should('be.visible')
    .and('contain', `Epic sadface: ${message}`);
});
