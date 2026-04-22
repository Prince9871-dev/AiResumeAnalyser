import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import { motion } from "framer-motion";
import { ExternalLink, Building2, Briefcase } from "lucide-react";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath, fs]);

    return (
        <Link to={`/resume/${id}`} className="block group">
            <motion.div 
                whileHover={{ y: -5 }}
                className="resume-card relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="resume-card-header relative z-10">
                    <div className="flex flex-col gap-3">
                        {companyName && (
                            <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-indigo-400" />
                                <h2 className="text-xl font-bold text-white break-words tracking-tight">{companyName}</h2>
                            </div>
                        )}
                        {jobTitle && (
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-purple-400" />
                                <h3 className="text-sm font-medium text-gray-400 break-words">{jobTitle}</h3>
                            </div>
                        )}
                        {!companyName && !jobTitle && (
                            <h2 className="text-xl font-bold text-white tracking-tight">Resume Review</h2>
                        )}
                    </div>
                    <div className="flex-shrink-0 relative">
                        <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <ScoreCircle score={feedback.overallScore} />
                    </div>
                </div>
                
                {resumeUrl && (
                    <div className="mt-4 relative group/image overflow-hidden rounded-xl border border-white/5 z-10">
                        <div className="absolute inset-0 bg-[#0a0a0a]/50 opacity-0 group-hover/image:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-sm">
                            <span className="flex items-center gap-2 text-white font-medium bg-white/10 px-4 py-2 rounded-full border border-white/20">
                                <ExternalLink className="w-4 h-4" /> View Details
                            </span>
                        </div>
                        <div className="w-full h-full bg-[#0a0a0a]">
                            <img
                                src={resumeUrl}
                                alt="resume preview"
                                className="w-full h-[280px] object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                    </div>
                )}
            </motion.div>
        </Link>
    )
}
export default ResumeCard
