import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Mail, ArrowLeft, Send } from 'lucide-react';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate password reset request
        setSent(true);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl opacity-50" />
                <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl opacity-50" />
            </div>

            <Card className="w-full max-w-sm glass-card relative z-10 animate-fade-in">
                <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold">Forgot Password?</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Enter your email address and we'll send you a link to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!sent ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-secondary/50"
                                />
                            </div>
                            <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold">
                                <Send className="w-4 h-4 mr-2" />
                                Send Reset Link
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Send className="w-8 h-8 text-success" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Check your email</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                We sent a password reset link to <br />
                                <span className="font-medium text-foreground">{email}</span>
                            </p>
                            <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
                                Try another email
                            </Button>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="justify-center border-t border-border pt-4 mt-2">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ForgotPassword;
