import { Component, OnInit, Output, Input } from '@angular/core';
import { Period } from '../item/period.class';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input()
  public period:Period;
  
  constructor() { 
    this.period=new Period();
  }

  ngOnInit() {
  }

  onDateSelection(date: NgbDate) {
    if (!this.period.from && !this.period.to) {
      this.period.from = date;
    } else if (this.period.from && !this.period.to && date.after(this.period.from)) {
      this.period.to = date;
    } else {
      this.period.to = null;
      this.period.from = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.period.from && !this.period.to && this.period.hoveredDate && date.after(this.period.from) && date.before(this.period.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.period.from) && date.before(this.period.to);
  }

  isRange(date: NgbDate) {
    return date.equals(this.period.from) || date.equals(this.period.to) || this.isInside(date) || this.isHovered(date);
  }

}
