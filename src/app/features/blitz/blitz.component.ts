import { ChangeDetectionStrategy, Component, effect, inject, viewChild } from '@angular/core';

import { BlitzBoardComponent, BlitzPanelComponent, BlitzResultComponent, BlitzScoreComponent } from '@features/blitz/components';
import { BlitzGameStatus } from '@features/blitz/models';
import { BlitzGridService, BlitzTimerService } from '@features/blitz/services';
import { BlitzStore } from '@features/blitz/store';

@Component({
  selector: 'blitz-root',
  standalone: true,
  imports: [BlitzBoardComponent, BlitzPanelComponent, BlitzScoreComponent, BlitzResultComponent],
  providers: [BlitzStore, BlitzTimerService, BlitzGridService],
  templateUrl: './blitz.component.html',
  styleUrl: './blitz.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlitzComponent {
  protected store = inject(BlitzStore);

  protected results = viewChild.required(BlitzResultComponent);

  constructor() {
    // Tracks game status and triggers the result modal when the game ends.
    effect(() => {
      if (this.store.gameStatus() === BlitzGameStatus.Finished) {
        this.results().open();
      }
    });
  }
}
