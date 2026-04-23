import { ChangeDetectionStrategy, Component, computed, input, output, viewChild } from '@angular/core';
import { ModalComponent } from '@shared/components';
import { BlitzScore } from '@features/blitz/models';
import { BLITZ_WIN_SCORE } from '@features/blitz/blitz.config';

@Component({
  selector: 'blitz-result',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './blitz-result.component.html',
  styleUrl: './blitz-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlitzResultComponent {
  score = input<BlitzScore>({ player: 0, opponent: 0 });
  closeResult = output<void>();

  winner = computed(() =>
    this.score().player >= BLITZ_WIN_SCORE ? 'You win!' : 'Computer wins!',
  );

  private modal = viewChild.required(ModalComponent);

  open(): void {
    this.modal().open();
  }
}
