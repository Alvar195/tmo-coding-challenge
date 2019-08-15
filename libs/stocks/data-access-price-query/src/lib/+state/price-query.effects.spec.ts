import { async, TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import { EffectsModule } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { StocksAppConfigToken, TIME_PERIODS } from '@coding-challenge/stocks/data-access-app-config';
import { DataPersistence } from '@nrwl/nx';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FetchPriceQuery, PriceQueryFetched, PriceQueryFetchError } from './price-query.actions';
import { PriceQueryEffects } from './price-query.effects';
import { daysFromNow, daysFromNowISO } from '@coding-challenge/shared/util/test';

const HttpClientMock = {
  get: jest.fn()
};
const today = new Date();
const priceQueryResponse = [
  {
    "date": daysFromNowISO(today,-6),
    "open": 207.48,
    "close": 205.54,
    "high": 202.7,
    "low": 207.95,
    "volume": 25866646,
    "uOpen": 203.72,
    "uClose": 208.72,
    "uHigh": 208.6,
    "uLow": 199.07,
    "uVolume": 25988318,
    "change": 0,
    "changePercent": 0,
    "label": "Jul 8",
    "changeOverTime": 0
  },
  {
    "date": daysFromNowISO(today,-4),
    "open": 207.48,
    "close": 205.54,
    "high": 202.7,
    "low": 207.95,
    "volume": 25866646,
    "uOpen": 203.72,
    "uClose": 208.72,
    "uHigh": 208.6,
    "uLow": 199.07,
    "uVolume": 25988318,
    "change": 0,
    "changePercent": 0,
    "label": "Jul 8",
    "changeOverTime": 0
  },
  {
    "date": daysFromNowISO(today,-2),
    "open": 207.48,
    "close": 205.54,
    "high": 202.7,
    "low": 207.95,
    "volume": 25866646,
    "uOpen": 203.72,
    "uClose": 208.72,
    "uHigh": 208.6,
    "uLow": 199.07,
    "uVolume": 25988318,
    "change": 0,
    "changePercent": 0,
    "label": "Jul 8",
    "changeOverTime": 0
  }
];

describe('PriceQueryEffects', () => {
  let effects: PriceQueryEffects;
  let actionMock: Observable<Action>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [], imports: [
        EffectsModule.forRoot([PriceQueryEffects])
      ],
      providers: [
        DataPersistence,
        provideMockStore(),
        provideMockActions(() => actionMock),
        { provide: StocksAppConfigToken, useValue: '' },
        { provide: HttpClient, useValue: HttpClientMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    effects = TestBed.get(PriceQueryEffects);
  });

  it('test effect with not custom time period', () => {
    HttpClientMock.get.mockReturnValue(of(priceQueryResponse));
    actionMock = hot('a', {
      a: new FetchPriceQuery('AAPL', TIME_PERIODS[1].value, today, today)
    });
    const expected = cold('a', {
      a: new PriceQueryFetched(priceQueryResponse)
    });

    expect(effects.loadPriceQuery$).toBeObservable(expected);
  });

  it('test effect with custom time period', () => {
    const fromDate = daysFromNow(today,-5);
    const toDate = daysFromNow(today,-3);

    HttpClientMock.get.mockReturnValue(of(priceQueryResponse));
    actionMock = hot('a', {
      a: new FetchPriceQuery('AAPL', TIME_PERIODS[0].value, fromDate, toDate)
    });
    const expected = cold('a', {
      a: new PriceQueryFetched([priceQueryResponse[1]])
    });

    expect(effects.loadPriceQuery$).toBeObservable(expected);
  });

  it('test http request error', () => {
      HttpClientMock.get.mockReturnValue(throwError('HTTP request failed'));
      actionMock = hot('a', {
        a: new FetchPriceQuery('AAPL', TIME_PERIODS[1].value, today, today)
      });
      const expected = cold('a', {
        a: new PriceQueryFetchError('HTTP request failed')
      });

      expect(effects.loadPriceQuery$).toBeObservable(expected);
  });
});

