
import {DateUtil} from './date'

describe('date', () => {
  it('#dateToString: should return the correct date string for a date in a leap year', function() {
    const result = DateUtil.dateToString('2023-11-22T00:00:00.000+00:00');
    expect(result).toEqual('2023-11-22');
  });

  it('#dateToStringPlusYear: should add one year to the year component of the input date string', function() {
    const result = DateUtil.dateToStringPlusYear('2022-05-15');
    expect(result).toBe('2023-05-15');
  });


  it('#completeCero: should return a string with a leading zero when given a single digit number', function() {
    expect(DateUtil.completeCero(1)).toEqual('01');
  });

  it('completeCero: should return the same number as a string when given a double digit number', function() {
    expect(DateUtil.completeCero(10)).toEqual(10);
  });
})
