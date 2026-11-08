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

test('month navigation clamps long months and crosses years', () => {
  assert.ok(isSameDay(addMonthsClamped(new Date(2025, 0, 31), 1), new Date(2025, 1, 28)));
  assert.ok(isSameDay(addMonthsClamped(new Date(2024, 0, 31), 1), new Date(2024, 1, 29)));
  assert.ok(isSameDay(addMonthsClamped(new Date(2025, 0, 15), -1), new Date(2024, 11, 15)));
});
