import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Shield, Eye, EyeOff } from 'lucide-react';
const roleOptions = [
  { role: 'super_admin', label: 'Super Admin', desc: 'Platform-wide management' },
  { role: 'admin', label: 'Admin', desc: 'School administration' },
  { role: 'teacher', label: 'Teacher', desc: 'Course & student management' },
  { role: 'student', label: 'Student', desc: 'Learning & coursework' },
];
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    login(selectedRole);
    navigate('/dashboard');
  };
  return (<div className="min-h-screen bg-background flex items-center justify-center p-4 dark">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
    </div>

    <Card className="w-full max-w-md glass-card relative z-10">
      <CardHeader className="text-center pb-2">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
          <Shield className="w-7 h-7 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">EduFlow LMS</CardTitle>
        <CardDescription>Sign in to your learning platform</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Select Role (Demo)</label>
            <div className="grid grid-cols-2 gap-2">
              {roleOptions.map(opt => (<button key={opt.role} type="button" onClick={() => setSelectedRole(opt.role)} className={`p-3 rounded-lg border text-left transition-all duration-200 ${selectedRole === opt.role
                ? 'border-primary bg-primary/10 text-foreground'
                : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/50'}`}>
                <p className="text-sm font-medium">{opt.label}</p>
                <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
              </button>))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input type="email" placeholder="you@school.edu" defaultValue="demo@lms.io" className="bg-secondary/50" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Password</label>
              <button type="button" onClick={() => navigate('/forgot-password')} className="text-xs text-primary hover:underline">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" defaultValue="password" className="bg-secondary/50 pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold">
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center pt-0">
        <p className="text-sm text-muted-foreground">
          Don't have an account? <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate('/register')}>Sign Up</span>
        </p>
      </CardFooter>
    </Card>
  </div>);
};
export default Login;
