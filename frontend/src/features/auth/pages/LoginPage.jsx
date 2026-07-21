import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/Card';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const success = await login(data);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <Card className="w-full backdrop-blur-sm bg-white/80 dark:bg-zinc-950/80">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Enter your email to sign in to your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
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
            {...register('password', { required: 'Password is required' })}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign in
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginPage;
