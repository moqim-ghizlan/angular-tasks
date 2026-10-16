import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiviteService } from '../services/activite.service';

@Component({
  imports: [],
  selector: 'app-consult-activite',
  styleUrl: './consult-activite.scss',
  templateUrl: './consult-activite.html',
})
export class ConsultActivite {
  readonly activite: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private activiteService: ActiviteService,
  ) {
    const index = Number(this.route.snapshot.params['id']);
    this.activite = Number.isInteger(index) && index >= 0
      ? this.activiteService.objectifs[index]
      : undefined;
  }
}
