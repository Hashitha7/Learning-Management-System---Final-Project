import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, BookOpen, Trophy, Users, CheckCircle, ArrowRight } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Navbar */}
            <nav className="border-b border-border/40 backdrop-blur-md sticky top-0 z-50 bg-background/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">EduSpark Hub</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={() => navigate('/login')}>Log In</Button>
                        <Button className="gradient-primary text-primary-foreground" onClick={() => navigate('/register')}>Get Started</Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 sm:py-32">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-70" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] opacity-70" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary-foreground pb-2">
                        Unlock Your Limitless Potential
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10">
                        Experience a world-class learning platform designed for the modern era. Interactive courses, real-time analytics, and a vibrant community await.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="gradient-primary text-primary-foreground text-lg px-8 h-12" onClick={() => navigate('/register')}>
                            Start Learning Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 h-12" onClick={() => navigate('/courses')}>
                            Explore Courses
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-secondary/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Choose EduSpark?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">We provide the tools you need to succeed, whether you are a student, teacher, or administrator.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="glass-card hover:shadow-lg transition-all border-primary/20">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <BookOpen className="w-6 h-6 text-primary" />
                                </div>
                                <CardTitle>Interactive Learning</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Engage with dynamic video lessons, quizzes, and real-time feedback to master any subject effectively.</p>
                            </CardContent>
                        </Card>
                        <Card className="glass-card hover:shadow-lg transition-all border-accent/20">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                                    <Trophy className="w-6 h-6 text-accent" />
                                </div>
                                <CardTitle>Gamified Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Earn badges, climb leaderboards, and receive certificates as you complete courses and achieve milestones.</p>
                            </CardContent>
                        </Card>
                        <Card className="glass-card hover:shadow-lg transition-all border-success/20">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-success" />
                                </div>
                                <CardTitle>Community Driven</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Connect with peers and instructors through course forums, live chat, and collaborative study groups.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: 'Active Students', value: '10k+' },
                            { label: 'Expert Instructors', value: '500+' },
                            { label: 'Courses', value: '1.2k+' },
                            { label: 'Success Rate', value: '98%' },
                        ].map((stat, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-secondary/20 backdrop-blur-sm">
                                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-3xl overflow-hidden p-12 text-center">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
                        <div className="relative z-10 text-primary-foreground">
                            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning Journey?</h2>
                            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">Join thousands of learners today and get unlimited access to top-quality courses.</p>
                            <Button size="lg" variant="secondary" className="font-semibold text-primary" onClick={() => navigate('/register')}>
                                Create Free Account
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-border/40 mt-auto bg-secondary/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-muted-foreground" />
                        <span className="font-semibold text-muted-foreground">EduSpark Hub &copy; 2026</span>
                    </div>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
