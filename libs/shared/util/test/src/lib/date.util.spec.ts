import { daysFromNow, daysFromNowISO } from '@coding-challenge/shared/util/test';


describe('test date util', function () {
  it('is valid added date', () => {
    const date = new Date(2019, 0, 1, 15, 30);
    expect(daysFromNow(date, 1)).toEqual(new Date(2019, 0, 2, 15, 30));
    expect(daysFromNow(date, 50)).toEqual(new Date(2019, 1, 20, 15, 30));
  });

  it('is valid subtracted date', () => {
    const date = new Date(2019, 0, 20, 15, 30);
    expect(daysFromNow(date, -1)).toEqual(new Date(2019, 0, 19, 15, 30));
    expect(daysFromNow(date, -5)).toEqual(new Date(2019, 0, 15, 15, 30));
  });

  it('is valid daysFromNowISO', () => {
    const date = new Date(2019, 0, 1, 15, 30);
    expect(daysFromNowISO(date, 1)).toEqual('2019-01-02');
  });
});
