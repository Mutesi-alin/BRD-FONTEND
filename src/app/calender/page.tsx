'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';

type LeaveEntry = {
  title: string;
  start: string;
  end: string;
  color?: string;
  department: string;
};

export default function TeamCalendar() {
  const [allEvents, setAllEvents] = useState<LeaveEntry[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<LeaveEntry[]>([]);
  const [department, setDepartment] = useState<string>('All');

  useEffect(() => {
    const mockData: LeaveEntry[] = [
      {
        title: 'Alice',
        start: '2025-05-01',
        end: '2025-05-06',
        department: 'Engineering',
        color: '#34d399',
      },
      {
        title: 'Bob',
        start: '2025-05-03',
        end: '2025-05-05',
        department: 'Marketing',
        color: '#60a5fa',
      },
      {
        title: 'Clara',
        start: '2025-05-04',
        end: '2025-05-07',
        department: 'HR',
        color: '#a78bfa',
      },
    ];
    setAllEvents(mockData);
    setFilteredEvents(mockData);
  }, []);

  useEffect(() => {
    if (department === 'All') {
      setFilteredEvents(allEvents);
    } else {
      setFilteredEvents(allEvents.filter((e) => e.department === department));
    }
  }, [department, allEvents]);

  return (
    <div className="p-6 bg-white max-w-6xl mx-auto mt-8 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Team Leave Calendar</h2>
        <select
          className="border px-3 py-1 rounded"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
        </select>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth',
        }}
        height="auto"
        events={filteredEvents.map((e) => ({
          ...e,
          title: `${e.title} (${e.department})`,
        }))}
      />
    </div>
  );
}
