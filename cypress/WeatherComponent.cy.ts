/// <reference types="cypress" />

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { WeatherService } from '../src/app/services/weather.service';
import { weatherReducer } from '../src/app/store/reducer';
import { WeatherComponent } from '../src/app/components/weather/weather.component';

describe('WeatherComponent Tests', () => {
  beforeEach(() => {
    cy.mount(WeatherComponent, {
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ weatherList: weatherReducer }),
      ],
      providers: [WeatherService],
    });
  });

  it('should display WeatherComponent', () => {
    cy.get('.weather-container').should('exist');
  });

  it('should display a header with buttons', () => {
    cy.get('header').should('exist');
    cy.get('.header-buttons > button').should('have.length', 2);
  });

  it('should display input with buttons', () => {
    cy.get('input').should('exist');
    cy.get('form > button').should('have.length', 2);
  });
});
