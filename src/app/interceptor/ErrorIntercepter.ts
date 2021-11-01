import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(private _snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            this.openSnackBar('status : ' + err.status + '\n' + 'message : ' + err.error.message, 'Close');
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 0,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
}