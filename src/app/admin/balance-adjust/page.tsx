'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Filter, Download, Users } from 'lucide-react';

// Define interfaces for our data structures
interface Employee {
  id: number;
  name: string;
  department: string;
}

interface LeaveType {
  id: number;
  name: string;
  color: string;
}

interface LeaveRequest {
  employee: string;
  startDate: string;
  endDate: string;
  status: string;
  type: number | string; // Can be either a number (ID) or string (name)
}

export default function LeaveCalendarPage() {
  const searchParams = useSearchParams();
  const initialEmployeeId = searchParams.get('employee');
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(initialEmployeeId ? Number(initialEmployeeId) : null);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLeaveTypes, setSelectedLeaveTypes] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from localStorage
    const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const storedLeaveTypes = JSON.parse(localStorage.getItem('leaveTypes') || '[]');
    const storedLeaveRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    
    setEmployees(storedEmployees);
    setLeaveTypes(storedLeaveTypes);
    setLeaveRequests(storedLeaveRequests);
    setSelectedLeaveTypes(storedLeaveTypes.map((type: LeaveType) => type.id));
    setIsLoading(false);
  }, []);

  const departments = Array.from(new Set(employees.map(employee => employee.department)));

  const filteredEmployees = employees.filter(employee => {
    if (selectedEmployeeId) {
      return employee.id === selectedEmployeeId;
    } else if (selectedDepartment !== 'all') {
      return employee.department === selectedDepartment;
    }
    return true;
  });

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getMonthDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get days from previous month to fill the first week
    const startOffset = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysFromPrevMonth = Array.from({ length: startOffset }, (_, i) => {
      const day = new Date(year, month, -startOffset + i + 1);
      return { date: day, isCurrentMonth: false };
    });
    
    // Get days from current month
    const daysInMonth = lastDay.getDate();
    const daysFromCurrentMonth = Array.from({ length: daysInMonth }, (_, i) => {
      const day = new Date(year, month, i + 1);
      return { date: day, isCurrentMonth: true };
    });
    
    // Get days from next month to fill the last week
    const endOffset = 6 - lastDay.getDay();
    const daysFromNextMonth = Array.from({ length: endOffset }, (_, i) => {
      const day = new Date(year, month + 1, i + 1);
      return { date: day, isCurrentMonth: false };
    });
    
    return [...daysFromPrevMonth, ...daysFromCurrentMonth, ...daysFromNextMonth];
  };

  const days = getMonthDays();
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getEmployeeName = (employeeId: number): string => {
    const employee = employees.find(e => e.id === employeeId);
    return employee ? employee.name : 'Unknown';
  };

  const getLeaveTypeDetails = (leaveTypeId: number): LeaveType => {
    const leaveType = leaveTypes.find(t => t.id === leaveTypeId);
    return leaveType || { id: 0, name: 'Unknown', color: '#cccccc' };
  };

  const isDateInLeaveRequest = (date: Date, employeeId?: number) => {
    // Filter approved leave requests only
    const relevantRequests = leaveRequests.filter(request => 
      request.status === 'approved' && 
      (selectedLeaveTypes.includes(request.type as number) || typeof request.type === 'string') &&
      (!employeeId || request.employee === getEmployeeName(employeeId))
    );
    
    const dateObj = new Date(date);
    dateObj.setHours(0, 0, 0, 0);
    
    return relevantRequests.filter(request => {
      const startDate = new Date(request.startDate);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(request.endDate);
      endDate.setHours(0, 0, 0, 0);
      
      return dateObj >= startDate && dateObj <= endDate;
    });
  };

  const downloadCalendarAsCsv = () => {
    // Create CSV headers
    let csv = 'Date,Employee,Leave Type\n';
    
    // Go through all days in the current view
    days.forEach(dayInfo => {
      const date = dayInfo.date;
      
      // Skip days from other months
      if (!dayInfo.isCurrentMonth) return;
      
      filteredEmployees.forEach(employee => {
        const leaveRequests = isDateInLeaveRequest(date, employee.id);
        if (leaveRequests.length > 0) {
          leaveRequests.forEach(request => {
            const leaveTypeDetails = typeof request.type === 'string' 
              ? { name: request.type } 
              : getLeaveTypeDetails(request.type);
            
            csv += `${date.toLocaleDateString()},${employee.name},${leaveTypeDetails.name}\n`;
          });
        }
      });
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leave-calendar-${currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leave Calendar</h1>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 mr-1 text-gray-500" /> Filters
          </button>
          <button 
            onClick={downloadCalendarAsCsv}
            className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Download className="h-5 w-5 mr-1" /> Export
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
              <select
                value={selectedEmployeeId || ''}
                onChange={(e) => setSelectedEmployeeId(e.target.value ? Number(e.target.value) : null)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">All Employees</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>{employee.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                disabled={selectedEmployeeId !== null}
              >
                <option value="all">All Departments</option>
                {departments.map(department => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Leave Types</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {leaveTypes.map(type => (
                  <label key={type.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedLeaveTypes.includes(type.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedLeaveTypes([...selectedLeaveTypes, type.id]);
                        } else {
                          setSelectedLeaveTypes(selectedLeaveTypes.filter(id => id !== type.id));
                        }
                      }}
                      className="mr-1"
                    />
                    <div className="inline-flex items-center">
                      <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: type.color }}></div>
                      <span className="text-sm">{type.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow border">
        <div className="flex justify-between items-center p-4 border-b">
          <button 
            onClick={prevMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <h2 className="text-xl font-semibold">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          
          <button 
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-7 border-b">
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <div key={day} className="p-2 text-center font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="divide-y">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 divide-x min-h-32">
                  {week.map((day, dayIndex) => {
                    const isToday = day.date.toDateString() === new Date().toDateString();
                    const dayLeaves = filteredEmployees.flatMap(employee => {
                      const leaves = isDateInLeaveRequest(day.date, employee.id);
                      return leaves.map(leave => ({
                        ...leave,
                        employeeName: employee.name
                      }));
                    });
                    
                    return (
                      <div 
                        key={dayIndex} 
                        className={`p-1 ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'} ${isToday ? 'border-2 border-blue-500' : ''}`}
                      >
                        <div className="text-right p-1">
                          {day.date.getDate()}
                        </div>
                        
                        <div className="mt-1 space-y-1 max-h-28 overflow-y-auto">
                          {dayLeaves.length > 0 ? (
                            dayLeaves.map((leave, idx) => {
                              const leaveTypeDetails = typeof leave.type === 'string' 
                                ? { name: leave.type, color: '#3b82f6' } 
                                : getLeaveTypeDetails(leave.type);
                              
                              return (
                                <div 
                                  key={idx}
                                  className="text-xs p-1 rounded truncate"
                                  style={{ backgroundColor: leaveTypeDetails.color + '40' }}
                                >
                                  <span className="font-medium">{leave.employeeName}</span>
                                  {' - '}
                                  <span>{leaveTypeDetails.name}</span>
                                </div>
                              );
                            })
                          ) : (
                            <div className="h-4"></div> // Empty placeholder to maintain height
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {filteredEmployees.length === 0 && (
          <div className="flex flex-col items-center justify-center p-10 text-gray-500">
            <Users className="h-12 w-12 mb-2" />
            <p>No employees match the current filters</p>
          </div>
        )}
      </div>
    </div>
  );
}