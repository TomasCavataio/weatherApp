import { createReducer, on } from '@ngrx/store';
import * as WeatherCardActions from './actions';
import { WeatherCard } from '../models/weather.model';

export interface AppState {
  weatherList: Array<WeatherCard>;
}

export const initialState: AppState = {
  weatherList: [],
};

export const weatherReducer = createReducer(
  initialState,
  on(WeatherCardActions.storeWeatherList, (state, { list }) => {
    console.log('State before update:', state);
    const newState = {
      ...state,
      weatherList: list,
    };
    console.log('State after update:', newState);
    return newState;
  }),
  on(WeatherCardActions.removeWeatherCard, (state, { cardId }) => ({
    ...state,
    weatherList: state.weatherList.filter((card) => card.id !== cardId),
  }))
);
