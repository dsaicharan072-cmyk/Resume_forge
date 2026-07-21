import React from 'react';
import { useProjects } from '../hooks/useCareer';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../../components/Card';
import Skeleton from '../../../components/Skeleton';
import Badge from '../../../components/Badge';
import Button from '../../../components/Button';
import { Sparkles, Code2, ArrowUpRight } from 'lucide-react';

const RecommendedProjects = () => {
  const { data: projects, isLoading, isError } = useProjects();

  if (isError) return <div className="p-4 text-destructive">Failed to load projects.</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Project Recommendations</h1>
        <p className="text-muted-foreground">Build these to prove your skills and fill gaps in your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))
        ) : (
          projects?.map((project) => (
            <Card key={project.id} className="flex flex-col h-full hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <Code2 size={24} />
                  </div>
                  <Badge variant={project.difficulty === 'Advanced' ? 'destructive' : 'warning'}>
                    {project.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl leading-tight">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <Badge key={i} variant="secondary">{t}</Badge>
                  ))}
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
                  <Sparkles size={18} className="text-primary shrink-0" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">Why build this?</span>
                    <p className="text-sm text-foreground">{project.rationale}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Start Project <ArrowUpRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RecommendedProjects;
