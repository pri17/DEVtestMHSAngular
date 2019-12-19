import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GridDataResult } from '@progress/kendo-angular-grid';
import {
  toDataSourceRequestString,
  DataSourceRequestState
} from '@progress/kendo-data-query';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, tap, catchError, retry } from 'rxjs/operators';
import { MHSMessageContentContract } from './mhsmessage-content-contract';
import { ValidationErrorContract } from './validation-error-contract';

@Injectable({ providedIn: 'root' })
export class MessageService extends BehaviorSubject<GridDataResult> {

  // private url1 = 'Message/GetLists';
  private url2 = 'Message/getCount';

  public loading: boolean;
  // private count$: number = 10;

  constructor(private http: HttpClient) { super(null); }

  public query(state: any, url: string): void {

    // this.http.get(this.url2)
    //     .subscribe((data:number) => this.count$ = data );

    this.fetch(state, url)
      .subscribe(x => super.next(x));
  }

  GetMessageContent(messageId: number): Observable<MHSMessageContentContract> {
    const url = `Message/GetMessageContent?id=${messageId}`;
    return this.http.get<MHSMessageContentContract>(url).pipe(
      catchError(this.handleError)
    );
  }

  ValidateMessage(messageId: number, messageContent: string): Observable<ValidationErrorContract[]> {
    const url = `Message/ValidateMessage?id=${messageId}`;
    const bodyData = { messageContent };
    return this.http.post<ValidationErrorContract[]>(url, bodyData).pipe(
        retry(3),
        catchError(this.handleError)
    );
  }

  UpdateMessage(messageId: number, messageContent: string) {
    const url = `Message/UpdateMessage?id=${messageId}`;
    const bodyData = { messageContent };
    return this.http.put(url, bodyData).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  protected fetch(state: DataSourceRequestState, url: string): Observable<GridDataResult> {
    const queryStr = `${toDataSourceRequestString(state)}`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
    this.loading = true;
    return this.http
        .post(`${url}?${queryStr}`,{responseType: 'json', headers, body: {conversation: '123'}})
        .pipe(
            map(response => (
              {
                data:  response['Data'],
                total: response['Total']
              } as GridDataResult)
              ),
            tap(() => this.loading = false),
            retry(3),
            catchError(this.handleError)
        );
  }

  public getConList(state: DataSourceRequestState, url: string, ConID: string): Observable<GridDataResult>{
    const headers = new HttpHeaders({ 'Content-Type': 'json'});
    const queryStr = `${toDataSourceRequestString(state)}`;

    return this.http.post(`${url}?${queryStr}&id=${ConID}`, {responseType: 'json', headers})
    .pipe(
      map(response => (
        {
          data:  response['Data'],
          total: response['Total']
        } as GridDataResult)
        ),
      tap(() => this.loading = false),
      retry(3),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  public goChangeState(currentState: string, id: string){
    const headers = new HttpHeaders({ 'Content-Type': 'json'});

    return this.http.post( `Message/ChangeState?currentState=${currentState}&squenceID=${id}`,
              {responseType: 'json', headers})
    .pipe(
      retry(3), // retry three times
      catchError(this.handleError));
  }

  public searchMessageContent(state: DataSourceRequestState, url:string, keyword:string): Observable<GridDataResult>{
    const headers = new HttpHeaders({ 'Content-Type': 'json'});
    const queryStr = `${toDataSourceRequestString(state)}`;

    return this.http.post(`${url}?${queryStr}&keyword=${keyword}`, {responseType: 'json', headers})
    .pipe(
      map(response => (
        {
          data:  response['Data'],
          total: response['Total']
        } as GridDataResult)
        ),
      tap(() => this.loading = false),
      retry(3), // retry three times
      catchError(this.handleError));
  }
}
