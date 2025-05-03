'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, User, Calendar, Filter, Search } from 'lucide-react';

export default function LeaveCalendarPage() {
  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterLeaveType, setFilterLeaveType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState('month'); // 'month', 'week', 'day'

  useEffect(() => {
    // Load data from localStorage
    const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const storedLeaveTypes = JSON.parse(localStorage.getItem('leaveTypes') || '[]');
    const storedLeaveRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    
    setEmployees(storedEmployees);
    setLeaveTypes(storedLeaveTypes);
    setLeaveRequests(storedLeaveRequests);
    setIsLoading(false);
  }, []);

  // Get unique departments
  const departments = Array.from(new Set(employees.map(employee => employee.department)));

  // Get employee name from ID
  const getEmployeeName = (employeeId) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee ? employee.name : 'Unknown';
  };

  // Get leave type details from ID
  const getLeaveType = (leaveTypeId) => {
    return leaveTypes.find(t => t.id === leaveTypeId) || { name: 'Unknown', color: '#cccccc' };
  };

  // Get filtered employees
  const filteredEmployees = employees.filter(employee => {
    // Department filter
    if (filterDepartment !== 'all' && employee.department !== filterDepartment) {
      return false;
    }
    
    // Search filter
    if (searchTerm && !employee.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Get filtered leave requests
  const filteredLeaveRequests = leaveRequests.filter(request => {
    // Employee filter
    if (selectedEmployee !== 'all' && request.employee !== selectedEmployee) {
      return false;
    }
    
    // Department filter (if employee filter is not applied)
    if (selectedEmployee === 'all' && filterDepartment !== 'all') {
      const employee = employees.find(e => e.id === request.employee);
      if (!employee || employee.department !== filterDepartment) {
        return false;
      }
    }
    
    // Leave type filter
    if (filterLeaveType !== 'all' && request.type !== filterLeaveType) {
      return false;
    }
    
    // Relevant to current view date
    const requestStartDate = new Date(request.startDate);
    const requestEndDate = new Date(request.endDate);
    
    if (viewType === 'month') {
      // Check if request overlaps with current month
      const viewMonth = currentDate.getMonth();
      const viewYear = currentDate.getFullYear();
      const requestStartMonth = requestStartDate.getMonth();
      const requestStartYear = requestStartDate.getFullYear();
      const requestEndMonth = requestEndDate.getMonth();
      const requestEndYear = requestEndDate.getFullYear();
      
      return (
        (requestStartYear === viewYear && requestStartMonth === viewMonth) ||
        (requestEndYear === viewYear && requestEndMonth === viewMonth) ||
        (requestStartYear < viewYear && requestEndYear > viewYear) ||
        (requestStartYear === viewYear && requestEndYear === viewYear && 
         requestStartMonth < viewMonth && requestEndMonth > viewMonth)
      );
    } else if (viewType === 'week') {
      // Get first and last day of current week
      const firstDay = new Date(currentDate);
      const day = firstDay.getDay();
      const diff = firstDay.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
      firstDay.setDate(diff);
      firstDay.setHours(0, 0, 0, 0);
      
      const lastDay = new Date(firstDay);
      lastDay.setDate(lastDay.getDate() + 6);
      lastDay.setHours(23, 59, 59, 999);
      
      return (
        (requestStartDate <= lastDay && requestEndDate >= firstDay)
      );
    } else if (viewType === 'day') {
      // Check if request overlaps with current day
      const viewDate = new Date(currentDate);
      viewDate.setHours(0, 0, 0, 0);
      const viewDateEnd = new Date(currentDate);
      viewDateEnd.setHours(23, 59, 59, 999);
      
      return (
        (requestStartDate <= viewDateEnd && requestEndDate >= viewDate)
      );
    }
    
    return true;
  });

  // Generate days for month view
  const generateMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Day of the week for first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();
    
    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    // Generate array of days
    const days = [];
    
    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = prevMonthLastDay - daysFromPrevMonth + 1; i <= prevMonthLastDay; i++) {
      days.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    // Add days from current month
    const daysInMonth = lastDay.getDate();
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: 
          date.getDate() === today.getDate() && 
          date.getMonth() === today.getMonth() && 
          date.getFullYear() === today.getFullYear()
      });
    }
    
    // Add days from next month to complete the grid (always 6 rows of 7 days)
    const totalDaysNeeded = 42; // 6 rows of 7 days
    const daysFromNextMonth = totalDaysNeeded - days.length;
    for (let i = 1; i <= daysFromNextMonth; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    return days;
  };

  // Generate days for week view
  const generateWeekDays = () => {
    const currentDay = new Date(currentDate);
    const day = currentDay.getDay();
    const diff = currentDay.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(diff + i);
      
      const today = new Date();
      days.push({
        date,
        isToday: 
          date.getDate() === today.getDate() && 
          date.getMonth() === today.getMonth() && 
          date.getFullYear() === today.getFullYear()
      });
    }
    
    return days;
  };

  // Check if a leave request is on a specific date
  const isLeaveOnDate = (request, date) => {
    const requestStartDate = new Date(request.startDate);
    requestStartDate.setHours(0, 0, 0, 0);
    
    const requestEndDate = new Date(request.endDate);
    requestEndDate.setHours(23, 59, 59, 999);
    
    const checkDate = new Date(date);
    checkDate.setHours(12, 0, 0, 0);
    
    return requestStartDate <= checkDate && requestEndDate >= checkDate;
  };

  // Get leave requests for a specific date
  const getLeavesForDate = (date) => {
    return filteredLeaveRequests.filter(request => isLeaveOnDate(request, date));
  };

  // Format date as Month YYYY
  const formatMonthYear = (date) => {
    return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  };

  // Format date as Day of week, Month Day
  const formatDayMonthDate = (date) => {
    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Navigate to previous period
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  // Navigate to next period
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Render month view
  const renderMonthView = () => {
    const days = generateMonthDays();
    
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="bg-gray-100 py-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((day, index) => {
            const leaves = getLeavesForDate(day.date);
            
            return (
              <div 
                key={index} 
                className={`bg-white min-h-32 p-2 ${day.isCurrentMonth ? '' : 'text-gray-400'} ${day.isToday ? 'bg-blue-50' : ''}`}
              >
                <div className="font-semibold text-sm mb-1">
                  {day.date.getDate()}
                </div>
                <div className="space-y-1 overflow-y-auto max-h-28">
                  {leaves.map((leave, idx) => {
                    const leaveType = getLeaveType(leave.type);
                    
                    return (
                      <div 
                        key={idx}
                        className="text-xs p-1 rounded truncate"
                        style={{ backgroundColor: leaveType.color + '33', borderLeft: `3px solid ${leaveType.color}` }}
                        title={`${getEmployeeName(leave.employee)} - ${leaveType.name}`}
                      >
                        {selectedEmployee === 'all' ? getEmployeeName(leave.employee) : leaveType.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const days = generateWeekDays();
    
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((day, index) => (
            <div 
              key={index} 
              className={`text-center py-2 ${day.isToday ? 'bg-blue-50' : 'bg-gray-100'}`}
            >
              <div className="text-sm font-medium text-gray-500">
                {day.date.toLocaleDateString(undefined, { weekday: 'short' })}
              </div>
              <div className="font-semibold">
                {day.date.getDate()}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((day, index) => {
            const leaves = getLeavesForDate(day.date);
            
            return (
              <div 
                key={index} 
                className={`bg-white min-h-64 p-2 ${day.isToday ? 'bg-blue-50' : ''}`}
              >
                <div className="space-y-2 overflow-y-auto max-h-60">
                  {leaves.map((leave, idx) => {
                    const leaveType = getLeaveType(leave.type);
                    
                    return (
                      <div 
                        key={idx}
                        className="text-sm p-2 rounded"
                        style={{ backgroundColor: leaveType.color + '33', borderLeft: `3px solid ${leaveType.color}` }}
                      >
                        <div className="font-medium">
                          {selectedEmployee === 'all' ? getEmployeeName(leave.employee) : leaveType.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {selectedEmployee === 'all' ? leaveType.name : ''}
                          {leave.status && ` • ${leave.status}`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render day view
  const renderDayView = () => {
    const leaves = getLeavesForDate(currentDate);
    
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">
            {currentDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
        </div>
        <div className="p-4">
          {leaves.length === 0 ? (
            <div className="text-gray-500 text-center py-8">No leave requests for this day</div>
          ) : (
            <div className="space-y-4">
              {leaves.map((leave, idx) => {
                const leaveType = getLeaveType(leave.type);
                
                return (
                  <div 
                    key={idx}
                    className="p-4 rounded"
                    style={{ backgroundColor: leaveType.color + '22', borderLeft: `4px solid ${leaveType.color}` }}
                  >
                    <div className="font-semibold">{getEmployeeName(leave.employee)}</div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <span 
                          className="inline-block w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: leaveType.color }}
                        ></span>
                        <span>{leaveType.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    {leave.notes && (
                      <div className="mt-2 text-sm text-gray-600 border-t pt-2">
                        {leave.notes}
                      </div>
                    )}
                    <div className="mt-2 text-sm">
                      <span className={`
                        inline-block px-2 py-1 rounded-full text-xs
                        ${leave.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          leave.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'}
                      `}>
                        {leave.status || 'Pending'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
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
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Period navigation */}
          <div className="flex items-center justify-between">
            <button 
              onClick={goToPrevious}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-lg font-semibold">
              {viewType === 'month' ? formatMonthYear(currentDate) :
               viewType === 'week' ? `Week of ${formatDayMonthDate(generateWeekDays()[0].date)}` :
               formatDayMonthDate(currentDate)}
            </div>
            <button 
              onClick={goToNext}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* View type selection */}
          <div className="flex items-center justify-center space-x-1">
            <button
              onClick={() => setViewType('month')}
              className={`px-3 py-1 rounded ${viewType === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Month
            </button>
            <button
              onClick={() => setViewType('week')}
              className={`px-3 py-1 rounded ${viewType === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Week
            </button>
            <button
              onClick={() => setViewType('day')}
              className={`px-3 py-1 rounded ${viewType === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Day
            </button>
          </div>

          {/* Today button */}
          <div className="flex items-center justify-end">
            <button
              onClick={goToToday}
              className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Today
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Employee filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
            <div className="relative">
              <User className="absolute top-2.5 left-2 h-5 w-5 text-gray-400" />
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="pl-9 border rounded w-full p-2 appearance-none"
              >
                <option value="all">All Employees</option>
                {filteredEmployees.map(employee => (
                  <option key={employee.id} value={employee.id}>{employee.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Department filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <div className="relative">
              <Filter className="absolute top-2.5 left-2 h-5 w-5 text-gray-400" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="pl-9 border rounded w-full p-2 appearance-none"
              >
                <option value="all">All Departments</option>
                {departments.map(department => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Leave type filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
            <div className="relative">
              <Calendar className="absolute top-2.5 left-2 h-5 w-5 text-gray-400" />
              <select
                value={filterLeaveType}
                onChange={(e) => setFilterLeaveType(e.target.value)}
                className="pl-9 border rounded w-full p-2 appearance-none"
              >
                <option value="all">All Leave Types</option>
                {leaveTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute top-2.5 left-2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search employees..."
                className="pl-9 border rounded w-full p-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {viewType === 'month' && renderMonthView()}
        {viewType === 'week' && renderWeekView()}
        {viewType === 'day' && renderDayView()}
      </div>
    </div>
  );
}