import { Injectable } from '@angular/core';
import { AppState } from '../store/reducer';
import { WeatherCard } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly STORAGE_KEY = 'weather_app_state';

  getState(): Array<WeatherCard> | undefined {
    const state = localStorage.getItem(this.STORAGE_KEY);
    return state ? JSON.parse(state) : undefined;
  }

  setState(state: Array<WeatherCard>): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }
}
