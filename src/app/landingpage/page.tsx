'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    try {
      const user = JSON.parse(userData || '{}');
      if (user && user.email) {
        router.push('/dashboard');
      }
    } catch {
      localStorage.removeItem('user');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#3089a1] flex items-center justify-center p-6">
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 max-w-3xl w-full text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/ist_internationl.jpg" // Use the correct path to your image in public/
            alt="IST Logo"
            width={140}
            height={140}
            className="rounded"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#3089a1] mb-4">
          Welcome to the Leave Management System
        </h1>
        <p className="text-black text-lg mb-8">
          Manage leaves, track balances, and keep your team connected—IST style.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/login')}
            className="bg-[#3089a1] hover:bg-[#256b7c] transition text-white font-semibold px-8 py-3 rounded-full shadow-lg"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/signup')}
            className="bg-white hover:bg-gray-100 transition text-[#3089a1] border border-[#3089a1] font-semibold px-8 py-3 rounded-full shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
