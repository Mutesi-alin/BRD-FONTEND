


// import Image from "next/image";
// import Link from "next/link";

// export default function Landingpage() {
//   return (
//     <main className="min-h-screen">

//       {/* NAVBAR */}
//       <nav className="flex items-center justify-between px-12 py-6 bg-white shadow-sm">
//         <div className="text-2xl font-bold text-green-800">BRD</div>

//         <div className="flex items-center gap-8 text-sm">
//           <Link href="#" className="text-gray-600 hover:text-green-700 transition">Home</Link>
//           <Link href="#features" className="text-gray-600 hover:text-green-700 transition">About</Link>
//           <Link href="#cta" className="text-gray-600 hover:text-green-700 transition">Contact</Link>

//           <Link
//             href="/login"
//             className="px-5 py-2 rounded-md bg-green-700 text-white hover:bg-green-600 transition"
//           >
//             Login
//           </Link>

//           <Link
//             href="/register"
//             className="px-5 py-2 rounded-md border border-green-700 text-green-700 hover:bg-green-50 transition"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </nav>

//       {/* HERO SECTION */}
//       <section className="relative bg-gradient-to-r from-green-50 to-white px-12 py-20 rounded-b-3xl">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

//           {/* LEFT */}
//           <div>
//             <h1 className="text-4xl font-bold text-green-900 leading-tight mb-6">
//               Welcome to the <br />
//               Development Finance <br />
//               Management System
//             </h1>

//             <p className="text-gray-600 mb-8 max-w-lg">
//               Securely Manage Rwanda&apos;s Development Financing
//             </p>

//             <div className="flex items-center gap-4">
//               <Link
//                 href="/login"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-md hover:bg-green-600 transition"
//               >
//                 Get Started →
//               </Link>
//               <Link
//                 href="/register"
//                 className="inline-flex items-center gap-2 px-6 py-3 border border-green-700 text-green-700 rounded-md hover:bg-green-50 transition"
//               >
//                 Create Account
//               </Link>
//             </div>
//           </div>

//           <div className="relative">
//             <Image
//               src="/images/BRD.jpg"
//               alt="Finance illustration"
//               width={500}
//               height={500}
//               priority
//             />
//           </div>
//         </div>
//       </section>

     


     

//     </main>
//   );
// }

// function FeatureCard({
//   title,
//   description,
//   icon,
// }: {
//   title: string;
//   description: string;
//   icon: string;
// }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
//       <div className="text-3xl mb-4">{icon}</div>
//       <h3 className="font-semibold text-lg mb-2">{title}</h3>
//       <p className="text-gray-600 text-sm">{description}</p>
//       <Link href="/register" className="mt-3 text-green-700 text-sm inline-block hover:underline">
//         Learn More →
//       </Link>
//     </div>
//   );
// }

import Image from "next/image";
import Link from "next/link";

export default function Landingpage() {
  return (
    <main className="min-h-screen">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-12 py-6 bg-white shadow-sm">
        <div className="text-2xl font-bold text-green-800">BRD</div>

        <div className="flex items-center gap-8 text-sm">
          <Link href="#" className="text-gray-600 hover:text-green-700 transition">Home</Link>
          <Link href="#features" className="text-gray-600 hover:text-green-700 transition">About</Link>
          <Link href="#cta" className="text-gray-600 hover:text-green-700 transition">Contact</Link>

          <Link
            href="/login"
            className="px-5 py-2 rounded-md bg-green-700 text-white hover:bg-green-600 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-md border border-green-700 text-green-700 hover:bg-green-50 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-green-50 to-white px-12 py-20 rounded-b-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-4xl font-bold text-green-900 leading-tight mb-6">
              Welcome to the <br />
              Development Finance <br />
              Management System
            </h1>

            <p className="text-gray-600 mb-8 max-w-lg">
              Securely Manage Rwanda&apos;s Development Financing
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-md hover:bg-green-600 transition"
              >
                Get Started →
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 border border-green-700 text-green-700 rounded-md hover:bg-green-50 transition"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/BRD.jpg"
              alt="Finance illustration"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </section>

    </main>
  );
}