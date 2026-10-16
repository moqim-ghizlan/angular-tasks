import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActiviteService {
  objectifs: string[] = [];

  removeItem(index: number): void {
    this.objectifs.splice(index, 1);
  }

  updateItem(index: number, titre: string): void {
    this.objectifs[index] = titre;
  }
}
