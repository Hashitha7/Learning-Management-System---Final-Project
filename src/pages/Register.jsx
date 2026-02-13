import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Shield, Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student'
    });

    const handleRegister = (e) => {
        e.preventDefault();
        // Simulate registration
        console.log('Registering:', formData);
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
            </div>

            <Card className="w-full max-w-md glass-card relative z-10 animate-fade-in">
                <CardHeader className="text-center pb-2">
                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Join EduFlow</CardTitle>
                    <CardDescription>Create your account to start learning</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="John Doe"
                                    className="pl-9 bg-secondary/50"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="you@school.edu"
                                    className="pl-9 bg-secondary/50"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a password"
                                    className="pl-9 bg-secondary/50 pr-10"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="pl-9 bg-secondary/50"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <label className="text-sm font-medium text-foreground mb-2 block">I am a:</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['student', 'teacher'].map(role => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role })}
                                        className={`p-2 rounded-md border text-center text-sm capitalize transition-all ${formData.role === role
                                            ? 'border-primary bg-primary/10 text-primary font-medium'
                                            : 'border-border bg-transparent text-muted-foreground hover:bg-secondary/50'}`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold mt-2">
                            Create Account
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center pt-0">
                    <p className="text-sm text-muted-foreground">
                        Already have an account? <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate('/login')}>Sign In</span>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;
