import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from "@angular/core";
import { MatCalendar, MatDatepicker } from "@angular/material/datepicker";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats
} from "@angular/material/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CommonService } from "src/app/common/services/common.service";

@Component({
  selector: "app-custom-end-date-picker",
  templateUrl: './custom-end-date-picker.component.html',
  styleUrls: ['./custom-end-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomEndDatePickerComponent {
  datePickerHeader = DatePickerHeaderEnd;
  maxDate = new Date();
  endDate = this.commonService.selectedEndDate;

  constructor(private commonService: CommonService) {}
  
  onDateChange(event: any) {
    this.commonService.setSelectedEndDate(event.value);
  }
}

/** Custom header component for datepicker. */
@Component({
  selector: "date-picker-header",
  styles: [
    `
      .example-header {
        display: flex;
        align-items: center;
        padding: 0.5em;
      }

      .example-header-label {
        flex: 1;
        height: 1em;
        font-weight: 500;
        text-align: center;
      }

      .example-double-arrow .mat-icon {
        margin: -22%;
      }
    `
  ],
  template: `
<div class="container">
<div class="row mt-2">
  <div class="col cal-btn">No date</div>
  <div class="col cal-btn" (click)="dateBtnClicked('monday')">Today</div>
</div>
</div>
<div class="example-header">
  <button mat-icon-button (click)="previousClicked('month')">
    <mat-icon>keyboard_arrow_left</mat-icon>
  </button>
  <span class="example-header-label">{{ periodLabel }}</span>

  <button mat-icon-button (click)="nextClicked('month')">
    <mat-icon>keyboard_arrow_right</mat-icon>
  </button>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerHeaderEnd<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _datePicker: MatDatepicker<D>,
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,
    private commonService: CommonService
  ) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
      .format(
        this._calendar.activeDate,
        this._dateFormats.display.monthYearLabel
      )
      .toLocaleUpperCase();
  }

  previousClicked(mode: "month" | "year") {
    this._calendar.activeDate =
      mode === "month"
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: "month" | "year") {
    this._calendar.activeDate =
      mode === "month"
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }

  dateBtnClicked(label?: any) {
    const d: any = this._calendar.activeDate;
    if(label == 'week') {
      this._calendar.activeDate = this._dateAdapter.addCalendarDays(this._calendar.activeDate, 7);
    }
    else if(label == 'monday') {
      this._calendar.activeDate = this._dateAdapter.addCalendarDays(d, ((7 - d.getDay()) % 7 + 1) % 7 || 7);
    }
    else if(label == 'tuesday') {
      this._calendar.activeDate = this._dateAdapter.addCalendarDays(d, ((7 - d.getDay()) % 7 + 2) % 7 || 7);
    }
    else {
      this._calendar.activeDate = this._dateAdapter.today();
    }
    const date: any = this._calendar.activeDate;
    this._calendar._dateSelected(date);
    this._datePicker.select(date);
    this.commonService.setSelectedEndDate(date);
    // this._datePicker.close = () => {};
    this._datePicker.close();
  }
}
