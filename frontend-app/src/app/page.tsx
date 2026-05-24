import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center px-6 py-10">

      {/* Animated Background */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-purple-400 opacity-20 blur-3xl rounded-full animate-pulse"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-blue-400 opacity-20 blur-3xl rounded-full animate-pulse"></div>

      <div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] bg-pink-300 opacity-10 blur-3xl rounded-full"></div>

      {/* Glassmorphism Card */}
      <div className="relative w-full max-w-lg">

        <div className="bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 text-center transition-all duration-500 hover:scale-[1.01]">

          {/* Logo */}
          <div className="mb-8">

            <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-r from-black via-gray-800 to-black flex items-center justify-center text-white text-5xl font-black shadow-2xl border-4 border-white">
              ✓
            </div>

            <h1 className="mt-6 text-6xl font-black tracking-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
              TaskFlow
            </h1>

            <p className="mt-5 text-gray-600 text-lg leading-relaxed px-4">
              Manage your tasks beautifully,
              stay productive, and organize
              your workflow smarter than ever.
            </p>

          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">

            <div className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium shadow-md">
              Fast
            </div>

            <div className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium shadow-md">
              Secure
            </div>

            <div className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium shadow-md">
              Modern UI
            </div>

          </div>

          {/* Buttons */}
          <div className="space-y-5">

            <Link href="/login">
              <button className="w-full bg-black hover:bg-gray-900 text-white p-4 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-95">
                Login
              </button>
            </Link>

            <Link href="/signup">
              <button className="w-full border-2 border-black text-black hover:bg-black hover:text-white p-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-95">
                Create Account
              </button>
            </Link>

          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-500">

            <p>
              Built with Next.js • NestJS • TypeScript
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Smart productivity dashboard
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}