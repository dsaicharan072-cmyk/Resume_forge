import React from 'react';
import { useSkillGaps } from '../hooks/useCareer';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card';
import Progress from '../../../components/Progress';
import Skeleton from '../../../components/Skeleton';
import Badge from '../../../components/Badge';
import { Sparkles, Target } from 'lucide-react';

const SkillGap = () => {
  const { data: skills, isLoading, isError } = useSkillGaps();

  if (isError) return <div className="p-4 text-destructive">Failed to load skill gaps.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Skill Gap Analysis</h1>
        <p className="text-muted-foreground">Identify and bridge the technical gaps between your current profile and target roles.</p>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))
        ) : (
          skills?.map((skill) => (
            <Card key={skill.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Target className="text-primary" size={20} />
                    {skill.name}
                  </CardTitle>
                  <Badge variant={skill.current >= skill.required ? 'success' : 'warning'}>
                    {skill.current >= skill.required ? 'Mastered' : 'Needs Improvement'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Current Proficiency ({skill.current}%)</span>
                    <span>Target ({skill.required}%)</span>
                  </div>
                  <div className="relative h-3 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-foreground z-10"
                      style={{ left: `${skill.required}%` }}
                    />
                    <Progress value={skill.current} className="h-full rounded-none" />
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-primary" />
                    <span className="text-sm font-bold uppercase tracking-wider text-primary">Why focus on this?</span>
                  </div>
                  <p className="text-sm text-foreground">{skill.rationale}</p>
                </div>

              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillGap;
