import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { TIME_PERIODS } from './time-period';
import { TimePeriod } from './time-period.interface';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  quotes$ = this.priceQuery.priceQueries$;
  timePeriods: TimePeriod[] = TIME_PERIODS;
  private subscription$: Subscription;


  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
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
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }
}
