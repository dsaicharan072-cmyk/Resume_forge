import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../../../components/Card';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useAuth } from '../../auth/hooks/useAuth';
import toast from 'react-hot-toast';

export const ProfileSettings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || 'Aryan Kadam',
    email: user?.email || 'test@example.com',
    role: 'Frontend Engineer',
    bio: 'Passionate UI/UX developer building scalable SaaS applications.'
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Profile updated successfully');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Public Profile</CardTitle>
          <CardDescription>This is how others will see you on the platform.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSave}>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                {formData.name.charAt(0)}
              </div>
              <Button type="button" variant="outline" size="sm">Change Avatar</Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Title</label>
                <Input value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <textarea 
                className="w-full flex min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={formData.bio}
                onChange={e => setFormData({...formData, bio: e.target.value})}
              />
            </div>
          </CardContent>
          <CardFooter className="border-t border-border pt-4 justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
