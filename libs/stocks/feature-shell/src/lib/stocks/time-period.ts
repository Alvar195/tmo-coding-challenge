export enum TimePeriodDisplay {
  ALL = 'All available data',
  FIVE_YEARS = 'Five years',
  TWO_YEARS = 'Two years',
  ONE_YEAR = 'One year',
  YEAR_TO_DATE = 'Year-to-date',
  SIX_MONTHS = 'Six months',
  THREE_MONTHS = 'Three months',
  ONE_MONTH = 'One month',
  CUSTOM = 'Custom date range'
}

export enum TimePeriodValue {
  ALL = 'max',
  FIVE_YEARS = '5y',
  TWO_YEARS = '2y',
  ONE_YEAR = '1y',
  YEAR_TO_DATE = 'ytd',
  SIX_MONTHS = '6m',
  THREE_MONTHS = '3m',
  ONE_MONTH = '1m',
  CUSTOM = 'custom'
}


export const TIME_PERIODS = [
  { viewValue: TimePeriodDisplay.CUSTOM, value: TimePeriodValue.CUSTOM },
  { viewValue: TimePeriodDisplay.ALL, value: TimePeriodValue.ALL },
  { viewValue: TimePeriodDisplay.FIVE_YEARS, value: TimePeriodValue.FIVE_YEARS },
  { viewValue: TimePeriodDisplay.TWO_YEARS, value: TimePeriodValue.TWO_YEARS },
  { viewValue: TimePeriodDisplay.ONE_YEAR, value: TimePeriodValue.ONE_YEAR },
  { viewValue: TimePeriodDisplay.YEAR_TO_DATE, value: TimePeriodValue.YEAR_TO_DATE },
  { viewValue: TimePeriodDisplay.SIX_MONTHS, value: TimePeriodValue.SIX_MONTHS },
  { viewValue: TimePeriodDisplay.THREE_MONTHS, value: TimePeriodValue.THREE_MONTHS },
  { viewValue: TimePeriodDisplay.ONE_MONTH, value: TimePeriodValue.ONE_MONTH }
];
