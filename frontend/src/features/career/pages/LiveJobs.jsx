import React from 'react';
import { useLiveJobs } from '../hooks/useCareer';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/Card';
import Skeleton from '../../../components/Skeleton';
import Badge from '../../../components/Badge';
import Button from '../../../components/Button';
import { Sparkles, MapPin, DollarSign, Clock, Briefcase, ExternalLink } from 'lucide-react';

const LiveJobs = () => {
  const { data: jobs, isLoading, isError } = useLiveJobs();

  if (isError) return <div className="p-4 text-destructive">Failed to load jobs.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Live Hiring Feed</h1>
        <p className="text-muted-foreground">Real-time job postings tailored to your skill set.</p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))
        ) : (
          jobs?.map((job) => (
            <Card key={job.id} className="transition-all hover:border-primary/50 group">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 justify-between">
                  <div className="flex-1 space-y-4">
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{job.role}</h3>
                        <p className="text-muted-foreground font-medium flex items-center gap-2 mt-1">
                          <Briefcase size={16} /> {job.company}
                        </p>
                      </div>
                      <Badge variant={job.match >= 90 ? 'success' : 'default'} className="md:hidden">
                        {job.match}% Match
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MapPin size={16} /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><DollarSign size={16} /> {job.salary}</span>
                      <span className="flex items-center gap-1.5"><Clock size={16} /> {job.posted}</span>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 inline-flex items-start gap-2">
                      <Sparkles size={16} className="text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground">{job.rationale}</p>
                    </div>

                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                    <div className="hidden md:flex flex-col items-center">
                      <span className={`text-3xl font-bold ${job.match >= 90 ? 'text-green-500' : 'text-amber-500'}`}>
                        {job.match}%
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Match Score</span>
                    </div>
                    <Button className="w-full md:w-auto shrink-0">
                      Apply Now <ExternalLink size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveJobs;
