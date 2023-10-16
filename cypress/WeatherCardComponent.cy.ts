/// <reference types="cypress" />

import { WeatherCardComponent } from '../src/app/components/weather-card/weather-card.component';

describe('WeatherCardComponent Tests', () => {
  beforeEach(() => {
    const weatherData = {
      id: 1,
      isMainCard: true,
      cityName: 'Mock City',
      state: 'Mock State',
      temperature: 25,
      weatherDescription: 'Mock sky',
      humidity: 50,
      windSpeed: 10,
      weatherIconUrl: 'mock-icon.jpg',
    };

    cy.mount(WeatherCardComponent, { componentProperties: weatherData });
  });

  it('should display WeatherCardComponent', () => {
    cy.get('.weather-card').should('exist');
  });

  it('should display weather data', () => {
    cy.get('.weather-card-header h2').should('contain', '25°C');
    cy.get('.weather-card-body h3').should('contain', 'Mock City');
    cy.get('.weather-card-body > :nth-child(2)').should(
      'contain',
      'Sky: Mock sky'
    );
  });
});
