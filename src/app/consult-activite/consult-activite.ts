import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-consult-activite',
  styleUrl: './consult-activite.scss',
  templateUrl: './consult-activite.html',
})
export class ConsultActivite {
  readonly id: string | undefined;
  readonly param2: string | undefined;

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    this.param2 = this.route.snapshot.params['param2'];
  }
}
