
// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('employee');
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const success = localStorage.getItem('signup-success');
//     if (success) {
//       setSuccessMessage('Account created successfully! Please log in.');
//       localStorage.removeItem('signup-success');
//     }
//   }, []);

//   const handleLogin = () => {
//     const users = JSON.parse(localStorage.getItem('users') || '[]');

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const matchedUser = users.find(
//       (user: any) =>
//         user.email === email && user.password === password && user.role === role
//     );

//     if (!matchedUser) {
//       setError('Invalid credentials or role mismatch');
//       return;
//     }

//     localStorage.setItem('user', JSON.stringify(matchedUser));
//     localStorage.setItem('role', role);

//     if (role === 'admin') {
//       router.push('/admin/dashboard');
//     } else if (role === 'manager') {
//       router.push('/manager/LeaveApprovalPanel');
//     } else {
//       router.push('/dashboard');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white p-6 rounded shadow max-w-sm w-full">
//         <h2 className="text-2xl font-bold mb-6 text-center text-[#3089a1]">
//           Login to Your Account
//         </h2>

//         {successMessage && (
//           <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
//             {successMessage}
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Email</label>
//           <input
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border px-3 py-2 rounded outline-[#3089a1]"
//             placeholder="john@example.com"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Password</label>
//           <input
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border px-3 py-2 rounded outline-[#3089a1]"
//             placeholder="Enter your password"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block mb-1 font-medium">Role</label>
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="w-full border px-3 py-2 rounded outline-[#3089a1]"
//           >
//             <option value="employee">Employee</option>
//             <option value="manager">Manager</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>

//         <button
//           onClick={handleLogin}
//           className="w-full bg-[#3089a1] hover:bg-[#266e83] text-white font-semibold py-2 rounded"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const success = localStorage.getItem('signup-success');
    if (success) {
      setSuccessMessage('Account created successfully! Please log in.');
      localStorage.removeItem('signup-success');
    }
  }, []);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const matchedUser = users.find(
      (user: any) =>
        user.email === email && user.password === password && user.role === role
    );

    if (!matchedUser) {
      setError('Invalid credentials or role mismatch');
      return;
    }

    localStorage.setItem('user', JSON.stringify(matchedUser));
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
        <h2 className="text-2xl font-bold mb-6 text-center text-[#3089a1]">
          Login to Your Account
        </h2>

        {successMessage && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-[#3089a1]"
            placeholder="john@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-[#3089a1]"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-[#3089a1]"
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#3089a1] hover:bg-[#266e83] text-white font-semibold py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}