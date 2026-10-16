import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  objectifText: string = '';
  objectifs: string[] = [];
  indexModification: number | null = null;

  get nbItems(): number {
    return this.objectifs.length;
  }

  ajoutItem(): void {
    const objectif = this.objectifText.trim();
    if (!objectif) {
      return;
    }
    if (this.indexModification === null) {
      this.objectifs.push(objectif);
    } else {
      this.objectifs[this.indexModification] = objectif;
    }
    this.annulerModification();
  }

  modifierItem(index: number): void {
    this.indexModification = index;
    this.objectifText = this.objectifs[index];
  }

  annulerModification(): void {
    this.indexModification = null;
    this.objectifText = '';
  }

  supprimerItem(index: number): void {
    this.objectifs.splice(index, 1);
    if (this.indexModification === index) {
      this.annulerModification();
    } else if (this.indexModification !== null && index < this.indexModification) {
      this.indexModification--;
    }
  }
}
