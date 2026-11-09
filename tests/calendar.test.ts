import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addMonthsClamped, isSameDay, monthCells } from '../src/lib/calendar.ts';

test('month grid has six Sunday-first weeks and includes leap day', () => {
  const cells = monthCells(new Date(2024, 1, 1));
  assert.equal(cells.length, 42);
  assert.equal(cells[0].getDay(), 0);
  assert.ok(cells.some(date => isSameDay(date, new Date(2024, 1, 29))));
  assert.ok(isSameDay(cells[0], new Date(2024, 0, 28)));
  assert.ok(isSameDay(cells[41], new Date(2024, 2, 9)));
});

const monthGridCases = [
  { name: '28-day February', year: 2025, month: 1, days: 28, first: [2025, 0, 26], last: [2025, 2, 8] },
  { name: 'leap February', year: 2024, month: 1, days: 29, first: [2024, 0, 28], last: [2024, 2, 9] },
  { name: '30-day month starting Sunday', year: 2024, month: 8, days: 30, first: [2024, 8, 1], last: [2024, 9, 12] },
  { name: 'month starting Saturday', year: 2025, month: 10, days: 30, first: [2025, 9, 26], last: [2025, 11, 6] },
  { name: 'January crossing into the previous year', year: 2025, month: 0, days: 31, first: [2024, 11, 29], last: [2025, 1, 8] },
  { name: 'December crossing into the next year', year: 2024, month: 11, days: 31, first: [2024, 11, 1], last: [2025, 0, 11] },
  { name: 'March spanning daylight-saving changes', year: 2024, month: 2, days: 31, first: [2024, 1, 25], last: [2024, 3, 6] },
];

for (const { name, year, month, days, first, last } of monthGridCases) {
  test(`month grid stays consecutive for ${name}`, () => {
    const viewDate = new Date(year, month, 15, 12, 34, 56);
    const originalTime = viewDate.getTime();
    const cells = monthCells(viewDate);
    const parts = (date: Date) => [date.getFullYear(), date.getMonth(), date.getDate()];

    assert.equal(cells.length, 42);
    assert.deepEqual(parts(cells[0]), first);
    assert.deepEqual(parts(cells[41]), last);
    assert.equal(cells.filter(date => date.getFullYear() === year && date.getMonth() === month).length, days);
    assert.equal(viewDate.getTime(), originalTime, 'generating cells must not mutate the viewed date');

    cells.forEach((date, index) => {
      assert.equal(date.getDay(), index % 7, 'each week must run Sunday through Saturday');
      if (index > 0) {
        // Compare local calendar days: DST means a day need not last 24 hours.
        const nextDay = new Date(cells[index - 1]);
        nextDay.setDate(nextDay.getDate() + 1);
        assert.deepEqual(parts(date), parts(nextDay), 'dates must have no gaps or duplicates');
      }
    });
  });
}

test('month navigation clamps long months and crosses years', () => {
  assert.ok(isSameDay(addMonthsClamped(new Date(2025, 0, 31), 1), new Date(2025, 1, 28)));
  assert.ok(isSameDay(addMonthsClamped(new Date(2024, 0, 31), 1), new Date(2024, 1, 29)));
  assert.ok(isSameDay(addMonthsClamped(new Date(2025, 0, 15), -1), new Date(2024, 11, 15)));
});
