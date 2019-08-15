import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FetchPriceQuery } from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import { getAllPriceQueries } from './price-query.selectors';
import { map } from 'rxjs/operators';

@Injectable()
export class PriceQueryFacade {
  priceQueries$ = this.store.pipe(
    select(getAllPriceQueries),
    map(priceQueries =>
      priceQueries.map(priceQuery => [priceQuery.date, priceQuery.close])
    )
  );

  constructor(private store: Store<PriceQueryPartialState>) {}

  fetchQuote(symbol: string, period: string, fromDate: Date, toDate: Date) {
    this.store.dispatch(new FetchPriceQuery(symbol, period, fromDate, toDate));
  }
}
