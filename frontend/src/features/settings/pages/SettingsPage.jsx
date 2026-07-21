import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/Tabs';
import { ProfileSettings } from '../components/ProfileSettings';
import { PreferencesSettings } from '../components/PreferencesSettings';
import { BillingSettings } from '../components/BillingSettings';

const SettingsPage = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6 bg-transparent justify-start border-b border-border w-full rounded-none h-auto p-0 space-x-6">
          <TabsTrigger value="profile" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-2">
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-2">
            Preferences
          </TabsTrigger>
          <TabsTrigger value="billing" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-2">
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0">
          <ProfileSettings />
        </TabsContent>
        
        <TabsContent value="preferences" className="mt-0">
          <PreferencesSettings />
        </TabsContent>
        
        <TabsContent value="billing" className="mt-0">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
