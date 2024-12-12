import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-city-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <input type="text" [(ngModel)]="cityName" placeholder="Введіть назву міста" />
      <button (click)="addCity()">Додати</button>
    </div>
  `,
  styleUrls: ['./city-input.component.scss']
})
export class CityInputComponent {
  cityName: string = '';
  @Output() cityAdded = new EventEmitter<string>();

  addCity() {
    if (this.cityName.trim()) {
      this.cityAdded.emit(this.cityName.trim());
      this.cityName = '';
    }
  }
}
