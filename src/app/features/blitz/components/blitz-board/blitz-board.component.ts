import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BlitzCellComponent } from '../blitz-cell/blitz-cell.component';
import { BlitzBoardCell } from '@features/blitz/models';
import { BLITZ_BOARD_SIZE } from '@features/blitz/blitz.config';

@Component({
  selector: 'blitz-board',
  standalone: true,
  imports: [BlitzCellComponent],
  templateUrl: './blitz-board.component.html',
  styleUrl: './blitz-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlitzBoardComponent {
  cells = input<BlitzBoardCell[]>([]);
  cellClick = output<number>();

  readonly gridColumns = `repeat(${BLITZ_BOARD_SIZE}, minmax(10px, 40px))`;
}
