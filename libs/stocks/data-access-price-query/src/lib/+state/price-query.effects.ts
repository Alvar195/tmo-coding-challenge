import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { StocksAppConfig, StocksAppConfigToken } from '@coding-challenge/stocks/data-access-app-config';
import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';
import { FetchPriceQuery, PriceQueryActionTypes, PriceQueryFetched, PriceQueryFetchError } from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import { PriceQueryResponse } from './price-query.type';

@Injectable()
export class PriceQueryEffects {
  @Effect() loadPriceQuery$ = this.dataPersistence.fetch(
    PriceQueryActionTypes.FetchPriceQuery,
    {
      run: (action: FetchPriceQuery) => {
        const isCustom = (action.period === 'custom');
        const period = (isCustom) ? 'max' : action.period;
        return this.httpClient
          .get<PriceQueryResponse[]>(`${this.env.apiURL}/beta/stock/${action.symbol}/chart/${period}?token=${this.env.apiKey}`)
          .pipe(
            map(response =>
              new PriceQueryFetched(isCustom ? this.filterQuotes(action, response) : response)
            )
          );
      },

      onError: (action: FetchPriceQuery, error) => {
        return new PriceQueryFetchError(error);
      }
    }
  );

  constructor(
    @Inject(StocksAppConfigToken) private env: StocksAppConfig,
    private httpClient: HttpClient,
    private dataPersistence: DataPersistence<PriceQueryPartialState>
  ) {}

  filterQuotes(action: FetchPriceQuery, response: PriceQueryResponse[]): PriceQueryResponse[] {
    return response.filter(data => {
      const time = new Date(data.date).getTime();
      return (time >= action.fromDate.getTime() && time <= action.toDate.getTime());
    });
  }
}
