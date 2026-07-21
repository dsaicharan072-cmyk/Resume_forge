import React from 'react';
import { useInterviews } from '../hooks/useCareer';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card';
import Skeleton from '../../../components/Skeleton';
import Badge from '../../../components/Badge';
import Button from '../../../components/Button';
import { Sparkles, MessageSquare, Video, ArrowRight } from 'lucide-react';

const InterviewPreparation = () => {
  const { data: questions, isLoading, isError } = useInterviews();

  if (isError) return <div className="p-4 text-destructive">Failed to load interview questions.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Interview Prep</h1>
          <p className="text-muted-foreground">Questions AI predicts you will be asked, based on your weak points.</p>
        </div>
        <Button className="shrink-0 gap-2">
          <Video size={16} />
          Start Mock Interview
        </Button>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))
        ) : (
          questions?.map((q) => (
            <Card key={q.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-lg leading-snug flex items-start gap-3">
                    <MessageSquare className="text-primary mt-1 shrink-0" size={20} />
                    {q.question}
                  </CardTitle>
                  <Badge variant="outline" className="shrink-0">{q.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-primary" />
                    <span className="text-sm font-bold uppercase tracking-wider text-primary">Why prepare for this?</span>
                  </div>
                  <p className="text-sm text-foreground">{q.rationale}</p>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                    View Answer Framework <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default InterviewPreparation;
