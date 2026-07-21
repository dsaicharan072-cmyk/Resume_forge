import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../../components/Card';
import Button from '../../../components/Button';
import Badge from '../../../components/Badge';
import { CheckCircle2, Zap, CreditCard } from 'lucide-react';

export const BillingSettings = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Manage your subscription and billing details.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-muted/30 m-6 rounded-xl border border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-bold">Free Tier</h3>
              <Badge variant="secondary">Current</Badge>
            </div>
            <p className="text-sm text-muted-foreground">You are currently on the free hobby plan.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-right mr-4 hidden md:block">
              <p className="font-medium">1 / 3</p>
              <p className="text-muted-foreground">Resumes analyzed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-primary/50 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
            Recommended
          </div>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Zap size={20} />
            </div>
            <CardTitle>ResumeForge Pro</CardTitle>
            <CardDescription>Unlock the full power of AI for your career.</CardDescription>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold">$12</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {[
              'Unlimited Resume Analyses',
              'Advanced AI Rewrites & Impact Scoring',
              'Interactive AI Recruiter Chat',
              'Priority Job Board Matching',
              'Export to PDF without watermark'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} className="text-primary shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter className="pt-4 border-t border-border mt-4">
            <Button className="w-full">Upgrade to Pro</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground mb-2">
              <CreditCard size={20} />
            </div>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Securely manage your saved payment methods.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-32 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground text-sm p-4 text-center">
              No payment methods saved.<br/>Upgrade to Pro to add one.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
