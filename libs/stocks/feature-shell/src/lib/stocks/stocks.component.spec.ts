import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { StoreModule } from '@ngrx/store';
import { TIME_PERIODS } from './time-period';
import { of } from 'rxjs';


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
      declarations: [StocksComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        SharedUiChartModule,
        FormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({})
      ],
      providers: [
        { provide: PriceQueryFacade, useValue: priceQueryMock }
      ]
    }).compileComponents();
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

    component.stockPickerForm.setValue({
      symbol: 'AAPL',
      period: TIME_PERIODS[0].value // 'max'
    });
    tick(1000);

    expect(spy).toHaveBeenCalledWith('AAPL', TIME_PERIODS[0].value);
  }));

  it('test subscription', fakeAsync(() => {
    const spy = spyOn(facade, 'fetchQuote');

    component.stockPickerForm.setValue({
      symbol: 'AAPL',
      period: TIME_PERIODS[0].value
    });
    tick(1000);

    expect(spy).toHaveBeenCalledWith('AAPL', TIME_PERIODS[0].value);
  }));

  it('test form default validity', () => {
    expect(component.stockPickerForm.valid).toBeFalsy();
  });

  it('test form default values', () => {
    expect(component.stockPickerForm.get('symbol').value).toBeNull();
    expect(component.stockPickerForm.get('period').value).toBeNull();
  });

  it('test form valid', () => {
    component.stockPickerForm.setValue({
      symbol: 'AAPL',
      period: TIME_PERIODS[0].value
    });

    expect(component.stockPickerForm.valid).toBeTruthy();
  });
});
