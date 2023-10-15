import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get coordinates by city name', () => {
    const cityName = 'London';
    const expectedData = { lat: 51.5074, lon: -0.1278 };

    service.getCoordinatesByCity(cityName).subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne((request) => {
      return request.url === service['coordinatesUrl'];
    });

    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });

  it('should get weather data by latitude and longitude', () => {
    const lat = 51.5074;
    const lon = -0.1278;
    const expectedData = { main: { temp: 21.5 } };

    service.getWeatherData(lat, lon).subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne((request) => {
      return request.url === service['apiUrl'];
    });

    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
