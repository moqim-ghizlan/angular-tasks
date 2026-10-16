import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiviteService } from '../services/activite.service';

@Component({
  imports: [FormsModule],
  selector: 'app-consult-activite',
  styleUrl: './consult-activite.scss',
  templateUrl: './consult-activite.html',
})
export class ConsultActivite {
  readonly index: number;
  activite: string | undefined;
  titreModifie = '';
  editionEnCours = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activiteService: ActiviteService,
  ) {
    const routeIndex = Number(this.route.snapshot.params['id']);
    this.index = Number.isInteger(routeIndex) && routeIndex >= 0 ? routeIndex : -1;
    this.activite = this.index >= 0
      ? this.activiteService.objectifs[this.index]
      : undefined;
    this.titreModifie = this.activite ?? '';
  }

  supprimeElem(index: number): void {
    this.activiteService.removeItem(index);
    this.router.navigate(['/']);
  }

  modifierTitre(): void {
    if (this.activite !== undefined) {
      this.titreModifie = this.activite;
      this.editionEnCours = true;
    }
  }

  sauvegarderTitre(): void {
    const titre = this.titreModifie.trim();
    if (!titre || this.activite === undefined) {
      return;
    }

    this.activiteService.updateItem(this.index, titre);
    this.activite = titre;
    this.titreModifie = titre;
    this.editionEnCours = false;
  }

  retour(): void {
    this.router.navigate(['/']);
  }
}
