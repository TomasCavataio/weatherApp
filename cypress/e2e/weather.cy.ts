/// <reference types="cypress" />

describe('Weather App E2E Tests', () => {
  it('should visit the app, interact with it, and make assertions', () => {
    // load app
    cy.visit('localhost:4200');

    // add madrid & new york as cities
    cy.get('input[type="text"]').type('madrid');
    cy.get('button .fa-search').click();

    cy.get('input[type="text"]').clear();

    cy.get('input[type="text"]').type('New York');
    cy.get('button .fa-search').click();

    cy.get('.weather-card').should('have.length.above', 1);

    // remove madrid card
    cy.get('.weather-card:first .close-icon').click();

    cy.get('.weather-card').should('have.length', 1);

    // save list, remove all cards and load the saved cards 
    cy.get('button .fa-save').click();
    cy.get('button .fa-trash').click();
    cy.get('.weather-card').should('have.length', 0);

    cy.get('button .fa-star').click();
    cy.get('.weather-card').should('have.length', 1);


  });
});
