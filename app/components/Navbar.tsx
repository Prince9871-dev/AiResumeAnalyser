import {Link} from "react-router";
import Logo from "./Logo";

const Navbar = () => {
    return (
        <nav className="navbar border-b border-white/5 shadow-2xl shadow-indigo-500/5 backdrop-blur-2xl bg-[#0a0a0a]/70">
            <Link to="/" className="flex items-center gap-3 group">
                <Logo className="w-10 h-10 transition-transform duration-500 group-hover:scale-105" />
                <p className="text-2xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                    CareerLens
                </p>
            </Link>
            <Link to="/upload" className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-transform active:scale-95 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#818cf8_0%,#3b82f6_50%,#818cf8_100%)] opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#050505] px-6 py-2.5 text-sm font-semibold tracking-wide text-white backdrop-blur-3xl transition-colors group-hover:bg-[#0a0a0a]">
                    Upload Resume
                </span>
            </Link>
        </nav>
    )
}
export default Navbar
