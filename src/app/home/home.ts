import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActiviteService } from '../services/activite.service';

@Component({
  imports: [FormsModule],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  constructor(
    private monRouteur: Router,
    readonly activiteService: ActiviteService,
  ) {}

  objectifText: string = '';
  indexModification: number | null = null;

  get objectifs(): string[] {
    return this.activiteService.objectifs;
  }

  set objectifs(objectifs: string[]) {
    this.activiteService.objectifs = objectifs;
  }

  get nbItems(): number {
    return this.activiteService.objectifs.length;
  }

  ajoutItem(): void {
    const objectif = this.objectifText.trim();
    if (!objectif) {
      return;
    }
    if (this.indexModification === null) {
      this.activiteService.objectifs.push(objectif);
      // setTimeout(() => {
      //   this.monRouteur.navigate(['/about']);
      // }, 1000);
    } else {
      this.activiteService.objectifs[this.indexModification] = objectif;
    }
    this.annulerModification();
  }

  modifierItem(index: number): void {
    this.indexModification = index;
    this.objectifText = this.activiteService.objectifs[index];
  }

  annulerModification(): void {
    this.indexModification = null;
    this.objectifText = '';
  }

  supprimerItem(index: number): void {
    this.activiteService.objectifs.splice(index, 1);
    if (this.indexModification === index) {
      this.annulerModification();
    } else if (this.indexModification !== null && index < this.indexModification) {
      this.indexModification--;
    }
  }
}
