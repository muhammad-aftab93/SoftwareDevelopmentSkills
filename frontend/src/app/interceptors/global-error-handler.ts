import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { DialogService } from '../services/dialog.service';


@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

  constructor(private injector: Injector) {
    super();
  }

  override handleError(error: any): void {
    const globalErrorService = this.injector.get(DialogService);
    globalErrorService.showDialog('Error', error.message);
  }
}

