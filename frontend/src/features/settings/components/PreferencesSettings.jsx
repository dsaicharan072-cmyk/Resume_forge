import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../../components/Card';
import Switch from '../../../components/Switch';
import { Moon, Sun, Laptop, Bell, Mail } from 'lucide-react';

export const PreferencesSettings = () => {
  const [theme, setTheme] = useState('system');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [marketing, setMarketing] = useState(false);

  // Read theme from html class on load
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else if (newTheme === 'light') {
      root.classList.remove('dark');
    } else {
      // System logic would go here, falling back to light for demo
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how ResumeForge looks on your device.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <button 
              onClick={() => handleThemeChange('light')}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}
            >
              <Sun size={24} className={theme === 'light' ? 'text-primary' : 'text-muted-foreground'} />
              <span className="font-medium text-sm">Light</span>
            </button>
            <button 
              onClick={() => handleThemeChange('dark')}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}
            >
              <Moon size={24} className={theme === 'dark' ? 'text-primary' : 'text-muted-foreground'} />
              <span className="font-medium text-sm">Dark</span>
            </button>
            <button 
              onClick={() => handleThemeChange('system')}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-card'}`}
            >
              <Laptop size={24} className={theme === 'system' ? 'text-primary' : 'text-muted-foreground'} />
              <span className="font-medium text-sm">System</span>
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your communication preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Bell className="text-muted-foreground mt-0.5" size={20} />
              <div>
                <p className="font-medium text-sm">Application Alerts</p>
                <p className="text-xs text-muted-foreground">Receive alerts when interview statuses change.</p>
              </div>
            </div>
            <Switch checked={emailAlerts} onChange={setEmailAlerts} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Mail className="text-muted-foreground mt-0.5" size={20} />
              <div>
                <p className="font-medium text-sm">Marketing Emails</p>
                <p className="text-xs text-muted-foreground">Receive weekly career tips and product updates.</p>
              </div>
            </div>
            <Switch checked={marketing} onChange={setMarketing} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
