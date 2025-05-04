
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface User {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  password: string;
  role: string;
}

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = () => {
    if (!fullName || !email || !phone || !department || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      setError('Email already exists');
      return;
    }

    const newUser: User = {
      fullName,
      email,
      phone,
      department,
      password,
      role,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Show success on login page
    localStorage.setItem('signup-success', 'true');
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#3089a1]">
          Create an Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-[#3089a1]"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-[#3089a1]"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-[#3089a1]"
            placeholder="+123456789"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-[#3089a1]"
            placeholder="HR, IT, Marketing..."
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-[#3089a1]"
            placeholder="Create a password"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded outline-[#3089a1]"
            placeholder="Confirm your password"
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
          onClick={handleSignup}
          className="w-full bg-[#3089a1] hover:bg-[#266e83] text-white font-semibold py-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
       