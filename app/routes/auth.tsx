import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";
import { Fingerprint, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "~/components/AnimatedBackground";
import Logo from "~/components/Logo";

export const meta = () => ([
    { title: 'CareerLens | Authentication' },
    { name: 'description', content: 'Securely log into your CareerLens account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next || '/');
    }, [auth.isAuthenticated, next, navigate])

    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
            <AnimatedBackground />

            <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md px-6"
            >
                <div className="glass-panel p-10 rounded-3xl relative overflow-hidden border border-white/10 group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <section className="flex flex-col gap-10 relative z-10">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <Logo className="w-16 h-16 mb-2" />
                            <h1 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h1>
                            <h2 className="text-gray-400 text-sm">Securely log in to continue your career journey with CareerLens.</h2>
                        </div>
                        <div className="w-full">
                            {isLoading ? (
                                <button className="auth-button animate-pulse" disabled>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                                    <span>Signing you in...</span>
                                </button>
                            ) : (
                                <>
                                    {auth.isAuthenticated ? (
                                        <button className="auth-button" onClick={auth.signOut}>
                                            <LogOut className="w-5 h-5 mr-3 text-red-400" />
                                            <span>Log Out</span>
                                        </button>
                                    ) : (
                                        <button className="auth-button" onClick={auth.signIn}>
                                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <Fingerprint className="w-5 h-5 mr-3 text-indigo-400 group-hover:text-white transition-colors" />
                                            <span className="font-semibold text-white">Continue with Puter</span>
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </motion.div>
        </main>
    )
}

export default Auth
