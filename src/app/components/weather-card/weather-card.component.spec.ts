import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCardComponent } from './weather-card.component';

describe('WeatherCardComponent', () => {
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return "fa fa-solid fa-cloud" for cloudy weather', () => {
    component.weatherDescription = 'Scattered clouds';

    const iconClass = component.getWeatherIcon();

    expect(iconClass).toBe('fa fa-solid fa-cloud');
  });

  it('should return "fa fa-sun-o" for sunny weather', () => {
    component.weatherDescription = 'Clear sky';

    const iconClass = component.getWeatherIcon();

    expect(iconClass).toBe('fa fa-sun-o');
  });

  it('should emit "removeCard" event with the card ID when removeWeather is called', () => {
    const cardId = 42;
    component.id = cardId;

    spyOn(component.removeCard, 'emit');

    component.removeWeather();

    expect(component.removeCard.emit).toHaveBeenCalledWith(cardId);
  });
});
