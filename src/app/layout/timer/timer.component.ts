import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Timer } from 'src/app/model/timer.model';
import { TimerService } from 'src/app/service/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {

  isTimerCreated = false;
  isTimerStarted = false;
  timer!: Timer;
  workTimeInSeconds = 5 * 60;
  breakTimeInSeconds = 1 * 60;
  passedWorkTimeInSeconds = 0;
  passedBreakTimeInSeconds = 0;
  interval?: any;
  mode = TimerMode.WORK;

  constructor(private timerService: TimerService) { }

  create(): void {
    this.timerService.create(this.workTimeInSeconds / 60, this.breakTimeInSeconds / 60).subscribe(
      (resp: HttpResponse<Timer>) => {
        if (resp.body) {
          const timer = resp.body;
          console.log(timer);
          this.isTimerCreated = true;
          this.timer = timer;
        }
      }
    )
  }

  start(): void {
    this.isTimerStarted = true;
    this.timerService.start(this.timer.id).subscribe(
      (resp: HttpResponse<Timer>) => {
        this.startTimer();
        const timer = resp.body;
        console.log(timer);
      }
    );
  }

  private startTimer(): void {
    this.interval = setInterval(() => {
      if (this.mode === TimerMode.WORK ? this.workTimeInSeconds > 0 : this.breakTimeInSeconds > 0) {
        this.mode === TimerMode.WORK ? this.workTimeInSeconds-- : this.breakTimeInSeconds--;
        this.mode === TimerMode.WORK ? this.passedWorkTimeInSeconds++ : this.passedBreakTimeInSeconds++;
      } else {
        this.nextTimerMode();
      }
    }, 1000);
  }

  private nextTimerMode() {
    if (this.mode === TimerMode.WORK) this.changeModeToBreak();
    else this.finishTimeCycle();
  }

  private changeModeToBreak() {
    this.mode = TimerMode.BREAK;
  }

  private finishTimeCycle() {
    if (this.timer != null)
      this.timerService.finish(this.timer?.id).subscribe(
        (resp: HttpResponse<Timer>) => {
          clearInterval(this.interval);
          console.log(resp);
        }
      )
  }

  resume(): void {
    this.timerService.resume(this.timer.id).subscribe(
      (resp: HttpResponse<Timer>) => {
        if (resp.body) {
          this.startTimer();
        }
      });
  }

  pause(): void {
    clearInterval(this.interval);
    this.timerService.pause(this.timer.id, this.passedWorkTimeInSeconds).subscribe(
      (resp: HttpResponse<Timer>) => {
        if (resp.body) {
          this.passedWorkTimeInSeconds = 0;
        }
      }
    )
  }

  getTimer(): string {
    const timer = this.mode === TimerMode.WORK ? this.workTimeInSeconds : this.breakTimeInSeconds;
    const hr = Math.floor(timer / (60 * 60));
    const min = Math.floor((timer / 60)) % 60;
    const sec = timer % 60;
    return this.mode.toString() + " - " + hr + ":" + min + ":" + sec;
  }

}
enum TimerMode {
  "WORK" = "WORK MODE",
  "BREAK" = "BREAK MODE"
}
