import { useState } from 'react';
import { addMonthsClamped, isSameDay, monthCells } from '../../lib/calendar';
import styles from './Calendar.module.css';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** The parent supplies today after mount to avoid static-export hydration drift. */
export default function Calendar({ today }: { today: Date }) {
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewDate, setViewDate] = useState(today);
  const monthLabel = viewDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  function selectDate(date: Date) {
    setSelectedDate(date);
    setViewDate(date);
  }

  function shiftMonth(amount: number) {
    selectDate(addMonthsClamped(selectedDate, amount));
  }

  return (
    <section className={styles.calendar} aria-label="Monthly calendar">
      <div className={styles.header} dir="ltr">
        <h2 aria-live="polite">{monthLabel}</h2>
        <nav aria-label="Calendar navigation">
          <button type="button" onClick={() => selectDate(new Date())}>Today</button>
          <button type="button" aria-label="Previous month" onClick={() => shiftMonth(-1)}>←</button>
          <button type="button" aria-label="Next month" onClick={() => shiftMonth(1)}>→</button>
        </nav>
      </div>
      <div className={styles.grid}>
        {weekdays.map(day => <span className={styles.weekday} key={day}>{day}</span>)}
        {monthCells(viewDate).map(date => {
          const selected = isSameDay(date, selectedDate);
          return (
            <button
              key={date.toDateString()}
              type="button"
              className={[styles.day, date.getMonth() !== viewDate.getMonth() ? styles.outside : '', selected ? styles.selected : ''].join(' ')}
              aria-label={date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              aria-pressed={selected}
              aria-current={isSameDay(date, today) ? 'date' : undefined}
              onClick={() => selectDate(date)}
            >{date.getDate()}</button>
          );
        })}
      </div>
      <p className={styles.selection} role="status">
        Selected: {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </section>
  );
}
