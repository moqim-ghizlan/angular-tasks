import { Component } from '@angular/core';
import { ActiviteService } from '../services/activite.service';

@Component({
  imports: [],
  selector: 'app-about',
  styleUrl: './about.scss',
  templateUrl: './about.html',
})
export class About {
  readonly activiteService: ActiviteService;

  constructor(activiteService: ActiviteService) {
    this.activiteService = activiteService;
  }
}
