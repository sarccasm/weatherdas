import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch weather data', () => {
    const mockData = { name: 'Kyiv', main: { temp: 10 }, weather: [{ description: 'clear sky' }] };

    service.getWeather('Kyiv').subscribe((data) => {
      expect(data.name).toBe('Kyiv');
    });

    const req = httpMock.expectOne((req) => req.url.includes('Kyiv'));
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
