import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addMonthsClamped, isSameDay, monthCells, shiftWeek, weekCells } from '../src/lib/calendar.ts';

test('weekly display stays seven dates after repeated navigation in either direction', () => {
  const original = new Date(2026, 10, 8);
  let selected = original;
  for (let i = 0; i < 500; i++) {
    selected = shiftWeek(selected, 1);
    const cells = weekCells(selected);
    assert.equal(cells.length, 7);
    assert.equal(cells[0].getDay(), 0);
    assert.equal(cells[6].getDay(), 6);
    assert.ok(cells.some(date => isSameDay(date, selected)));
  }
  for (let i = 0; i < 500; i++) selected = shiftWeek(selected, -1);
  assert.ok(isSameDay(selected, original));
  assert.ok(isSameDay(original, new Date(2026, 10, 8)));
});

test('weekly navigation handles leap days and year boundaries', () => {
  assert.ok(isSameDay(shiftWeek(new Date(2024, 1, 22), 1), new Date(2024, 1, 29)));
  assert.ok(isSameDay(shiftWeek(new Date(2026, 11, 28), 1), new Date(2027, 0, 4)));
  const cells = weekCells(new Date(2027, 0, 1));
  assert.ok(isSameDay(cells[0], new Date(2026, 11, 27)));
  assert.ok(isSameDay(cells[6], new Date(2027, 0, 2)));
});

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
