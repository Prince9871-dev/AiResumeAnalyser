import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FileText, BarChart3, Zap, UploadCloud } from "lucide-react";
import AnimatedBackground from "~/components/AnimatedBackground";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CareerLens | Smart Resume Intelligence" },
    { name: "description", content: "Smart resume feedback for your dream career!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated, navigate])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, [kv]);

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />

      <section className="main-section pt-32 lg:pt-40">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="page-heading text-center max-w-5xl mx-auto flex flex-col items-center z-10"
        >


          {/* Huge Hero Typography */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-8 drop-shadow-2xl leading-[1.1]">
            Unlock your career <br className="hidden md:block"/>
            with <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-purple-400 to-pink-500 pb-2">AI Intelligence.</span>
          </h1>

          {/* Sophisticated Subheadline */}
          {!loadingResumes && resumes?.length === 0 ? (
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              Stop guessing what Applicant Tracking Systems want. Upload your resume and get <strong className="text-gray-200 font-medium">instant, deep algorithmic feedback</strong> designed to get you hired.
            </p>
          ): (
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
              Review your submissions and track your AI-powered feedback progress to optimize your career path.
            </p>
          )}

          {/* Premium Call to Action */}
          {!loadingResumes && resumes?.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-12 w-full justify-center max-w-md mx-auto"
            >
              <Link to="/upload" className="primary-button group w-full sm:w-auto">
                <span className="primary-button-bg"></span>
                <span className="primary-button-inner gap-2 px-8 py-4 text-base shadow-[0_0_40px_rgba(99,102,241,0.4)]">
                  Start Analyzing <UploadCloud className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Abstract Glowing "Scanner" UI to add depth beneath hero */}
        {!loadingResumes && resumes?.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto mt-24 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10"></div>
            <div className="w-full h-40 md:h-64 border-t border-indigo-500/30 rounded-t-full bg-gradient-to-b from-indigo-500/10 to-transparent flex items-start justify-center pt-8 overflow-hidden relative">
              {/* Scanner Line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-indigo-400 shadow-[0_0_20px_2px_rgba(99,102,241,0.8)] animate-[pulse-glow_3s_ease-in-out_infinite]"></div>
              
              {/* Fake Data Lines */}
              <div className="flex gap-4 opacity-30 mt-4">
                <div className="w-32 h-2 rounded-full bg-indigo-500/40"></div>
                <div className="w-48 h-2 rounded-full bg-purple-500/40"></div>
                <div className="w-24 h-2 rounded-full bg-pink-500/40"></div>
              </div>
            </div>
          </motion.div>
        )}

        {loadingResumes && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32"
          >
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-[spin_1.5s_linear_infinite]"></div>
              <FileText className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-indigo-400" />
            </div>
            <p className="mt-8 text-indigo-300 font-medium tracking-widest uppercase text-sm animate-pulse">Initializing Dashboard...</p>
          </motion.div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-7xl mx-auto mt-16 z-20 relative"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                  <BarChart3 className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">Intelligence Reports</h3>
              </div>
              <Link to="/upload" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 transition-all text-sm font-medium text-white shadow-lg">
                <UploadCloud className="w-4 h-4" /> New Analysis
              </Link>
            </div>
            <div className="resumes-section">
              {resumes.map((resume, idx) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <ResumeCard resume={resume} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </section>
    </main>
  );
}
