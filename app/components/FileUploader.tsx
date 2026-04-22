import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'
import { UploadCloud, FileText, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full">
            <div {...getRootProps()} className={`uplader-drag-area ${isDragActive ? 'border-indigo-500 bg-indigo-500/10' : ''}`}>
                <input {...getInputProps()} />

                <div className="space-y-4 cursor-pointer w-full z-10">
                    <AnimatePresence mode="wait">
                        {file ? (
                            <motion.div 
                                key="file-selected"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="uploader-selected-file" 
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-gray-200 truncate max-w-[200px] md:max-w-xs">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {formatSize(file.size)}
                                        </p>
                                    </div>
                                </div>
                                <button className="p-2 cursor-pointer hover:bg-white/10 rounded-lg transition-colors" onClick={(e) => {
                                    e.stopPropagation();
                                    onFileSelect?.(null)
                                }}>
                                    <X className="w-5 h-5 text-gray-400 hover:text-white" />
                                </button>
                            </motion.div>
                        ): (
                            <motion.div 
                                key="upload-prompt"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
                                    <UploadCloud className={`w-8 h-8 ${isDragActive ? 'text-indigo-400' : 'text-gray-400 group-hover:text-indigo-400'} transition-colors`} />
                                </div>
                                <p className="text-base text-gray-300 mb-1">
                                    <span className="font-semibold text-indigo-400">
                                        Click to upload
                                    </span> or drag and drop
                                </p>
                                <p className="text-sm text-gray-500">PDF (max {formatSize(maxFileSize)})</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
export default FileUploader
