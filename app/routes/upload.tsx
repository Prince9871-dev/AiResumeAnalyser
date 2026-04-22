import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";
import { motion } from "framer-motion";
import { Loader2, Briefcase, Building2, AlignLeft, Sparkles } from "lucide-react";

export const meta = () => ([
    { title: 'CareerLens | Analyze Resume' },
    { name: 'description', content: 'Upload your resume for AI-powered feedback' },
])

import AnimatedBackground from "~/components/AnimatedBackground";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing with AI...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="relative min-h-screen">
            <AnimatedBackground />
            <Navbar />

            <section className="main-section pt-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-2xl mx-auto"
                >
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                            Configure Analysis
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Provide the target job details to contextualize the AI feedback.
                        </p>
                    </div>

                    <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
                        {isProcessing && (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-md z-50 flex flex-col items-center justify-center rounded-3xl"
                            >
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-indigo-400 animate-pulse" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white mb-2">Analyzing Resume</h2>
                                <p className="text-indigo-300 font-medium">{statusText}</p>
                            </motion.div>
                        )}

                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-div">
                                    <label htmlFor="company-name" className="flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-indigo-400" />
                                        Company Name
                                    </label>
                                    <input type="text" name="company-name" placeholder="e.g. Acme Corp" id="company-name" required />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job-title" className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-purple-400" />
                                        Target Job Title
                                    </label>
                                    <input type="text" name="job-title" placeholder="e.g. Senior Frontend Engineer" id="job-title" required />
                                </div>
                            </div>
                            
                            <div className="form-div">
                                <label htmlFor="job-description" className="flex items-center gap-2">
                                    <AlignLeft className="w-4 h-4 text-pink-400" />
                                    Job Description
                                </label>
                                <textarea rows={5} name="job-description" placeholder="Paste the full job description here..." id="job-description" required />
                            </div>

                            <div className="form-div mt-2">
                                <label htmlFor="uploader" className="mb-2">Resume Upload (PDF)</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button 
                                className={`primary-button mt-6 ${!file ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                type="submit" 
                                disabled={!file || isProcessing}
                            >
                                <span className="primary-button-bg"></span>
                                <span className="primary-button-inner gap-2 text-base h-12">
                                    {isProcessing ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                                    ) : (
                                        <><Sparkles className="w-5 h-5" /> Generate Insights</>
                                    )}
                                </span>
                            </button>
                        </form>
                    </div>
                </motion.div>
            </section>
        </main>
    )
}
export default Upload
