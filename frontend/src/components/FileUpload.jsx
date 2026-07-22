import React, { useCallback, useState } from 'react';
import { UploadCloud, File, X, CheckCircle } from 'lucide-react';
import { cn } from '../utils/cn';

export const FileUpload = ({ onUpload, accept = ".pdf,.doc,.docx", maxSize = 5 * 1024 * 1024 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  }, []);

  const validateAndSetFile = useCallback((selectedFile) => {
    setError('');

    if (selectedFile.size > maxSize) {
      setError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
      return;
    }

    setFile(selectedFile);
    onUpload?.(selectedFile);
  }, [maxSize, onUpload]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, [validateAndSetFile]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError('');
    onUpload?.(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          className={cn(
            "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-colors bg-muted/20",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:bg-muted/50 hover:border-primary/50",
            error && "border-destructive/50 bg-destructive/5"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <UploadCloud size={24} />
            </div>
            <p className="mb-2 text-sm text-foreground font-medium">
              <span className="font-semibold text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (MAX. {maxSize / (1024 * 1024)}MB)</p>
          </div>
          <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            accept={accept}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="flex items-center p-4 border border-border rounded-xl bg-card">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4 shrink-0">
            <File size={20} />
          </div>
          <div className="flex-1 min-w-0 mr-4">
            <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="text-green-500" />
            <button 
              onClick={removeFile}
              className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
      
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default FileUpload;
