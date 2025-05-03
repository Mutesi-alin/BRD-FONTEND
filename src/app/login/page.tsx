// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function LoginPage() {
//   const [role, setRole] = useState('employee');
//   const router = useRouter();

//   const handleLogin = () => {
//     localStorage.setItem('role', role);
//     if (role === 'admin') {
//       router.push('/components-admin/leave-type');
//     } else if (role === 'manager') {
//       router.push('/manager/LeaveApprovalPanel');
//     } else {
//       router.push('/dashboard');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white p-6 rounded shadow max-w-sm w-full">
//         <h2 className="text-xl font-bold mb-4">Login</h2>

//         <label className="block mb-2 font-medium">Select Role</label>
//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="w-full border p-2 mb-4 rounded"
//         >
//           <option value="employee">Employee</option>
//           <option value="manager">Manager</option>
//           <option value="admin">Admin</option>
//         </select>

//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [role, setRole] = useState('employee');
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem('role', role);

    if (role === 'admin') {
      router.push('/admin/dashboard');
    } else if (role === 'manager') {
      router.push('/manager/LeaveApprovalPanel');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <label className="block mb-2 font-medium">Select Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
