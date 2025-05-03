'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CalendarIcon } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameDay,
  startOfWeek,
  addDays,
} from 'date-fns';

type Leave = {
  id: number;
  employeeName: string;
  startDate: string;
  endDate: string;
  status: string;
};

export default function CalendarPage() {
  const searchParams = useSearchParams();
  const defaultView = searchParams.get('view') || 'month';

  const [view, setView] = useState<'month' | 'week'>(defaultView as 'month' | 'week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [leaves, setLeaves] = useState<Leave[]>([]);

  useEffect(() => {
    const storedLeaves = localStorage.getItem('leaveRequests');
    if (storedLeaves) {
      setLeaves(JSON.parse(storedLeaves));
    }
  }, []);

  const goToPrevious = () => {
    setCurrentDate((prev) => (view === 'month' ? subMonths(prev, 1) : addDays(prev, -7)));
  };

  const goToNext = () => {
    setCurrentDate((prev) => (view === 'month' ? addMonths(prev, 1) : addDays(prev, 7)));
  };

  const renderMonthView = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    return (
      <>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="bg-gray-100 py-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((day) => {
            const dayLeaves = leaves.filter((leave) => {
              const leaveStart = new Date(leave.startDate);
              const leaveEnd = new Date(leave.endDate);
              return day >= leaveStart && day <= leaveEnd;
            });

            return (
              <div
                key={day.toString()}
                className={`min-h-[100px] bg-white p-2 text-sm ${
                  isSameDay(day, new Date()) ? 'border border-blue-500' : ''
                }`}
              >
                <div className="font-medium">{format(day, 'd')}</div>
                {dayLeaves.map((leave) => (
                  <div key={leave.id} className="text-xs text-red-500 truncate">
                    {leave.employeeName}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderWeekView = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const days = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

    return (
      <>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((day) => (
            <div key={day.toString()} className="bg-gray-100 py-2 text-center text-sm font-medium text-gray-500">
              {format(day, 'EEE')}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((day) => {
            const dayLeaves = leaves.filter((leave) => {
              const leaveStart = new Date(leave.startDate);
              const leaveEnd = new Date(leave.endDate);
              return day >= leaveStart && day <= leaveEnd;
            });

            return (
              <div
                key={day.toString()}
                className={`min-h-[100px] bg-white p-2 text-sm ${
                  isSameDay(day, new Date()) ? 'border border-blue-500' : ''
                }`}
              >
                <div className="font-medium">{format(day, 'd')}</div>
                {dayLeaves.map((leave) => (
                  <div key={leave.id} className="text-xs text-red-500 truncate">
                    {leave.employeeName}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Team Calendar
        </h2>
        <div className="space-x-2">
          <button onClick={goToPrevious} className="px-3 py-1 border rounded hover:bg-gray-100">
            Prev
          </button>
          <button onClick={goToNext} className="px-3 py-1 border rounded hover:bg-gray-100">
            Next
          </button>
          <button
            onClick={() => setView('month')}
            className={`px-3 py-1 border rounded ${view === 'month' ? 'bg-gray-200 font-bold' : ''}`}
          >
            Month
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-3 py-1 border rounded ${view === 'week' ? 'bg-gray-200 font-bold' : ''}`}
          >
            Week
          </button>
        </div>
      </div>
      <div className="text-center text-lg font-medium mb-2">
        {format(currentDate, 'MMMM yyyy')}
      </div>
      {view === 'month' ? renderMonthView() : renderWeekView()}
    </div>
  );
}
