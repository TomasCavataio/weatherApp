import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { WeatherService } from '../../services/weather.service';
import * as WeatherCardActions from '../../store/actions';
import { WeatherComponent } from './weather.component';
import { WeatherCard } from 'src/app/models/weather.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: WeatherService;
  let store: Store;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        HttpClientTestingModule,
      ],
      providers: [WeatherService, LocalStorageService],
    });

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
    store = TestBed.inject(Store);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getWeather with geolocation coordinates when geolocation is available', () => {
    const position = {
      coords: {
        latitude: 42.3601,
        longitude: -71.0589,
      },
    } as GeolocationPosition;
    const getWeatherSpy = spyOn(component, 'getWeather');
    const geolocation = navigator.geolocation;

    geolocation.getCurrentPosition = (successCallback: PositionCallback) => {
      successCallback(position);
    };

    component.ngOnInit();

    expect(getWeatherSpy).toHaveBeenCalledWith(
      position.coords.latitude,
      position.coords.longitude
    );
  });

  it('should call getWeather with coordinates when getCoordinatesByCity is called', () => {
    const cityName = 'Boston';
    const response = [
      { lat: 42.3601, lon: -71.0589, name: 'Boston', state: 'MA' },
    ];
    const getWeatherSpy = spyOn(component, 'getWeather');
    spyOn(weatherService, 'getCoordinatesByCity').and.returnValue(of(response));

    component.weatherForm.get('cityName')?.setValue(cityName);
    component.getCoordinatesByCity();

    expect(getWeatherSpy).toHaveBeenCalledWith(
      response[0].lat,
      response[0].lon,
      response[0].name,
      response[0].state
    );
  });

  it('should add weather data to the list when getWeather is called', () => {
    const lat = 42.0;
    const lon = -73.0;
    const name = 'CityName';
    const state = 'StateName';
    const weatherData = {
      id: 1,
      name: 'City',
      state: 'State',
      main: { temp: 23 },
    };

    spyOn(weatherService, 'getWeatherData').and.returnValue(of(weatherData));

    component.getWeather(lat, lon, name, state);

    expect(component.weatherList.length).toBe(1);
    expect(component.weatherList[0].cityName).toBe(name);
    expect(component.weatherList[0].state).toBe(state);
  });

  it('should remove the entire weather list when removeWeatherList is called', () => {
    component.weatherList = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ] as Array<WeatherCard>;

    component.removeWeatherList();

    expect(component.weatherList.length).toBe(0);
  });

  it('should remove a specific card when removeCard is called', () => {
    component.weatherList = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ] as Array<WeatherCard>;

    component.removeCard(2);

    expect(component.weatherList.length).toBe(2);
    expect(component.weatherList[0].id).toBe(1);
    expect(component.weatherList[1].id).toBe(3);
  });

  it('should dispatch storeWeatherList action and update local storage when saveWeatherList is called', () => {
    const mockWeatherList = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ] as Array<WeatherCard>;

    spyOn(store, 'dispatch');
    spyOn(localStorageService, 'setState');

    component.weatherList = mockWeatherList;
    component.saveWeatherList();

    expect(store.dispatch).toHaveBeenCalledWith(
      WeatherCardActions.storeWeatherList({ list: mockWeatherList })
    );
    expect(localStorageService.setState).toHaveBeenCalledWith(mockWeatherList);
  });

  it('should update weatherList when getWeatherList is called', () => {
    const mockWeatherList = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ] as Array<WeatherCard>;

    spyOn(store, 'select').and.returnValue(of(mockWeatherList));

    component.getWeatherList();

    expect(component.weatherList).toEqual(mockWeatherList);
  });

  it('should return true for isMainCard when index is 0', () => {
    const index = 0;

    const result = component.isMainCard(index);

    expect(result).toBe(true);
  });

  it('should return false for isMainCard when index is not 0', () => {
    const index = 2;

    const result = component.isMainCard(index);

    expect(result).toBe(false);
  });
});
