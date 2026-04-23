import { Injectable } from '@angular/core';

@Injectable()
export class BlitzTimerService {
  private timerId: ReturnType<typeof setTimeout> | null = null;

  start(ms: number, callback: () => void): void {
    this.clear();
    this.timerId = setTimeout(callback, ms);
  }

  clear(): void {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}
