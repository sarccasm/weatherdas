import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="city-card">
      <h3>{{ city.name }}</h3>
      <p>Температура: {{ city.main.temp }}°C</p>
      <p>Погода: {{ city.weather[0].description }}</p>
      <button (click)="removeCity()">Видалити</button>
      <button (click)="toggleForecast()">Прогноз</button>
      <div *ngIf="showForecast">
        <p>Прогноз на кілька днів:</p>
        <ul>
          <li *ngFor="let day of forecast">{{ day }}</li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./city-card.component.css']
})
export class CityCardComponent {
  @Input() city: any;
  @Output() cityRemoved = new EventEmitter<string>();
  showForecast = false;
  forecast: string[] = []; 

  removeCity() {
    this.cityRemoved.emit(this.city.name);
  }

  toggleForecast() {
    this.showForecast = !this.showForecast;
    if (this.showForecast) {
      this.forecast = ['День 1: Сонячно', 'День 2: Дощ', 'День 3: Хмарно'];
    }
  }
}
