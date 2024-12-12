import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityInputComponent } from './city-input/city-input.component';
import { CityCardComponent } from './city-card/city-card.component';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CityInputComponent, CityCardComponent],
  template: `
    <div class="app-container">
      <h1>Weather Dashboard</h1>
      <app-city-input (cityAdded)="addCity($event)"></app-city-input>
      <div class="city-list">
        <app-city-card
          *ngFor="let city of cities"
          [city]="city"
          (cityRemoved)="removeCity($event)">
        </app-city-card>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cities: any[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    const savedCities = localStorage.getItem('cities');
    if (savedCities) {
      this.cities = JSON.parse(savedCities); 
    }
  }

  addCity(cityName: string) {
    this.weatherService.getWeather(cityName).subscribe({
      next: (data) => {
        this.cities.push(data);
        this.saveCitiesToLocalStorage(); 
      },
      error: () => {
        alert('Місто не знайдено!');
      }
    });
  }

  removeCity(cityName: string) {
    this.cities = this.cities.filter(city => city.name !== cityName);
    this.saveCitiesToLocalStorage(); 
  }

  saveCitiesToLocalStorage() {
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }
}
