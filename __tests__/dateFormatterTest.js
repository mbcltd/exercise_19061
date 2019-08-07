import {format, formatHomeScreen} from '../src/dateFormatter';


it('Past dates are formatted as dd/MM/yyyy strings', () => {
  expect(
    format(Date.parse('2018-10-01T00:00:00.000Z'), Date.parse('2019-01-01T12:00:00.000Z'))
  ).toBe('01/10/2018');
});

it('Future dates are formatted as dd/MM/yyyy strings', () => {
  expect(
    format(Date.parse('2020-10-01T00:00:00.000Z'), Date.parse('2019-01-01T12:00:00.000Z'))
  ).toBe('01/10/2020');
});

it('Today is formatted as "TODAY"', () => {
  expect(
    format(Date.parse('2019-01-01T00:00:00.000Z'), Date.parse('2019-01-01T12:00:00.000Z'))
  ).toBe('TODAY');
});

it('Today is formatted as time on the home screen', () => {
  expect(
    formatHomeScreen(Date.parse('2019-01-01T11:32:15.000Z'), Date.parse('2019-01-01T12:00:00.000Z'))
  ).toBe('11:32');
});

it('Yesterday is formatted as "YESTERDAY"', () => {
  expect(
    format(Date.parse('2018-12-31T12:00:00.000Z'), Date.parse('2019-01-01T12:00:00.000Z'))
  ).toBe('YESTERDAY');
  expect(
    format(Date.parse('2018-07-10T12:00:00.000Z'), Date.parse('2018-07-11T12:00:00.000Z'))
  ).toBe('YESTERDAY');
  expect(
    format(Date.parse('2018-07-31T12:00:00.000Z'), Date.parse('2018-08-01T12:00:00.000Z'))
  ).toBe('YESTERDAY');
});


it('3-6 days behind to be formatted as d/o/w', () => {
  expect(
    format(Date.parse('2019-01-11T12:00:00.000Z'), Date.parse('2019-01-12T12:00:00.000Z'))
  ).toBe('YESTERDAY');
  expect(
    format(Date.parse('2019-01-10T12:00:00.000Z'), Date.parse('2019-01-12T12:00:00.000Z'))
  ).toBe('THU');
  expect(
    format(Date.parse('2019-01-09T12:00:00.000Z'), Date.parse('2019-01-12T12:00:00.000Z'))
  ).toBe('WED');
  expect(
    format(Date.parse('2019-01-08T12:00:00.000Z'), Date.parse('2019-01-12T12:00:00.000Z'))
  ).toBe('TUE');
  expect(
    format(Date.parse('2019-01-07T12:00:00.000Z'), Date.parse('2019-01-12T12:00:00.000Z'))
  ).toBe('MON');
  expect(
    format(Date.parse('2019-01-06T12:00:00.000Z'), Date.parse('2019-01-12T12:00:00.000Z'))
  ).toBe('06/01/2019');
});
