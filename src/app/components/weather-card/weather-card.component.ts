import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
})
export class WeatherCardComponent {
  @Input() cityName: string | undefined;
  @Input() temperature: number | undefined;
  @Input() weatherDescription: string | undefined;
  @Input() humidity: number | undefined;
  @Input() windSpeed: number | undefined;
  @Input() weatherIconUrl: string | undefined;
}
