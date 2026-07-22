import React from 'react';
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { useResumeAnalysis } from '../hooks/useResume';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../../components/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/Tabs';
import Badge from '../../../components/Badge';
import Progress from '../../../components/Progress';
import Skeleton from '../../../components/Skeleton';
import Button from '../../../components/Button';
import { ArrowLeft, Download, AlertTriangle, CheckCircle2, XCircle, Wand2, Copy, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const ScoreGauge = ({ score }) => {
  // Simple circular gauge representation using SVG
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  let color = "text-red-500";
  if (score >= 70) color = "text-amber-500";
  if (score >= 85) color = "text-green-500";

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" className="stroke-muted" strokeWidth="8" />
        <circle 
          cx="50" cy="50" r="45" fill="none" 
          className={`stroke-current ${color} transition-all duration-1000 ease-out`} 
          strokeWidth="8" 
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{score}</span>
        <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">/ 100</span>
      </div>
    </div>
  );
};

const ResumeAnalysisPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const { data, isLoading, isError } = useResumeAnalysis(id);

  if (!id) {
    return <Navigate to="/resume" replace />;
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 pt-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Skeleton className="col-span-1 h-[400px] rounded-xl" />
          <Skeleton className="col-span-2 h-[600px] rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="p-4 text-destructive">Failed to load analysis.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pt-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/resume')}
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Upload
        </button>
        <Button variant="outline" size="sm" onClick={() => toast.success('Export started!')}>
          <Download size={16} className="mr-2" />
          Export PDF
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Left Column: Overall Score & Metrics */}
        <div className="col-span-1 space-y-6">
          <Card className="overflow-hidden border-t-4 border-t-primary">
            <CardHeader className="text-center pb-2">
              <CardTitle>Overall ATS Score</CardTitle>
              <CardDescription>Based on 40+ industry data points</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4">
              <ScoreGauge score={data.overallScore} />
              
              <div className="w-full mt-8 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Impact & Metrics</span>
                    <span className="text-muted-foreground">{data.categories.impact}/100</span>
                  </div>
                  <Progress value={data.categories.impact} className="h-1.5 [&>div]:bg-amber-500" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Brevity & Formatting</span>
                    <span className="text-muted-foreground">{data.categories.brevity}/100</span>
                  </div>
                  <Progress value={data.categories.brevity} className="h-1.5 [&>div]:bg-green-500" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Keywords Match</span>
                    <span className="text-muted-foreground">{data.categories.keywords}/100</span>
                  </div>
                  <Progress value={data.categories.keywords} className="h-1.5 [&>div]:bg-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Detailed Analysis Tabs */}
        <div className="col-span-1 md:col-span-2">
          <Card className="h-full">
            <Tabs defaultValue="ats">
              <div className="px-6 pt-6 pb-2 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle>Detailed Feedback</CardTitle>
                <TabsList>
                  <TabsTrigger value="ats">ATS Findings</TabsTrigger>
                  <TabsTrigger value="rewrite">AI Rewrite</TabsTrigger>
                </TabsList>
              </div>
              
              <CardContent className="pt-6">
                
                <TabsContent value="ats" className="mt-0 space-y-4">
                  {data.atsFindings.map((finding, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-lg border border-border bg-card/50">
                      <div className="shrink-0 mt-0.5">
                        {finding.type === 'error' && <XCircle className="text-destructive" size={20} />}
                        {finding.type === 'warning' && <AlertTriangle className="text-amber-500" size={20} />}
                        {finding.type === 'success' && <CheckCircle2 className="text-green-500" size={20} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-[10px] h-5 py-0 px-1.5 bg-muted/50">
                            {finding.location}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-foreground">{finding.message}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="rewrite" className="mt-0 space-y-6">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 flex gap-3">
                    <Wand2 className="text-primary shrink-0" size={20} />
                    <p className="text-sm text-primary-foreground font-medium text-foreground">
                      Our AI found {data.rewriteSuggestions.length} bullet points that could be optimized for higher impact.
                    </p>
                  </div>

                  {data.rewriteSuggestions.map((suggestion, idx) => (
                    <div key={idx} className="border border-border rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-muted/30 p-4 border-b border-border">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Original</p>
                        <p className="text-sm line-through text-muted-foreground decoration-destructive/50">{suggestion.original}</p>
                      </div>
                      <div className="bg-card p-4 relative">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1">
                            <Sparkles size={12} /> AI Suggestion
                          </p>
                          <Badge variant="success">High Impact</Badge>
                        </div>
                        <p className="text-sm font-medium text-foreground pr-10">{suggestion.suggestion}</p>
                        <button 
                          onClick={() => handleCopy(suggestion.suggestion)}
                          className="absolute bottom-4 right-4 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title="Copy suggestion"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </TabsContent>

              </CardContent>
            </Tabs>
          </Card>
        </div>
        
      </div>
    </div>
  );
};

export default ResumeAnalysisPage;
