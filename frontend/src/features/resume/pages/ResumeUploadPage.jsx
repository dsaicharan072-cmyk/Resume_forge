import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUploadResume } from '../hooks/useResume';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../../components/Card';
import FileUpload from '../../../components/FileUpload';
import Button from '../../../components/Button';
import { FileText, Sparkles, Loader2 } from 'lucide-react';

const ResumeUploadPage = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { mutate: uploadResume, isPending } = useUploadResume();

  const handleAnalyze = () => {
    if (!file) return;
    
    uploadResume(file, {
      onSuccess: (data) => {
        navigate(`/resume/analyze?id=${data._id || data.id}`);
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pt-8">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
          <Sparkles size={32} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">AI Resume Analysis</h1>
        <p className="text-muted-foreground max-w-lg">
          Upload your resume and our AI will instantly score it against industry-standard ATS systems, providing actionable feedback to land more interviews.
        </p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
          <CardDescription>We accept PDF or Word documents up to 5MB.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FileUpload onUpload={setFile} />
          
          <div className="flex justify-end">
            <Button 
              size="lg" 
              disabled={!file || isPending} 
              onClick={handleAnalyze}
              className="w-full sm:w-auto text-black"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  AI is analyzing...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-5 w-5" />
                  Analyze Resume
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Informational Cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-12">
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-1">ATS Optimization</h3>
          <p className="text-sm text-muted-foreground">Ensure your resume passes automated filters and reaches human recruiters.</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-1">Impact Rewrite</h3>
          <p className="text-sm text-muted-foreground">Get AI suggestions to make your bullet points more quantifiable and impactful.</p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-1">Keyword Matching</h3>
          <p className="text-sm text-muted-foreground">Discover which crucial skills you're missing for your target roles.</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadPage;
