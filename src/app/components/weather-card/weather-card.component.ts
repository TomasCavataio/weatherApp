import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {
  @Input() id: number | undefined;
  @Input() cityName: string | undefined;
  @Input() state: string | undefined;
  @Input() temperature: number | undefined;
  @Input() weatherDescription: string | undefined;
  @Input() humidity: number | undefined;
  @Input() windSpeed: number | undefined;
  @Input() weatherIconUrl: string | undefined = 'src/assets/sun.jpg';

  @Output() removeCard = new EventEmitter<number>();

  constructor(private readonly router: Router) {}

  getWeatherIcon() {
    return this.weatherDescription?.includes('clouds')
      ? 'fa fa-solid fa-cloud'
      : 'fa fa-sun-o';
  }

  removeWeather() {
    this.removeCard.emit(this.id);
  }

  goToDetail() {
    this.router.navigate(['/detail', this.id]);
  }
}
