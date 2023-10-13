import { createAction, props } from '@ngrx/store';
import { WeatherCard } from '../models/weather.model';

export const storeWeatherList = createAction(
  '[Weather List] Add',
  props<{ list: Array<WeatherCard> }>()
);

export const removeWeatherCard = createAction(
  '[Weather Card] Remove',
  props<{ cardId: number }>()
);
