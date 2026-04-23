import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BlitzScore } from '@features/blitz/models';

@Component({
  selector: 'blitz-score',
  standalone: true,
  imports: [],
  templateUrl: './blitz-score.component.html',
  styleUrl: './blitz-score.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlitzScoreComponent {
  score = input<BlitzScore>({ player: 0, opponent: 0 });
}
