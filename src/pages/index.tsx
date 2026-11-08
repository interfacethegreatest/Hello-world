import Head from 'next/head';
import { useEffect, useState } from 'react';
import Calendar from '../components/calendar/Calendar';

export default function Home() {
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => { setToday(new Date()); }, []);

  return (
    <>
      <Head>
        <title>Hello World · Calendar Starter</title>
        <meta name="description" content="A small React and TypeScript calendar starter based on Calendar4." />
      </Head>
      <main>
        <p className="eyebrow">Calendar starter</p>
        <h1>Hello world 😎</h1>
        <p className="intro">A simple foundation for our next idea.</p>
        {today ? <Calendar today={today} /> : <p role="status">Loading calendar…</p>}
        <noscript>Enable JavaScript to use the interactive calendar.</noscript>
      </main>
    </>
  );
}
