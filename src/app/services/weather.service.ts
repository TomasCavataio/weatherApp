import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '6946f14c1bde2e88258fdd8ba905ca3d';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private coordinatesUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  constructor(private http: HttpClient) {}

  getCoordinatesByCity(cityName: string): Observable<any> {
    const params = new HttpParams()
      .set('q', cityName)
      .set('appid', this.apiKey);

    return this.http.get(this.coordinatesUrl, { params });
  }

  getWeatherData(lat: number, lon: number): Observable<any> {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', this.apiKey)
      .set('units', 'metric');

    return this.http.get(this.apiUrl, { params });
  }
}
