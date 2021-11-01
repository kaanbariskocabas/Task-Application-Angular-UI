import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Timer } from '../model/timer.model';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  //private apiUrl = environment.apiUrl;
  private baseApiUrl = "/api/v1/timer";
  private startApiUrlSuffix = "/start";
  private pauseApiUrlSuffix = "/pause";
  private resumeApiUrlSuffix = "/resume";
  private finishApiUrlSuffix = "/finish";
  private cancelApiUrlSuffix = "/cancel";

  constructor(private http: HttpClient) { }

  create(workCycleInMinutes?: number, breakCycleInMinutes?: number): Observable<HttpResponse<Timer>> {
    return this.http.post<Timer>(this.baseApiUrl, { "workCycleInMinutes": workCycleInMinutes, "breakCycleInMinutes": breakCycleInMinutes }, { observe: "response" });
  }

  start(timerId: number): Observable<HttpResponse<Timer>> {
    return this.http.put<Timer>(this.baseApiUrl + "/" + timerId + this.startApiUrlSuffix, undefined, { observe: "response" });
  }

  resume(timerId: number): Observable<HttpResponse<Timer>> {
    return this.http.put<Timer>(this.baseApiUrl + "/" + timerId + this.resumeApiUrlSuffix, undefined, { observe: "response" });
  }

  finish(timerId: number): Observable<HttpResponse<Timer>> {
    return this.http.put<Timer>(this.baseApiUrl + "/" + timerId + this.finishApiUrlSuffix, undefined, { observe: "response" });
  }

  pause(timerId: number, passedWorkTimeInSeconds: number): Observable<HttpResponse<Timer>> {
    return this.http.put<Timer>(this.baseApiUrl + "/" + timerId + this.pauseApiUrlSuffix, undefined, {
      observe: "response",
      params: this.getParams(passedWorkTimeInSeconds)
    });
  }

  cancel(timerId: number, passedWorkTimeInSeconds: number, passedBreakTimeInSeconds: number): Observable<HttpResponse<Timer>> {
    return this.http.put<Timer>(this.baseApiUrl + "/" + timerId + this.cancelApiUrlSuffix, undefined, {
      observe: "response",
      params: this.getParams(passedWorkTimeInSeconds, passedBreakTimeInSeconds)
    });
  }

  private getParams(passedWorkTimeInSeconds?: number, passedBreakTimeInSeconds?: number) {
    let params = new HttpParams();
    if (passedWorkTimeInSeconds) params = params.set("passedWorkTimeInSeconds", passedWorkTimeInSeconds.toString());
    if (passedBreakTimeInSeconds) params = params.set("passedBreakTimeInSeconds", passedBreakTimeInSeconds.toString());
    return params;
  }
}
