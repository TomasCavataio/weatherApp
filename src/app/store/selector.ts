import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './reducer';

export const selectWeatherCardsState = createFeatureSelector<AppState>('weatherList');

export const selectWeatherList = createSelector(
  selectWeatherCardsState,
  (weatherCardsState: AppState) => weatherCardsState.weatherList
);
