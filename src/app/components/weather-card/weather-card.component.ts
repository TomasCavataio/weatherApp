import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent {
  @Input() cityName: string | undefined;
  @Input() state: string | undefined;
  @Input() temperature: number | undefined;
  @Input() weatherDescription: string | undefined;
  @Input() humidity: number | undefined;
  @Input() windSpeed: number | undefined;
  @Input() weatherIconUrl: string | undefined = 'src/assets/sun.jpg';

  @Output() removeCard = new EventEmitter<string>();

  getWeatherIcon() {
    return this.weatherDescription?.includes('clouds')
      ? 'fa fa-solid fa-cloud'
      : 'fa fa-sun-o';
  }

  removeWeather() {
    this.removeCard.emit(this.cityName);
  }
}
