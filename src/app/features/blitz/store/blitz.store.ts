import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';

import { BlitzBoardCell, BlitzCellState, BlitzGameStatus, BlitzScore } from '@features/blitz/models';
import { BLITZ_DEFAULT_INTERVAL_MS, BLITZ_WIN_SCORE } from '@features/blitz/blitz.config';
import { BlitzGridService, BlitzTimerService } from '@features/blitz/services';

interface BlitzState {
  cells: BlitzBoardCell[];
  score: BlitzScore;
  intervalMs: number;
}

const initialState: BlitzState = {
  cells: [],
  score: { player: 0, opponent: 0 },
  intervalMs: BLITZ_DEFAULT_INTERVAL_MS,
};

export const BlitzStore = signalStore(
  withState(initialState),
  withComputed(({ score, cells }) => {
    const activeCellId = computed(() => cells().find((cell) => cell.state === BlitzCellState.Active)?.id ?? null);

    return {
      activeCellId,
      // Finished is checked first — wins even if an active cell exists.
      gameStatus: computed(() => {
        if (score().player >= BLITZ_WIN_SCORE || score().opponent >= BLITZ_WIN_SCORE) {
          return BlitzGameStatus.Finished;
        }

        if (activeCellId() !== null) {
          return BlitzGameStatus.InProgress;
        }

        return BlitzGameStatus.NotStarted;
      }),
    };
  }),
  withMethods((store, gridService = inject(BlitzGridService), timerService = inject(BlitzTimerService)) => {
    // Picks a random inactive cell, marks it Active, and starts the countdown.
    function activateNextCell(): void {
      if (store.gameStatus() === BlitzGameStatus.Finished) {
        return;
      }

      const activeCellId = gridService.getRandomCellId(store.cells());

      if (activeCellId === null) {
        return;
      }

      patchState(store, (state) => ({
        cells: state.cells.map((cell) =>
          cell.id === activeCellId ? { ...cell, state: BlitzCellState.Active } : cell,
        ),
      }));

      timerService.start(store.intervalMs(), onTimeout);
    }

    // Called when the player misses the active cell within the interval.
    function onTimeout(): void {
      // Snapshot before patchState — activeCellId() returns null after cells update.
      const activeCellId = store.activeCellId();

      patchState(store, (state) => ({
        score: { ...state.score, opponent: state.score.opponent + 1 },
        cells: state.cells.map((cell) =>
          cell.id === activeCellId ? { ...cell, state: BlitzCellState.Missed } : cell,
        ),
      }));

      activateNextCell();
    }

    return {
      start(intervalMs: number): void {
        if (store.gameStatus() === BlitzGameStatus.InProgress) {
          return;
        }

        if (intervalMs <= 0) {
          return;
        }

        timerService.clear();

        patchState(store, {
          cells: gridService.createGrid(),
          score: { player: 0, opponent: 0 },
          intervalMs,
        });

        activateNextCell();
      },
      reset(): void {
        timerService.clear();
        
        patchState(store, {
          cells: gridService.createGrid(),
          score: { player: 0, opponent: 0 },
        });
      },
      clickCell(cellId: number): void {
        if (store.gameStatus() !== BlitzGameStatus.InProgress) {
          return;
        }

        if (store.activeCellId() !== cellId) {
          return;
        }

        timerService.clear();

        patchState(store, (state) => ({
          score: { ...state.score, player: state.score.player + 1 },
          cells: state.cells.map((cell) =>
            cell.id === cellId ? { ...cell, state: BlitzCellState.Hit } : cell,
          ),
        }));

        activateNextCell();
      },
    };
  }),
  withHooks((store, timerService = inject(BlitzTimerService)) => ({
    onInit() {
      store.reset();
    },
    onDestroy() {
      timerService.clear();
    },
  })),
);
