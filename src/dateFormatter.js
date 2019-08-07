
const formatDMY = (date) => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return `${day}/${month}/${year}`;
};

const formatHM = (date) => {
  let hours = date.getHours().toString().padStart(2, '0');
  let mins  = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${mins}`;
};

const formatRule = (offset, dateFormat) => (dateToFormatTimeMillis, systemDateTimeMillis) => {
  let dateToFormat = new Date(dateToFormatTimeMillis);
  let offsetDate   = new Date(systemDateTimeMillis);
  offsetDate.setDate(offsetDate.getDate() + offset);
  return formatDMY(offsetDate) === formatDMY(dateToFormat) ? [dateFormat(dateToFormat)] : [];
};

const textFormatRule = (offset, text) => formatRule(offset, () => text);
const dow = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const dowFormatRule = (offset) => formatRule(offset, date => dow[date.getDay()]);

const todayRule     = textFormatRule(0, 'TODAY');
const todayTimeRule = formatRule(0, formatHM);
const yesterdayRule = textFormatRule(-1, 'YESTERDAY');
const dayOfWeekRule = [-5, -4, -3, -2].map(dowFormatRule);
const defaultRule   = dateTimeMillis => formatDMY(new Date(dateTimeMillis));

const commonRules = [yesterdayRule, ...dayOfWeekRule, defaultRule];

const formatUsingRules = (rules) => (dateToFormatTimeMillis, systemDateTimeMillis) => rules.flatMap(rule => rule(dateToFormatTimeMillis, systemDateTimeMillis))[0];

export const format           = formatUsingRules([todayRule, ...commonRules]);
export const formatHomeScreen = formatUsingRules([todayTimeRule, ...commonRules]);

