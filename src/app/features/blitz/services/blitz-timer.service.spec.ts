import { BlitzTimerService } from './blitz-timer.service';

describe('BlitzTimerService', () => {
  let service: BlitzTimerService;

  beforeEach(() => {
    service = new BlitzTimerService();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('start', () => {
    it('should call callback after given delay', () => {
      const callback = vi.fn();
      service.start(1000, callback);
      vi.advanceTimersByTime(1000);
      expect(callback).toHaveBeenCalledOnce();
    });

    it('should not call callback before delay elapses', () => {
      const callback = vi.fn();
      service.start(1000, callback);
      vi.advanceTimersByTime(999);
      expect(callback).not.toHaveBeenCalled();
    });

    it('should clear previous timer when called again', () => {
      const first = vi.fn();
      const second = vi.fn();
      service.start(1000, first);
      service.start(1000, second);
      vi.advanceTimersByTime(1000);
      expect(first).not.toHaveBeenCalled();
      expect(second).toHaveBeenCalledOnce();
    });
  });

  describe('clear', () => {
    it('should prevent callback from firing', () => {
      const callback = vi.fn();
      service.start(1000, callback);
      service.clear();
      vi.advanceTimersByTime(1000);
      expect(callback).not.toHaveBeenCalled();
    });

    it('should not throw when no active timer', () => {
      expect(() => service.clear()).not.toThrow();
    });
  });
});
