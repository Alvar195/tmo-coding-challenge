import { Store } from '@ngrx/store';
import { PRICEQUERY_FEATURE_KEY, PriceQueryPartialState } from './price-query.reducer';
import { PriceQuery } from './price-query.type';
import { async, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TIME_PERIODS } from '@coding-challenge/stocks/data-access-app-config';
import { PriceQueryFacade } from './price-query.facade';
import { DataPersistence } from '@nrwl/nx';
import { cold } from 'jasmine-marbles';

interface TestSchema {
  priceQuery: PriceQueryPartialState
}

const priceQueries: PriceQuery[] = [
  {
    "date": '2017-01-01',
    "dateNumeric": 1483228800000,
    "open": 207.48,
    "high": 202.7,
    "low": 207.95,
    "close": 205.54,
    "volume": 25866646,
    "change": 0,
    "changePercent": 0,
    "label": "Jul 8",
    "changeOverTime": 0
  }
];

const initialState = {
  [PRICEQUERY_FEATURE_KEY]: {
    ids: [0],
    entities: {
      0: priceQueries[0]
    }
  }
};

describe('PriceQueryFacade', () => {
  let facade: PriceQueryFacade;
  let store: Store<TestSchema>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [], imports: [],
      providers: [
        DataPersistence,
        PriceQueryFacade,
        provideMockStore({ initialState })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    facade = TestBed.get(PriceQueryFacade);
    store = TestBed.get(Store);
  });

  it('test facade return value', () => {
    const today = new Date();

    facade.fetchQuote('AAPL', TIME_PERIODS[1].value, today, today);
    const expected = cold('a', {
      a: [
        ['2017-01-01', 205.54]
      ]
    });

    expect(facade.priceQueries$).toBeObservable(expected);
  });
});
