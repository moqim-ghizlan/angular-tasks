import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiviteService } from '../services/activite.service';

@Component({
  imports: [],
  selector: 'app-consult-activite',
  styleUrl: './consult-activite.scss',
  templateUrl: './consult-activite.html',
})
export class ConsultActivite {
  readonly index: number;
  readonly activite: string | undefined;

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
  }

  supprimeElem(index: number): void {
    this.activiteService.removeItem(index);
    this.router.navigate(['/']);
  }
}
