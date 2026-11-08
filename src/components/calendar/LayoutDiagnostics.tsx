import { useEffect, useState, type RefObject } from 'react';
import styles from './Calendar.module.css';

type Metrics = {
  dates: number;
  rows: number;
  gridHeight: number;
  panelHeight: number;
  padding: string;
  gap: string;
  viewport: number;
  headerWrapped: boolean;
};

/** Local-only measurements: no analytics, network requests, or persistent storage. */
export default function LayoutDiagnostics({ panelRef, gridRef, month }: {
  panelRef: RefObject<HTMLElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  month: string;
}) {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('layout-debug') !== '1') return;
    const panel = panelRef.current;
    const grid = gridRef.current;
    if (!panel || !grid) return;

    function measure() {
      if (!panel || !grid) return;
      const dates = Array.from(grid.querySelectorAll('button[aria-pressed]'));
      const heading = panel.querySelector('h2');
      const nav = panel.querySelector('nav');
      const next: Metrics = {
        dates: dates.length,
        rows: new Set(dates.map(day => Math.round(day.getBoundingClientRect().top))).size,
        gridHeight: Math.round(grid.getBoundingClientRect().height),
        panelHeight: Math.round(panel.getBoundingClientRect().height),
        padding: getComputedStyle(panel).padding,
        gap: getComputedStyle(grid).gap,
        viewport: window.innerWidth,
        headerWrapped: !!heading && !!nav && nav.getBoundingClientRect().top >= heading.getBoundingClientRect().bottom,
      };
      setMetrics(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    observer.observe(grid);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [panelRef, gridRef, month]);

  if (!metrics) return null;

  return (
    <aside className={styles.diagnostics} aria-label="Calendar layout diagnostics">
      <h2>Layout diagnostics</h2>
      <p>Click the month arrows. If the layout changes, capture this panel along with the calendar.</p>
      <dl>
        <dt>Month</dt><dd>{month}</dd>
        <dt>Dates / date rows</dt><dd>{metrics.dates} / {metrics.rows}</dd>
        <dt>Grid / card height</dt><dd>{metrics.gridHeight}px / {metrics.panelHeight}px</dd>
        <dt>Card padding / grid gap</dt><dd>{metrics.padding} / {metrics.gap}</dd>
        <dt>Viewport width</dt><dd>{metrics.viewport}px</dd>
        <dt>Header controls wrapped</dt><dd>{metrics.headerWrapped ? 'Yes' : 'No'}</dd>
      </dl>
      <p>{metrics.dates !== 42 || metrics.rows !== 6
        ? 'Unexpected date count or row count detected.'
        : 'Expected 42 dates and six date rows. Weekday labels occupy a separate header row.'}</p>
    </aside>
  );
}
