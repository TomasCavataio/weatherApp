import { WeatherCard } from '../models/weather.model';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;

  const mockState = [
    {
      id: 1,
      cityName: 'madrid'
    },
  ] as Array<WeatherCard>;

  beforeEach(() => {
    localStorageService = new LocalStorageService();
  });

  it('should be created', () => {
    expect(localStorageService).toBeTruthy();
  });

  it('should return undefined when getting state from empty local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const state = localStorageService.getState();
    expect(state).toBeUndefined();
  });

  it('should return the parsed state when getting state from local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockState));
    const state = localStorageService.getState();
    expect(state).toEqual(mockState);
  });

  it('should set state in local storage', () => {

    const setItemSpy = spyOn(localStorage, 'setItem');
    localStorageService.setState(mockState);
    expect(setItemSpy).toHaveBeenCalledWith(
      'weather_app_state',
      JSON.stringify(mockState)
    );
  });
});
