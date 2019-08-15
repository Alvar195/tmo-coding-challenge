import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StocksComponent } from './stocks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { TIME_PERIODS } from '@coding-challenge/stocks/data-access-app-config';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { daysFromNow } from '@coding-challenge/shared/util/test';

const priceQueryMock = {
  priceQueries$: of([]),
  fetchQuote: jest.fn()
};

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let facade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StocksComponent], imports: [RouterTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        SharedUiChartModule,
        FormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: PriceQueryFacade, useValue: priceQueryMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    facade = TestBed.get(PriceQueryFacade);
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test subscription', fakeAsync(() => {
    const spy = spyOn(facade, 'fetchQuote');
    const today = new Date();
    const weekAgo = daysFromNow(today, -7);

    component.stockPickerForm.setValue({
      symbol: 'AAPL',
      period: TIME_PERIODS[0].value, // 'max'
      fromDate: weekAgo,
      toDate: today
    });
    tick(1000);

    expect(spy).toHaveBeenCalledWith('AAPL', TIME_PERIODS[0].value, weekAgo, today);
  }));

  it('test valid Dates', () => {
    const date = new Date();
    component.stockPickerForm.get('toDate').setValue(daysFromNow(date, -2));
    expect(component.fromDateFilter(daysFromNow(date, -4))).toEqual(true);

    component.stockPickerForm.get('fromDate').setValue(daysFromNow(date, -4));
    expect(component.toDateFilter(daysFromNow(date, -2))).toEqual(true);
  });

  it('test invalid dates', () => {
    const date = new Date();
    component.stockPickerForm.get('toDate').setValue(daysFromNow(date, -4));
    expect(component.fromDateFilter(daysFromNow(date, -2))).toEqual(false);

    component.stockPickerForm.get('fromDate').setValue(daysFromNow(date, -2));
    expect(component.toDateFilter(daysFromNow(date, -4))).toEqual(false);
  });

  it('test form default validity', () => {
    expect(component.stockPickerForm.valid).toBeFalsy();
  });

  it('test form default values', () => {
    expect(component.stockPickerForm.get('symbol').value).toBeNull();
    expect(component.stockPickerForm.get('period').value).toEqual(TIME_PERIODS[0].value);
    expect(component.stockPickerForm.get('fromDate').value).toEqual(component['today']);
    expect(component.stockPickerForm.get('toDate').value).toEqual(component['today']);
  });

  it('test form valid', () => {
    const today = new Date();

    component.stockPickerForm.setValue({
      symbol: 'AAPL',
      period: TIME_PERIODS[2].value,
      fromDate: daysFromNow(today, -7),
      toDate: today
    });

    expect(component.stockPickerForm.valid).toBeTruthy();
  });
});
