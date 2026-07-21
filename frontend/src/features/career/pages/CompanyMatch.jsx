import React from 'react';
import { useCompanyMatches } from '../hooks/useCareer';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../../components/Card';
import Badge from '../../../components/Badge';
import Skeleton from '../../../components/Skeleton';
import Button from '../../../components/Button';
import { Sparkles, Building2, ArrowRight } from 'lucide-react';

const CompanyMatch = () => {
  const { data: companies, isLoading, isError } = useCompanyMatches();

  if (isError) return <div className="p-4 text-destructive">Failed to load company matches.</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Company Match</h1>
        <p className="text-muted-foreground">Discover companies where your resume is highly likely to pass the ATS.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))
        ) : (
          companies?.map((company) => (
            <Card key={company.id} className="flex flex-col h-full hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-xl font-bold">
                    {company.logo}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{company.name}</CardTitle>
                    <CardDescription>{company.industry}</CardDescription>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-2xl font-bold ${company.match >= 90 ? 'text-green-500' : company.match >= 80 ? 'text-amber-500' : 'text-destructive'}`}>
                    {company.match}%
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Match</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 mt-4">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={14} className="text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">AI Rationale</span>
                  </div>
                  <p className="text-sm text-foreground font-medium">{company.rationale}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  View Open Roles <ArrowRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CompanyMatch;
