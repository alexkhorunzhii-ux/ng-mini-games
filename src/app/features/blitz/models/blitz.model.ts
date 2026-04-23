export enum BlitzCellState {
  InActive = 'in-active',
  Active = 'active',
  Hit = 'hit',
  Missed = 'missed',
}

export interface BlitzScore {
  player: number;
  opponent: number;
}

export interface BlitzBoardCell {
  id: number;
  row: number;
  col: number;
  state: BlitzCellState;
}

export enum BlitzGameStatus {
  NotStarted = 'not-started',
  InProgress = 'in-progress',
  Finished = 'finished',
}
