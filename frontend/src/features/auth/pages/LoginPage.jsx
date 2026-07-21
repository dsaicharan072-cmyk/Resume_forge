import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold">Sign in to your account</h3>
      </div>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted mb-1">Email</label>
          <input 
            type="email" 
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted mb-1">Password</label>
          <input 
            type="password" 
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="••••••••"
          />
        </div>
        
        <button type="button" className="btn btn-primary w-full py-2">
          Sign In
        </button>
      </form>
      
      <div className="text-center text-sm text-muted">
        Don't have an account? <Link to="/register" className="text-primary hover:underline">Register here</Link>
      </div>
    </div>
  );
}
