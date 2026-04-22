import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import { ChevronLeft, Loader2, FileText } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "~/components/AnimatedBackground";

export const meta = () => ([
    { title: 'CareerLens | Review' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading, auth.isAuthenticated, navigate, id])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl, feedback: data.feedback });
        }

        loadResume();
    }, [id, kv, fs]);

    return (
        <main className="!pt-0 relative min-h-screen bg-[#050505]">
            <AnimatedBackground />

            <nav className="resume-nav flex items-center bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 sticky top-0 z-50">
                <Link to="/" className="back-button inline-flex items-center gap-2 group">
                    <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                    <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">Back to Dashboard</span>
                </Link>
            </nav>
            
            <div className="flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto min-h-[calc(100vh-65px)]">
                <section className="flex-1 lg:w-1/2 p-6 lg:p-10 flex flex-col items-center justify-start lg:sticky lg:top-[65px] lg:h-[calc(100vh-65px)] border-r border-white/5 bg-white/[0.01]">
                    {imageUrl && resumeUrl ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="gradient-border w-full max-w-2xl h-full max-h-[85vh] relative group"
                        >
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full bg-[#0a0a0a] rounded-2xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity z-10 flex items-end justify-center pb-6">
                                    <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium border border-white/20 flex items-center gap-2">
                                        <FileText className="w-4 h-4" /> View Full PDF
                                    </span>
                                </div>
                                <img
                                    src={imageUrl}
                                    className="w-full h-full object-contain p-2"
                                    title="resume"
                                />
                            </a>
                        </motion.div>
                    ) : (
                        <div className="w-full h-full min-h-[500px] flex items-center justify-center border border-white/5 rounded-3xl bg-[#0a0a0a]">
                            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                        </div>
                    )}
                </section>

                <section className="flex-1 lg:w-1/2 p-6 lg:p-12 overflow-y-auto pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-8">Intelligence Report</h2>
                        {feedback ? (
                            <div className="flex flex-col gap-10">
                                <Summary feedback={feedback} />
                                <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                <Details feedback={feedback} />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/10">
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                                    <FileText className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-400" />
                                </div>
                                <p className="text-gray-400 font-medium animate-pulse">Generating your comprehensive review...</p>
                            </div>
                        )}
                    </motion.div>
                </section>
            </div>
        </main>
    )
}
export default Resume
