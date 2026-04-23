import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BLITZ_DEFAULT_INTERVAL_MS } from '@features/blitz/blitz.config';
import { BlitzGameStatus } from '@features/blitz/models';
import { ButtonComponent } from '@shared/components';

@Component({
  selector: 'blitz-panel',
  standalone: true,
  imports: [ButtonComponent, FormsModule],
  templateUrl: './blitz-panel.component.html',
  styleUrl: './blitz-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlitzPanelComponent {
  gameStatus = input<BlitzGameStatus>();
  gameStart = output<number>();

  protected readonly GameStatus = BlitzGameStatus;
  intervalMs = BLITZ_DEFAULT_INTERVAL_MS;

  onStart(): void {
    this.gameStart.emit(this.intervalMs);
  }
}
