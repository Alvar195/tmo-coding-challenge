import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TIME_PERIODS, TimePeriod } from '@coding-challenge/stocks/data-access-app-config';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  private subscription$: Subscription;
  private today: Date = new Date();
  stockPickerForm: FormGroup;
  quotes$ = this.priceQuery.priceQueries$;
  timePeriods: TimePeriod[] = TIME_PERIODS;


  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [TIME_PERIODS[0].value, Validators.required],
      fromDate: [this.today, Validators.required],
      toDate: [this.today, Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscription$ = this.stockPickerForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(() => this.fetchQuote());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  fetchQuote(): void {
    if (this.stockPickerForm.valid) {
      const { symbol, period, fromDate, toDate } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period, fromDate, toDate);
    }
  }

  fromDateFilter = (date: Date): boolean => {
    const { toDate } = this.stockPickerForm.value;
    if (!toDate) return true;
    return toDate.getTime() >= date.getTime();
  };

  toDateFilter = (date: Date): boolean => {
    const { fromDate } = this.stockPickerForm.value;
    if (!fromDate) return true;
    return fromDate.getTime() <= date.getTime();
  };
}
