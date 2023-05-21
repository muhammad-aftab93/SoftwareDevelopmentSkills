import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorService {

  constructor(private dialog: MatDialog) {}

  showError(title: string, message: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message,
      },
    });
  }

  hideError(): void {
    this.dialog.closeAll();
  }

}
