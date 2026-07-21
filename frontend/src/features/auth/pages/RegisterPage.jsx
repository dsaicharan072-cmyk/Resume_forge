import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/Card';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const success = await registerUser(data);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <Card className="w-full backdrop-blur-sm bg-white/80 dark:bg-zinc-950/80">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter your information to get started with ResumeForge
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name', { required: 'Name is required' })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="m@example.com"
            error={errors.email?.message}
            {...register('email', { 
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
            })}
          />
          <Input
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create account
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterPage;
