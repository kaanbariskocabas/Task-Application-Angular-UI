import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { TimerComponent } from './timer/timer.component';



@NgModule({
  declarations: [
    LayoutComponent,
    TimerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LayoutComponent,
    TimerComponent
  ]
})
export class LayoutModule { }
