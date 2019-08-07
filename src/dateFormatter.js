const formatDayMonthYear = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return `${day}/${month}/${year}`;
};

const formatHourMinutes = (date) => {
  let hours = date.getHours().toString().padStart(2, '0');
  let mins  = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${mins}`;
};

const formatRule = (dayOffset, dateFormat) => (dateToFormatTimeMillis, systemDateTimeMillis) => {
  let dateToFormat = new Date(dateToFormatTimeMillis);
  let offsetDate   = new Date(systemDateTimeMillis);
  offsetDate.setDate(offsetDate.getDate() + dayOffset);
  return formatDayMonthYear(offsetDate) === formatDayMonthYear(dateToFormat)
      ? [dateFormat(dateToFormat)]
      : [];
};

const dow = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const dowFormatRule = (offset) => formatRule(offset, date => dow[date.getDay()]);

const todayRule     = formatRule(0, () => 'TODAY');
const todayTimeRule = formatRule(0, formatHourMinutes);
const yesterdayRule = formatRule(-1, () => 'YESTERDAY');
const dayOfWeekRule = [-5, -4, -3, -2].map(dowFormatRule);
const defaultRule   = dateTimeMillis => formatDayMonthYear(new Date(dateTimeMillis));

const commonRules = [yesterdayRule, ...dayOfWeekRule, defaultRule];

const formatUsingRules = (rules) =>
    (dateToFormatTimeMillis, systemDateTimeMillis) =>
        rules.flatMap(rule => rule(dateToFormatTimeMillis, systemDateTimeMillis))[0];

export const format           = formatUsingRules([todayRule, ...commonRules]);
export const formatHomeScreen = formatUsingRules([todayTimeRule, ...commonRules]);

