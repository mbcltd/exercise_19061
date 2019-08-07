const formatDayMonthYear = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return `${day}/${month}/${year}`;
};

const formatHourMinutes = (date) => {
  let hours = date.getHours().toString().padStart(2, '0');
  let mins = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${mins}`;
};

const formatWhenDateMatchesOffset = (dayOffset, dateFormat) => (dateToFormatTimeMillis, systemDateTimeMillis) => {
  let dateToFormat = new Date(dateToFormatTimeMillis);
  let offsetDate = new Date(systemDateTimeMillis);
  offsetDate.setDate(offsetDate.getDate() + dayOffset);
  return formatDayMonthYear(offsetDate) === formatDayMonthYear(dateToFormat)
    ? [dateFormat(dateToFormat)]
    : [];
};

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const dayOfWeekFormatWhenDateMatchesOffset =
  (offset) =>
    formatWhenDateMatchesOffset(offset, date => daysOfWeek[date.getDay()]);

const todayRule     = formatWhenDateMatchesOffset(0, () => 'TODAY');
const todayTimeRule = formatWhenDateMatchesOffset(0, formatHourMinutes);
const yesterdayRule = formatWhenDateMatchesOffset(-1, () => 'YESTERDAY');
const dayOfWeekRule = [-5, -4, -3, -2].map(dayOfWeekFormatWhenDateMatchesOffset);
const defaultRule   = dateTimeMillis => formatDayMonthYear(new Date(dateTimeMillis));

const commonRules = [yesterdayRule, ...dayOfWeekRule, defaultRule];

const formatUsingRules = (rules) =>
  (dateToFormatTimeMillis, systemDateTimeMillis) =>
    rules.flatMap(rule => rule(dateToFormatTimeMillis, systemDateTimeMillis))[0];

export const format = formatUsingRules([todayRule, ...commonRules]);
export const formatHomeScreen = formatUsingRules([todayTimeRule, ...commonRules]);

