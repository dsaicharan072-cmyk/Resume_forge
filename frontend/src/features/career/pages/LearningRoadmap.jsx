import React from 'react';
import { useLearningRoadmap } from '../hooks/useCareer';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card';
import Skeleton from '../../../components/Skeleton';
import Badge from '../../../components/Badge';
import { BookOpen, CheckCircle2, Circle, Sparkles, Clock } from 'lucide-react';

const LearningRoadmap = () => {
  const { data: roadmap, isLoading, isError } = useLearningRoadmap();

  if (isError) return <div className="p-4 text-destructive">Failed to load roadmap.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Learning Roadmap</h1>
        <p className="text-muted-foreground">Your personalized curriculum to bridge identified skill gaps.</p>
      </div>

      <div className="relative border-l border-border ml-4 md:ml-6 space-y-8 pb-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="pl-8 relative">
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          ))
        ) : (
          roadmap?.map((item) => (
            <div key={item.id} className="pl-8 relative group">
              {/* Timeline dot */}
              <div className={`absolute -left-[17px] top-1 h-8 w-8 rounded-full border-4 border-background flex items-center justify-center ${item.completed ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors'}`}>
                {item.completed ? <CheckCircle2 size={16} /> : <Circle size={10} className="fill-current" />}
              </div>

              <Card className={`transition-all ${item.completed ? 'opacity-70' : 'hover:shadow-md border-primary/20'}`}>
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <BookOpen className="text-primary" size={20} />
                      {item.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="flex items-center gap-1"><Clock size={12}/> {item.duration}</Badge>
                      <Badge variant="secondary">{item.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mt-2 flex gap-3">
                    <Sparkles size={16} className="text-primary shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{item.rationale}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LearningRoadmap;
