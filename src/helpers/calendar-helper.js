/** Короткий псевдоним для создания Date (клонирования, преобразования) */
const mkDate = date => new Date(date);
/** Получение дня недели числом от 1 (ПН) до 7 (ВС) из даты {Date} */
const getWeekday = date => date.getDay() || 7;
/** Увеличение и уменьшение даты на определённое число дней или месяцев */
const addDays = (date, days) =>
  mkDate(date.getTime() + 1000 * 60 * 60 * 24 * days);
const subtractDays = (date, days) => addDays(date, -days);
const addMonth = (date, n) =>
  mkDate(mkDate(date).setMonth(date.getMonth() + n));
const subtractMonth = (date, n) => addMonth(date, -n);
/** Получение первой даты месяца */
const getFirstDateOfMonth = date => mkDate(mkDate(date).setDate(1));

export {
  addMonth,
  addDays,
  getWeekday,
  subtractDays,
  subtractMonth,
  getFirstDateOfMonth
};
