import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useAuth';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate: registerUser, isPending } = useRegister();

  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Create an account</h3>
        <p className="text-muted text-sm mt-1">Start your career journey with ResumeForge</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input 
          label="Full Name"
          type="text"
          placeholder="John Doe"
          {...register("name", { required: "Name is required" })}
          error={errors.name?.message}
        />
        
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
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters required" }
          })}
          error={errors.password?.message}
        />
        
        <Button 
          type="submit" 
          className="w-full"
          isLoading={isPending}
        >
          Create Account
        </Button>
      </form>
      
      <div className="text-center text-sm text-muted">
        Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
      </div>
    </div>
  );
}
