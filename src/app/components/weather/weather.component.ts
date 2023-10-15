import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { Store } from '@ngrx/store';
import * as WeatherCardActions from '../../store/actions';
import { selectWeatherList } from 'src/app/store/selector';
import { WeatherCard } from 'src/app/models/weather.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AppState } from 'src/app/store/reducer';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weatherList: Array<WeatherCard> = [];
  weatherForm: FormGroup;

  constructor(
    private readonly weatherService: WeatherService,
    private readonly localStorageService: LocalStorageService,
    private store: Store
  ) {
    this.weatherForm = new FormGroup({
      cityName: new FormControl(''),
    });
  }

  ngOnInit() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          this.getWeather(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
    const savedState = this.localStorageService.getState();
    if (savedState) {
      this.store.dispatch(
        WeatherCardActions.storeWeatherList({ list: savedState })
      );
    }
  }

  getCoordinatesByCity() {
    const cityName = this.weatherForm.get('cityName')?.value;
    this.weatherService
      .getCoordinatesByCity(cityName)
      .subscribe((weatherData) => {
        this.getWeather(
          weatherData[0].lat,
          weatherData[0].lon,
          weatherData[0].name,
          weatherData[0].state
        );
      });
  }

  getWeather(lat: number, lon: number, name?: string, state?: string) {
    this.weatherService.getWeatherData(lat, lon).subscribe((data) => {
      if (!this.cityDataExists(data.id)) {
        this.weatherList.push({
          ...data,
          cityName: name,
          state: state,
          main: {
            ...data.main,
            temp: Math.round(data.main.temp),
          },
        });
      }
    });
  }

  removeWeatherList() {
    this.weatherList = [];
  }

  removeCard(id: number) {
    this.weatherList = this.weatherList.filter((card) => card.id !== id);
  }

  saveWeatherList() {
    this.store.dispatch(
      WeatherCardActions.storeWeatherList({ list: this.weatherList })
    );
    this.localStorageService.setState(this.weatherList);
  }

  getWeatherList() {
    this.store
      .select(selectWeatherList)
      .subscribe((list: Array<WeatherCard>) => {
        this.weatherList = list;
      });
  }

  isMainCard(i: number) {
    return i === 0;
  }

  private cityDataExists(id: number): boolean {
    return this.weatherList.some((data) => data.id === id);
  }
}
