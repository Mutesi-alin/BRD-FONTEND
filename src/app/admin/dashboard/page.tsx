

// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Calendar, Users, FileText, Bell, BarChart2, Briefcase, Clock, Award } from 'lucide-react';

// export default function AdminDashboard() {
//   const [employeeCount, setEmployeeCount] = useState(0);
//   const [pendingRequests, setPendingRequests] = useState(0);
//   const [departmentCount, setDepartmentCount] = useState(0);
//   const [approvalRate, setApprovalRate] = useState(0);

//   useEffect(() => {
//     // Demo data
//     const employees = [
//       { id: 1, name: 'John Doe', department: 'Engineering', position: 'Senior Developer' },
//       { id: 2, name: 'Jane Smith', department: 'HR', position: 'HR Manager' },
//       { id: 3, name: 'Bob Johnson', department: 'Marketing', position: 'Marketing Specialist' },
//       { id: 4, name: 'Alice Brown', department: 'Engineering', position: 'Frontend Developer' },
//       { id: 5, name: 'Charlie Wilson', department: 'Finance', position: 'Accountant' },
//       { id: 6, name: 'Diana Miller', department: 'Product', position: 'Product Manager' },
//       { id: 7, name: 'Edward Davis', department: 'Engineering', position: 'Backend Developer' },
//       { id: 8, name: 'Fiona Clark', department: 'Customer Support', position: 'Support Specialist' },
//     ];
    
//     const leaveRequests = [
//       { id: 1, employee: 'John Doe', type: 'Annual Leave', startDate: '2025-05-10', endDate: '2025-05-15', status: 'approved' },
//       { id: 2, employee: 'Jane Smith', type: 'Sick Leave', startDate: '2025-05-07', endDate: '2025-05-08', status: 'pending' },
//       { id: 3, employee: 'Bob Johnson', type: 'Annual Leave', startDate: '2025-05-20', endDate: '2025-05-22', status: 'pending' },
//       { id: 4, employee: 'Alice Brown', type: 'Personal Leave', startDate: '2025-06-01', endDate: '2025-06-02', status: 'pending' },
//       { id: 5, employee: 'Charlie Wilson', type: 'Comp Off', startDate: '2025-05-12', endDate: '2025-05-12', status: 'approved' },
//       { id: 6, employee: 'Diana Miller', type: 'Annual Leave', startDate: '2025-06-15', endDate: '2025-06-20', status: 'rejected' },
//     ];
    
//     const departments = [
//       { id: 1, name: 'Engineering', headCount: 3 },
//       { id: 2, name: 'HR', headCount: 1 },
//       { id: 3, name: 'Marketing', headCount: 1 },
//       { id: 4, name: 'Finance', headCount: 1 },
//       { id: 5, name: 'Product', headCount: 1 },
//       { id: 6, name: 'Customer Support', headCount: 1 },
//     ];

//     localStorage.setItem('employees', JSON.stringify(employees));
//     localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));
//     localStorage.setItem('departments', JSON.stringify(departments));

//     setEmployeeCount(employees.length);
//     setPendingRequests(leaveRequests.filter((r) => r.status === 'pending').length);
//     setDepartmentCount(departments.length);
    
//     const approved = leaveRequests.filter(r => r.status === 'approved').length;
//     const total = leaveRequests.length;
//     setApprovalRate(Math.round((approved / total) * 100));
//   }, []);

//   const recentActivity = [
//     { id: 1, text: 'Alice Brown requested personal leave for June 1-2', time: '10 minutes ago' },
//     { id: 2, text: 'HR added a new leave type: "Comp Off"', time: '1 hour ago' },
//     { id: 3, text: 'John Doe\'s leave request was approved', time: '3 hours ago' },
//     { id: 4, text: 'Diana Miller\'s leave request was rejected', time: '5 hours ago' },
//     { id: 5, text: 'New employee Edward Davis joined Engineering', time: '1 day ago' },
//   ];

//   const monthlyLeaveData = [
//     { name: 'Jan', count: 12 },
//     { name: 'Feb', count: 19 },
//     { name: 'Mar', count: 15 },
//     { name: 'Apr', count: 8 },
//     { name: 'May', count: 23 },
//     { name: 'Jun', count: 17 },
//   ];

//   const departmentData = [
//     { name: 'Engineering', value: 3 },
//     { name: 'HR', value: 1 },
//     { name: 'Marketing', value: 1 },
//     { name: 'Finance', value: 1 },
//     { name: 'Product', value: 1 },
//     { name: 'Customer Support', value: 1 },
//   ];

//   const leaveTypeData = [
//     { name: 'Annual', value: 3 },
//     { name: 'Sick', value: 1 },
//     { name: 'Personal', value: 1 },
//     { name: 'Comp Off', value: 1 },
//   ];

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

//   return (
//     <div className="space-y-6 p-6 bg-gray-50">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin 👋</h1>
//         <div className="relative">
//           <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <DashboardCard 
//           label="Total Employees" 
//           value={employeeCount} 
//           href="/admin/employees" 
//           icon={<Users className="h-8 w-8 text-blue-500" />}
//           color="bg-blue-50 border-blue-200"
//           textColor="text-blue-600"
//         />
//         <DashboardCard 
//           label="Pending Requests" 
//           value={pendingRequests} 
//           href="/admin/leave-requests" 
//           icon={<FileText className="h-8 w-8 text-yellow-500" />}
//           color="bg-yellow-50 border-yellow-200"
//           textColor="text-yellow-600"
//         />
//         <DashboardCard 
//           label="Departments" 
//           value={departmentCount} 
//           href="/admin/departments" 
//           icon={<Briefcase className="h-8 w-8 text-green-500" />}
//           color="bg-green-50 border-green-200"
//           textColor="text-green-600"
//         />
//         <DashboardCard 
//           label="Approval Rate" 
//           value={`${approvalRate}%`} 
//           href="/admin/analytics" 
//           icon={<Award className="h-8 w-8 text-purple-500" />}
//           color="bg-purple-50 border-purple-200"
//           textColor="text-purple-600"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow border">
//           <h2 className="text-lg font-semibold mb-4 flex items-center">
//             <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
//             Monthly Leave Requests
//           </h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={monthlyLeaveData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="count" fill="#3b82f6" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow border">
//           <h2 className="text-lg font-semibold mb-4 flex items-center">
//             <Users className="h-5 w-5 mr-2 text-blue-500" />
//             Employee Distribution
//           </h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={departmentData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {departmentData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow border lg:col-span-1">
//           <h2 className="text-lg font-semibold mb-4 flex items-center">
//             <Clock className="h-5 w-5 mr-2 text-blue-500" />
//             Leave Types
//           </h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={leaveTypeData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={40}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {leaveTypeData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow border lg:col-span-2">
//           <h2 className="text-lg font-semibold mb-4 flex items-center">
//             <Bell className="h-5 w-5 mr-2 text-blue-500" />
//             Recent Activity
//           </h2>
//           <ul className="space-y-3">
//             {recentActivity.map((activity) => (
//               <li key={activity.id} className="border-b border-gray-100 pb-2 last:border-0">
//                 <p className="text-gray-800">{activity.text}</p>
//                 <span className="text-xs text-gray-500">{activity.time}</span>
//               </li>
//             ))}
//           </ul>
//           <div className="mt-4">
//             <Link href="/admin/activity">
//               <button className="text-blue-500 text-sm hover:underline">View all activity →</button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow border">
//           <h2 className="text-lg font-semibold mb-4 flex items-center">
//             <Calendar className="h-5 w-5 mr-2 text-blue-500" />
//             Upcoming Leave Requests
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
//                   <td className="px-6 py-4 whitespace-nowrap">Sick Leave</td>
//                   <td className="px-6 py-4 whitespace-nowrap">May 7-8, 2025</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <button className="text-green-500 hover:text-green-700 mr-3">Approve</button>
//                     <button className="text-red-500 hover:text-red-700">Reject</button>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap">Bob Johnson</td>
//                   <td className="px-6 py-4 whitespace-nowrap">Annual Leave</td>
//                   <td className="px-6 py-4 whitespace-nowrap">May 20-22, 2025</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <button className="text-green-500 hover:text-green-700 mr-3">Approve</button>
//                     <button className="text-red-500 hover:text-red-700">Reject</button>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="px-6 py-4 whitespace-nowrap">Alice Brown</td>
//                   <td className="px-6 py-4 whitespace-nowrap">Personal Leave</td>
//                   <td className="px-6 py-4 whitespace-nowrap">June 1-2, 2025</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <button className="text-green-500 hover:text-green-700 mr-3">Approve</button>
//                     <button className="text-red-500 hover:text-red-700">Reject</button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-4">
//             <Link href="/admin/leave-requests">
//               <button className="text-blue-500 text-sm hover:underline">View all requests →</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const DashboardCard = ({ 
//   label, 
//   value, 
//   href, 
//   icon,
//   color = "bg-white",
//   textColor = "text-gray-800"
// }: { 
//   label: string; 
//   value: number | string; 
//   href: string;
//   icon: React.ReactNode;
//   color?: string;
//   textColor?: string;
// }) => (
//   <Link href={href}>
//     <div className={`cursor-pointer ${color} p-6 rounded-lg shadow border hover:shadow-md transition flex items-center justify-between`}>
//       <div>
//         <p className="text-gray-500 text-sm">{label}</p>
//         <p className={`mt-1 text-3xl font-bold ${textColor}`}>{value}</p>
//       </div>
//       <div>
//         {icon}
//       </div>
//     </div>
//   </Link>
// );

'use client';

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts';

import { useEffect, useState } from 'react';

const pieData = [
  { name: 'Approved', value: 60, color: '#4caf50' },
  { name: 'Pending', value: 30, color: '#ff9800' },
  { name: 'Rejected', value: 10, color: '#f44336' },
];

const barData = [
  { name: 'Jan', Approved: 40, Pending: 24, Rejected: 16 },
  { name: 'Feb', Approved: 30, Pending: 13, Rejected: 12 },
  { name: 'Mar', Approved: 20, Pending: 18, Rejected: 8 },
  { name: 'Apr', Approved: 27, Pending: 39, Rejected: 10 },
];

const lineData = [
  { name: 'Jan', Leaves: 30 },
  { name: 'Feb', Leaves: 45 },
  { name: 'Mar', Leaves: 35 },
  { name: 'Apr', Leaves: 50 },
];

const areaData = [
  { name: 'Week 1', Approved: 10, Pending: 5 },
  { name: 'Week 2', Approved: 15, Pending: 10 },
  { name: 'Week 3', Approved: 20, Pending: 8 },
  { name: 'Week 4', Approved: 25, Pending: 12 },
];

export default function AdminDashboard() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
      {/* Pie Chart */}
      <div className="rounded-2xl bg-white p-4 shadow-md dark:bg-gray-800">
        <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">Leave Status Distribution</h2>
        <div className="h-[300px]">
          {isClient && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="rounded-2xl bg-white p-4 shadow-md dark:bg-gray-800">
        <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">Monthly Leave Applications</h2>
        <div className="h-[300px]">
          {isClient && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Approved" fill="#4caf50" />
                <Bar dataKey="Pending" fill="#ff9800" />
                <Bar dataKey="Rejected" fill="#f44336" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Line Chart */}
      <div className="rounded-2xl bg-white p-4 shadow-md dark:bg-gray-800">
        <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">Leaves Over Time</h2>
        <div className="h-[300px]">
          {isClient && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Leaves" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Area Chart */}
      <div className="rounded-2xl bg-white p-4 shadow-md dark:bg-gray-800">
        <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">Weekly Leave Trends</h2>
        <div className="h-[300px]">
          {isClient && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="Approved" stroke="#4caf50" fill="#a5d6a7" />
                <Area type="monotone" dataKey="Pending" stroke="#ff9800" fill="#ffe0b2" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
