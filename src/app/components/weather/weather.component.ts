import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  weatherList: Array<any> = [];
  weatherForm: FormGroup;

  constructor(
    private readonly weatherService: WeatherService,
    private readonly router: Router
  ) {
    this.weatherForm = new FormGroup({
      cityName: new FormControl(''),
    });
  }

  getCoordinatesByCity() {
    const cityName = this.weatherForm.get('cityName')?.value;
    this.weatherService
      .getCoordinatesByCity(cityName)
      .subscribe((weatherData) => {
        this.getWeather(weatherData[0].lat, weatherData[0].lon, weatherData[0].name);
      });
  }

  getWeather(lat: number, lon: number, name: string) {
    this.weatherService.getWeatherData(lat, lon).subscribe((data) => {
      if (!this.cityDataExists(data.id)) {
        this.weatherList.push({ ...data, cityName: name });
      }
    });
  }

  goToDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }

  private cityDataExists(id: number): boolean {
    return this.weatherList.some((data) => data.id === id);
  }
}
