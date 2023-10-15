import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent {
  @Input() id: number | undefined;
  @Input() isMainCard: boolean | undefined;
  @Input() cityName: string | undefined;
  @Input() state: string | undefined;
  @Input() temperature: number | undefined;
  @Input() weatherDescription: string | undefined;
  @Input() humidity: number | undefined;
  @Input() windSpeed: number | undefined;
  @Input() weatherIconUrl: string | undefined = 'src/assets/sun.jpg';

  @Output() removeCard = new EventEmitter<number>();

  isCloudy: boolean | undefined;

  getWeatherIcon() {
    if (this.weatherDescription?.includes('clouds')) {
      this.isCloudy = true;
      return 'fa fa-solid fa-cloud';
    }
    this.isCloudy = false;
    return 'fa fa-sun-o';
  }

  removeWeather() {
    this.removeCard.emit(this.id);
  }
}
