'use client';

import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { Download } from 'lucide-react'; // Cleaned unused icons

// Define types for our data structures
interface Employee {
  id: string;
  name: string;
  department: string;
  // Add other employee properties as needed
}

interface LeaveType {
  id: string;
  name: string;
  // Add other leave type properties as needed
}

interface LeaveRequest {
  id?: string;
  employee: string | Employee;
  type: string | LeaveType;
  startDate: string;
  endDate: string;
  // Add other leave request properties as needed
}

interface LeaveBalance {
  id?: string;
  employeeId: string;
  leaveTypeId?: string;
  remaining: number;
  // Add other leave balance properties as needed
}

export default function ReportsPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([]);
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
    const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const storedLeaveTypes = JSON.parse(localStorage.getItem('leaveTypes') || '[]');
    const storedLeaveRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    const storedLeaveBalances = JSON.parse(localStorage.getItem('leaveBalances') || '[]');

    setEmployees(storedEmployees);
    setLeaveTypes(storedLeaveTypes);
    setLeaveRequests(storedLeaveRequests);
    setLeaveBalances(storedLeaveBalances);
    setIsLoading(false);
  }, []);

  const departments = Array.from(new Set(employees.map(employee => employee.department)));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ff6b6b', '#6b88ff'];

  const getEmployeeName = (employeeId: string | Employee): string => {
    if (typeof employeeId === 'string') return employeeId;
    return employeeId?.name || 'Unknown';
  };

  const getLeaveTypeName = (leaveTypeId: string | LeaveType): string => {
    if (typeof leaveTypeId === 'string') return leaveTypeId;
    return leaveTypeId?.name || 'Unknown';
  };

  const getEmployeeDepartment = (employeeId: string | Employee): string => {
    if (typeof employeeId === 'string') {
      const employee = employees.find(e => e.name === employeeId);
      return employee ? employee.department : 'Unknown';
    }
    return employeeId?.department || 'Unknown';
  };

  const filteredLeaveRequests = leaveRequests.filter(request => {
    const requestStartDate = new Date(request.startDate);
    const requestEndDate = new Date(request.endDate);
    const filterStartDate = new Date(dateRange.start);
    const filterEndDate = new Date(dateRange.end);

    if (requestEndDate < filterStartDate || requestStartDate > filterEndDate) {
      return false;
    }

    if (filterDepartment !== 'all') {
      const employeeDepartment = getEmployeeDepartment(request.employee);
      if (employeeDepartment !== filterDepartment) {
        return false;
      }
    }

    if (filterLeaveType !== 'all') {
      const leaveTypeName = getLeaveTypeName(request.type);
      if (leaveTypeName !== filterLeaveType) {
        return false;
      }
    }

    if (filterEmployee !== 'all') {
      const employeeName = getEmployeeName(request.employee);
      if (employeeName !== filterEmployee) {
        return false;
      }
    }

    return true;
  });

  const generateReportData = () => {
    if (reportType === 'usage') {
      const leaveTypeUsage: Record<string, number> = {};
      filteredLeaveRequests.forEach(request => {
        const leaveTypeName = getLeaveTypeName(request.type);
        const startDate = new Date(request.startDate);
        const endDate = new Date(request.endDate);
        const daysCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        leaveTypeUsage[leaveTypeName] = (leaveTypeUsage[leaveTypeName] || 0) + daysCount;
      });
      return Object.entries(leaveTypeUsage).map(([name, value]) => ({ name, value }));
    }

    if (reportType === 'departmentUsage') {
      const departmentUsage: Record<string, number> = {};
      filteredLeaveRequests.forEach(request => {
        const department = getEmployeeDepartment(request.employee);
        const startDate = new Date(request.startDate);
        const endDate = new Date(request.endDate);
        const daysCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        departmentUsage[department] = (departmentUsage[department] || 0) + daysCount;
      });
      return Object.entries(departmentUsage).map(([name, value]) => ({ name, value }));
    }

    if (reportType === 'employeeUsage') {
      const employeeUsage: Record<string, number> = {};
      filteredLeaveRequests.forEach(request => {
        const name = getEmployeeName(request.employee);
        const startDate = new Date(request.startDate);
        const endDate = new Date(request.endDate);
        const daysCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        employeeUsage[name] = (employeeUsage[name] || 0) + daysCount;
      });
      return Object.entries(employeeUsage).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10);
    }

    if (reportType === 'monthlyTrend') {
      const monthlyData = Array(12).fill(null).map((_, i) => ({
        name: new Date(0, i).toLocaleString('default', { month: 'short' }),
        value: 0,
        month: i
      }));

      filteredLeaveRequests.forEach(request => {
        const startDate = new Date(request.startDate);
        const endDate = new Date(request.endDate);
        const current = new Date(startDate);
        while (current <= endDate) {
          monthlyData[current.getMonth()].value += 1;
          current.setDate(current.getDate() + 1);
        }
      });

      return monthlyData;
    }

    if (reportType === 'balances') {
      const employeeBalances: Record<string, number> = {};
      employees.forEach(emp => {
        employeeBalances[emp.name] = 0;
        leaveBalances.forEach(balance => {
          if (balance.employeeId === emp.id) {
            employeeBalances[emp.name] += balance.remaining;
          }
        });
      });
      return Object.entries(employeeBalances).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
    }

    return [];
  };

  const reportData = generateReportData();

  const exportToCsv = () => {
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <select value={filterDepartment} onChange={e => setFilterDepartment(e.target.value)} className="border rounded px-3 py-2">
          <option value="all">All Departments</option>
          {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
        </select>

        <select value={filterLeaveType} onChange={e => setFilterLeaveType(e.target.value)} className="border rounded px-3 py-2">
          <option value="all">All Leave Types</option>
          {leaveTypes.map(type => <option key={type.id} value={type.name}>{type.name}</option>)}
        </select>

        <select value={filterEmployee} onChange={e => setFilterEmployee(e.target.value)} className="border rounded px-3 py-2">
          <option value="all">All Employees</option>
          {employees.map(emp => <option key={emp.id} value={emp.name}>{emp.name}</option>)}
        </select>

        <div className="flex gap-2">
          <input type="date" value={dateRange.start} onChange={e => setDateRange({ ...dateRange, start: e.target.value })} className="border rounded px-2" />
          <input type="date" value={dateRange.end} onChange={e => setDateRange({ ...dateRange, end: e.target.value })} className="border rounded px-2" />
        </div>
      </div>

      {/* Report type selector */}
      <div className="flex gap-4">
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
      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          {reportType === 'monthlyTrend' || reportType === 'employeeUsage' || reportType === 'balances' ? (
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          ) : (
            <PieChart>
              <Pie data={reportData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120}>
                {reportData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}