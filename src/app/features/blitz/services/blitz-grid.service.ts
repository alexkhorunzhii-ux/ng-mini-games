import { Injectable } from '@angular/core';
import { getRandomItem } from '@shared/utils';
import { BLITZ_BOARD_SIZE } from '@features/blitz/blitz.config';
import { BlitzBoardCell, BlitzCellState } from '@features/blitz/models';

@Injectable()
export class BlitzGridService {
  createGrid(): BlitzBoardCell[] {
    return Array.from({ length: BLITZ_BOARD_SIZE * BLITZ_BOARD_SIZE }, (_, i) => ({
      id: i,
      row: Math.floor(i / BLITZ_BOARD_SIZE),
      col: i % BLITZ_BOARD_SIZE,
      state: BlitzCellState.InActive,
    }));
  }

  getRandomCellId(cells: BlitzBoardCell[]): number | null {
    const inactive = cells.filter((cell) => cell.state === BlitzCellState.InActive);

    return getRandomItem(inactive)?.id ?? null;
  }
}
