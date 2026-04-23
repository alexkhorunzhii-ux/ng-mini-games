import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

import { BlitzBoardCell, BlitzCellState } from '@features/blitz/models';

@Component({
  selector: 'blitz-cell',
  standalone: true,
  imports: [NgClass],
  templateUrl: './blitz-cell.component.html',
  styleUrl: './blitz-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlitzCellComponent {
  cell = input.required<BlitzBoardCell>();
  cellClick = output<void>();

  cellClasses = computed(() => {
    const { state } = this.cell();
    
    return {
      'blitz-cell--active': state === BlitzCellState.Active,
      'blitz-cell--hit': state === BlitzCellState.Hit,
      'blitz-cell--missed': state === BlitzCellState.Missed,
    };
  });

  isDisabled = computed(() => {
    const { state } = this.cell();

    return state === BlitzCellState.Hit || state === BlitzCellState.Missed;
  });
}
