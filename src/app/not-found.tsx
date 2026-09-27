"tsx"
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#121214] min-h-screen text-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-black text-[#ccff00] mb-2">404</h1>
      <h2 className="text-2xl font-bold uppercase mb-2">Page Not Found</h2>
      <p className="text-gray-400 text-xs mb-6">The page you are looking for does not exist or has been moved.</p>
      <Link
        href="/"
        className="bg-[#ccff00] text-black font-bold px-6 py-3 rounded-lg text-xs hover:bg-[#b3e600] transition"
      >
        Back to Home
      </Link>
    </div>
  );
}