import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate: loginUser, isPending } = useLogin();

  const onSubmit = (data) => {
    loginUser(data);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Welcome back</h3>
        <p className="text-muted text-sm mt-1">Sign in to your ResumeForge account</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input 
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          error={errors.email?.message}
        />
        
        <Input 
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register("password", { 
            required: "Password is required"
          })}
          error={errors.password?.message}
        />
        
        <Button 
          type="submit" 
          className="w-full"
          isLoading={isPending}
        >
          Sign In
        </Button>
      </form>
      
      <div className="text-center text-sm text-muted">
        Don't have an account? <Link to="/register" className="text-primary hover:underline">Register here</Link>
      </div>
    </div>
  );
}
