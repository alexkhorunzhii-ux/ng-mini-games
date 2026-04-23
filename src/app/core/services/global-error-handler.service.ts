import { ErrorHandler, inject, Injectable } from '@angular/core';
import { LoggerService } from '@core/services/logger.service';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  private logger = inject(LoggerService);

  handleError(error: unknown): void {
    this.logger.error('An error occurred:', error);
  }
}
