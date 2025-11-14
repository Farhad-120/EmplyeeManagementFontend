//import { Injectable } from '@angular/core';

//@Injectable({
//  providedIn: 'root'
//})
//export class NotifyServicesService {

//  constructor() { }
//}
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarContainer,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifyServicesService {
  constructor(private snackBar: MatSnackBar) { }

  success(message: string, actions: string) {
    let config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: 'primary',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };
    this.snackBar.open(message, actions, config);
  }
  fail(message: string, actions: string) {
    let config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: 'warn',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };
    this.snackBar.open(message, actions, config);
  }
}
