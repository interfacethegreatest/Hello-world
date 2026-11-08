// Adapted from Calendar4's SmallCalendar and calendar page date helpers.
export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function weekCells(viewDate: Date): Date[] {
  return Array.from({ length: 7 }, (_, index) => new Date(
    viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate() - viewDate.getDay() + index,
  ));
}

export function shiftWeek(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount * 7);
}

export function monthCells(viewDate: Date): Date[] {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const offset = new Date(year, month, 1).getDay();
  return Array.from({ length: 42 }, (_, i) => new Date(year, month, 1 - offset + i));
}

export function addMonthsClamped(date: Date, amount: number): Date {
  const start = new Date(date.getFullYear(), date.getMonth() + amount, 1);
  const lastDay = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
  return new Date(start.getFullYear(), start.getMonth(), Math.min(date.getDate(), lastDay));
}
