// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LandingPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     try {
//       const user = JSON.parse(userData || '{}');
//       if (user && user.email) {
//         router.push('/dashboard'); // Redirect if logged in
//       }
//     } catch (err) {
//       // Malformed data fallback
//       localStorage.removeItem('user');
//     }
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
//       <div className="text-center max-w-2xl">
//         <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
//           Welcome to the Leave Management System
//         </h1>
//         <p className="text-gray-700 text-lg mb-6">
//           Manage your leaves, track your balance, and stay updated with ease.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button
//             onClick={() => {
//               console.log("Navigating to login");
//               router.push('/login');
//             }}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => {
//               console.log("Navigating to signup");
//               router.push('/signup');
//             }}
//             className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold px-6 py-3 rounded shadow"
//           >
//             Sign Up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    try {
      const user = JSON.parse(userData || '{}');
      if (user && user.email) {
        router.push('/dashboard'); // Redirect if logged in
      }
    } catch {
      // Malformed data fallback
      localStorage.removeItem('user');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Welcome to the Leave Management System
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Manage your leaves, track your balance, and stay updated with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              console.log("Navigating to login");
              router.push('/login');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow"
          >
            Login
          </button>
          <button
            onClick={() => {
              console.log("Navigating to signup");
              router.push('/signup');
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold px-6 py-3 rounded shadow"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
