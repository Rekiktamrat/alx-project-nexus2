import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from 'sonner';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface ProfileFormData {
  username: string;
  email: string;
}

const Settings = () => {
  const { user } = useAuth(); // Ideally we update context user after save
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm<ProfileFormData>();

  useEffect(() => {
    if (user) {
      setValue('username', user.username);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // Assuming we have a PATCH /auth/me/ endpoint or similar.
      // Since standard MeView is GET only, we might need to add PUT/PATCH support.
      // If not, we can use /users/{id}/ if we are admin.
      // Let's assume we can update via /users/{id}/ since we are admin.
      
      if (user?.id) {
          await api.patch(`/auth/users/${user.id}/`, data);
          toast.success("Profile updated successfully");
      } else {
          toast.error("User ID missing");
      }
    } catch (error: any) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" {...register('username')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
