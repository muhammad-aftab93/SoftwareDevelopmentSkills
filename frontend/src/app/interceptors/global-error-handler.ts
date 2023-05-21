import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { GlobalErrorService } from '../services/global-error.service';


@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

  constructor(private injector: Injector) {
    super();
  }

  override handleError(error: any): void {
    const globalErrorService = this.injector.get(GlobalErrorService);
    globalErrorService.showError('Error', error.message);
  }
}

