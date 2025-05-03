'use client';

import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  Download, Filter, BarChart2, PieChart as PieChartIcon, Calendar
} from 'lucide-react';

export default function ReportsPage() {
  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [reportType, setReportType] = useState('usage');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterLeaveType, setFilterLeaveType] = useState('all');
  const [filterEmployee, setFilterEmployee] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), 0, 1).toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10)
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from localStorage
    try {
      const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
      const storedLeaveTypes = JSON.parse(localStorage.getItem('leaveTypes') || '[]');
      const storedLeaveRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
      const storedLeaveBalances = JSON.parse(localStorage.getItem('leaveBalances') || '[]');

      setEmployees(storedEmployees);
      setLeaveTypes(storedLeaveTypes);
      setLeaveRequests(storedLeaveRequests);
      setLeaveBalances(storedLeaveBalances);
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const departments = Array.from(new Set(employees.map(employee => employee.department).filter(Boolean)));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ff6b6b', '#6b88ff'];

  const getEmployeeName = (employeeId) => {
    // Handle both ID and direct name cases
    if (!employeeId) return 'Unknown';
    
    if (typeof employeeId === 'string' && !employeeId.match(/^[0-9a-f-]+$/i)) {
      return employeeId; // Already a name
    }
    
    const employee = employees.find(e => e.id === employeeId);
    return employee ? employee.name : 'Unknown';
  };

  const getLeaveTypeName = (leaveTypeId) => {
    // Handle both ID and direct name cases
    if (!leaveTypeId) return 'Unknown';
    
    if (typeof leaveTypeId === 'string' && !leaveTypeId.match(/^[0-9a-f-]+$/i)) {
      return leaveTypeId; // Already a name
    }
    
    const leaveType = leaveTypes.find(t => t.id === leaveTypeId);
    return leaveType ? leaveType.name : 'Unknown';
  };

  const getEmployeeDepartment = (employeeId) => {
    // Handle both ID and name cases
    if (!employeeId) return 'Unknown';
    
    // If it's a name, find by name
    if (typeof employeeId === 'string' && !employeeId.match(/^[0-9a-f-]+$/i)) {
      const employee = employees.find(e => e.name === employeeId);
      return employee ? employee.department : 'Unknown';
    }
    
    // Otherwise find by ID
    const employee = employees.find(e => e.id === employeeId);
    return employee ? employee.department : 'Unknown';
  };

  const calculateDateDifference = (startDate, endDate) => {
    // Ensure we have valid dates
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Check for invalid dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    
    // Calculate difference in days
    return Math.max(0, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);
  };

  const filteredLeaveRequests = leaveRequests.filter(request => {
    // Skip invalid requests
    if (!request || !request.startDate || !request.endDate) return false;
    
    try {
      const requestStartDate = new Date(request.startDate);
      const requestEndDate = new Date(request.endDate);
      const filterStartDate = new Date(dateRange.start);
      const filterEndDate = new Date(dateRange.end);
      
      // Check for invalid dates
      if (isNaN(requestStartDate.getTime()) || isNaN(requestEndDate.getTime()) ||
          isNaN(filterStartDate.getTime()) || isNaN(filterEndDate.getTime())) {
        return false;
      }

      // Date range filter
      if (requestEndDate < filterStartDate || requestStartDate > filterEndDate) {
        return false;
      }

      // Department filter
      if (filterDepartment !== 'all') {
        const employeeDepartment = getEmployeeDepartment(request.employee);
        if (employeeDepartment !== filterDepartment) {
          return false;
        }
      }

      // Leave type filter
      if (filterLeaveType !== 'all') {
        const leaveTypeName = getLeaveTypeName(request.type);
        if (leaveTypeName !== filterLeaveType) {
          return false;
        }
      }

      // Employee filter
      if (filterEmployee !== 'all') {
        const employeeName = getEmployeeName(request.employee);
        if (employeeName !== filterEmployee) {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("Error filtering leave request:", error, request);
      return false;
    }
  });

  const generateReportData = () => {
    try {
      if (reportType === 'usage') {
        const leaveTypeUsage = {};
        filteredLeaveRequests.forEach(request => {
          const leaveTypeName = getLeaveTypeName(request.type);
          const daysCount = calculateDateDifference(request.startDate, request.endDate);
          
          leaveTypeUsage[leaveTypeName] = (leaveTypeUsage[leaveTypeName] || 0) + daysCount;
        });
        return Object.entries(leaveTypeUsage).map(([name, value]) => ({ name, value }));
      }

      if (reportType === 'departmentUsage') {
        const departmentUsage = {};
        filteredLeaveRequests.forEach(request => {
          const department = getEmployeeDepartment(request.employee);
          const daysCount = calculateDateDifference(request.startDate, request.endDate);
          
          departmentUsage[department] = (departmentUsage[department] || 0) + daysCount;
        });
        return Object.entries(departmentUsage).map(([name, value]) => ({ name, value }));
      }

      if (reportType === 'employeeUsage') {
        const employeeUsage = {};
        filteredLeaveRequests.forEach(request => {
          const name = getEmployeeName(request.employee);
          const daysCount = calculateDateDifference(request.startDate, request.endDate);
          
          employeeUsage[name] = (employeeUsage[name] || 0) + daysCount;
        });
        return Object.entries(employeeUsage)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 10);
      }

      if (reportType === 'monthlyTrend') {
        const monthlyData = Array(12).fill().map((_, i) => ({
          name: new Date(2000, i).toLocaleString('default', { month: 'short' }),
          value: 0,
          month: i
        }));

        filteredLeaveRequests.forEach(request => {
          try {
            const startDate = new Date(request.startDate);
            const endDate = new Date(request.endDate);
            
            // Skip invalid dates
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return;
            
            // Count days in each month
            let current = new Date(startDate);
            while (current <= endDate) {
              monthlyData[current.getMonth()].value += 1;
              current.setDate(current.getDate() + 1);
            }
          } catch (error) {
            console.error("Error processing request for monthly trend:", error);
          }
        });

        return monthlyData;
      }

      if (reportType === 'balances') {
        const employeeBalances = {};
        
        employees.forEach(emp => {
          if (!emp || !emp.id || !emp.name) return;
          
          employeeBalances[emp.name] = 0;
          
          leaveBalances.forEach(balance => {
            if (balance && balance.employeeId === emp.id) {
              const remaining = Number(balance.remaining) || 0;
              employeeBalances[emp.name] += remaining;
            }
          });
        });
        
        return Object.entries(employeeBalances)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value);
      }
    } catch (error) {
      console.error("Error generating report data:", error);
    }

    return [];
  };

  const reportData = generateReportData();

  const exportToCsv = () => {
    try {
      const headers = reportType === 'monthlyTrend' ? 'Month,Days\n' : 'Name,Days\n';
      const csvData = reportData.map(item => `${item.name},${item.value}`).join('\n');
      const blob = new Blob([headers + csvData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leave-report-${reportType}-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up to avoid memory leaks
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Failed to export data. Please try again.");
    }
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
        <h1 className="text-2xl font-bold">Leave Reports</h1>
        <button
          onClick={exportToCsv}
          className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Download className="h-5 w-5 mr-1" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select 
          value={filterDepartment} 
          onChange={e => setFilterDepartment(e.target.value)} 
          className="border rounded px-3 py-2"
        >
          <option value="all">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <select 
          value={filterLeaveType} 
          onChange={e => setFilterLeaveType(e.target.value)} 
          className="border rounded px-3 py-2"
        >
          <option value="all">All Leave Types</option>
          {leaveTypes.map(type => (
            <option key={type.id} value={type.name}>{type.name}</option>
          ))}
        </select>

        <select 
          value={filterEmployee} 
          onChange={e => setFilterEmployee(e.target.value)} 
          className="border rounded px-3 py-2"
        >
          <option value="all">All Employees</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.name}>{emp.name}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <input 
            type="date" 
            value={dateRange.start} 
            onChange={e => setDateRange({ ...dateRange, start: e.target.value })} 
            className="border rounded px-2 w-full"
          />
          <input 
            type="date" 
            value={dateRange.end} 
            onChange={e => setDateRange({ ...dateRange, end: e.target.value })} 
            className="border rounded px-2 w-full"
          />
        </div>
      </div>

      {/* Report type selector */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'usage', label: 'Leave Type Usage' },
          { id: 'departmentUsage', label: 'Department Usage' },
          { id: 'employeeUsage', label: 'Employee Usage' },
          { id: 'monthlyTrend', label: 'Monthly Trend' },
          { id: 'balances', label: 'Leave Balances' }
        ].map(type => (
          <button
            key={type.id}
            onClick={() => setReportType(type.id)}
            className={`px-3 py-2 rounded ${reportType === type.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Chart display */}
      <div className="w-full h-[400px] border rounded p-4">
        {reportData.length > 0 ? (
          <ResponsiveContainer>
            {reportType === 'monthlyTrend' || reportType === 'employeeUsage' || reportType === 'balances' ? (
              <BarChart data={reportData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Days" />
              </BarChart>
            ) : (
              <PieChart>
                <Pie 
                  data={reportData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={120}
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {reportData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} days`, 'Usage']} />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">No data available for the selected filters</p>
          </div>
        )}
      </div>
    </div>
  );
}