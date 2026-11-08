import { useState } from 'react';
import { isSameDay, shiftWeek, weekCells } from '../../lib/calendar';
import styles from './Calendar.module.css';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** The parent supplies today after mount to avoid static-export hydration drift. */
export default function Calendar({ today }: { today: Date }) {
  const [selectedDate, setSelectedDate] = useState(today);
  const dates = weekCells(selectedDate);
  const formatDate = (date: Date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const weekLabel = `${formatDate(dates[0])} – ${formatDate(dates[6])}`;

  return (
    <section className={styles.calendar} aria-label="Weekly calendar">
      <header className={styles.header}>
        <h2 aria-live="polite">{weekLabel}</h2>
        <nav aria-label="Calendar navigation">
          <button type="button" onClick={() => setSelectedDate(new Date())}>Today</button>
          <button type="button" aria-label="Previous week" onClick={() => setSelectedDate(date => shiftWeek(date, -1))}>←</button>
          <button type="button" aria-label="Next week" onClick={() => setSelectedDate(date => shiftWeek(date, 1))}>→</button>
        </nav>
      </header>
      <div className={styles.grid}>
        {dates.map(date => {
          const selected = isSameDay(date, selectedDate);
          return (
            <button
              key={date.toDateString()}
              type="button"
              className={[styles.day, selected ? styles.selected : ''].join(' ')}
              aria-label={date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              aria-pressed={selected}
              aria-current={isSameDay(date, today) ? 'date' : undefined}
              onClick={() => setSelectedDate(date)}
            >
              <span className={styles.weekday}>{weekdays[date.getDay()]}</span>
              <span>{date.getDate()}</span>
            </button>
          );
        })}
      </div>
      <p className={styles.selection} role="status">
        Selected: {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </section>
  );
}
