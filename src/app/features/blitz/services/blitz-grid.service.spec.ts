import { BlitzGridService } from './blitz-grid.service';
import { BlitzCellState } from '@features/blitz/models';
import { BLITZ_BOARD_SIZE } from '@features/blitz/blitz.config';

describe('BlitzGridService', () => {
  let service: BlitzGridService;

  beforeEach(() => {
    service = new BlitzGridService();
  });

  describe('createGrid', () => {
    it('creates correct number of cells', () => {
      expect(service.createGrid()).toHaveLength(BLITZ_BOARD_SIZE * BLITZ_BOARD_SIZE);
    });

    it('should assign ids starting from 0', () => {
      const cells = service.createGrid();
      expect(cells[0].id).toBe(0);
      expect(cells[BLITZ_BOARD_SIZE * BLITZ_BOARD_SIZE - 1].id).toBe(BLITZ_BOARD_SIZE * BLITZ_BOARD_SIZE - 1);
    });

    it('should calculate row and col correctly', () => {
      const cells = service.createGrid();
      expect(cells[0]).toMatchObject({ row: 0, col: 0 });
      expect(cells[BLITZ_BOARD_SIZE]).toMatchObject({ row: 1, col: 0 });
      expect(cells[BLITZ_BOARD_SIZE + 1]).toMatchObject({ row: 1, col: 1 });
    });

    it('should init all cells as InActive', () => {
      const cells = service.createGrid();
      expect(cells.every((cell) => cell.state === BlitzCellState.InActive)).toBe(true);
    });
  });

  describe('getRandomCellId', () => {
    it('should return null when no inactive cells', () => {
      const cells = service.createGrid().map((cell) => ({ ...cell, state: BlitzCellState.Hit }));
      expect(service.getRandomCellId(cells)).toBeNull();
    });

    it('should return an id within valid range', () => {
      const cells = service.createGrid();
      const id = service.getRandomCellId(cells);
      expect(id).toBeGreaterThanOrEqual(0);
      expect(id).toBeLessThan(BLITZ_BOARD_SIZE * BLITZ_BOARD_SIZE);
    });

    it('should only picks from inactive cells', () => {
      const cells = service
        .createGrid()
        .map((cell) => ({ ...cell, state: BlitzCellState.Hit }));
      cells[5] = { ...cells[5], state: BlitzCellState.InActive };
      expect(service.getRandomCellId(cells)).toBe(5);
    });
  });
});
