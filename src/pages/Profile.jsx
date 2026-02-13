
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { MapPin, Calendar, Mail, Link as LinkIcon, Award, BookOpen, Clock, Edit2, GraduationCap } from 'lucide-react';
import { mockCourses } from '@/data/mockData';

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // Mock data for the profile
    const profileData = {
        bio: "Passionate learner and aspiring software engineer. I love exploring new technologies and solving complex problems. Currently focusing on Full Stack Development and AI.",
        location: "New York, USA",
        joined: "September 2025",
        website: "portfolio.dev",
        stats: {
            coursesEnrolled: 12,
            coursesCompleted: 8,
            hoursLearned: 145,
            avgGrade: "92%"
        },
        skills: ["React", "Node.js", "Python", "UI/UX Design", "Data Structures"],
        badges: [
            { id: 1, name: "Fast Learner", icon: "🚀", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
            { id: 2, name: "Top Performer", icon: "🏆", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
            { id: 3, name: "Quiz Master", icon: "🎯", color: "bg-green-500/10 text-green-500 border-green-500/20" },
            { id: 4, name: "Consistent", icon: "🔥", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
        ],
        certificates: [
            { id: 1, title: "Advanced Web Development", issuer: "EduFlow Academy", date: "Dec 2025" },
            { id: 2, title: "Python for Data Science", issuer: "Tech University", date: "Jan 2026" },
        ]
    };

    const myCourses = mockCourses.slice(0, 4);

    if (!user) return null;

    return (
        <AppLayout>
            <div className="space-y-6 pt-6 pb-12">
                {/* Header Section */}
                <div className="relative mb-24">
                    <div className="h-48 w-full bg-gradient-to-r from-primary/20 via-primary/10 to-background rounded-xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
                    </div>

                    <div className="absolute -bottom-16 left-6 md:left-10 flex items-end gap-6">
                        <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="mb-4 space-y-1">
                            <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                            <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                                <Badge variant="secondary" className="capitalize">{user.role?.replace('_', ' ')}</Badge>
                                <span className="flex items-center gap-1 text-sm"><MapPin className="w-3 h-3" /> {profileData.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-4 right-4 md:bottom-4 md:top-auto md:right-8">
                        <Button onClick={() => setIsEditing(!isEditing)} variant="outline" size="sm">
                            <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Sidebar Info */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">About Me</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {profileData.bio}
                                </p>
                                <div className="space-y-3 pt-2 text-sm border-t border-border mt-4">
                                    <div className="flex items-center gap-2 text-muted-foreground mt-4">
                                        <Mail className="w-4 h-4" /> {user.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="w-4 h-4" /> Joined {profileData.joined}
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <LinkIcon className="w-4 h-4" /> <a href="#" className="text-primary hover:underline">{profileData.website}</a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Skills</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {profileData.skills.map(skill => (
                                        <Badge key={skill} variant="secondary" className="bg-secondary/50 hover:bg-secondary">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Tabs */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Stats Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <Card className="bg-primary/5 border-primary/20">
                                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                    <span className="text-2xl font-bold text-primary">{profileData.stats.coursesEnrolled}</span>
                                    <span className="text-xs text-muted-foreground mt-1">Courses</span>
                                </CardContent>
                            </Card>
                            <Card className="bg-primary/5 border-primary/20">
                                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                    <span className="text-2xl font-bold text-primary">{profileData.stats.coursesCompleted}</span>
                                    <span className="text-xs text-muted-foreground mt-1">Completed</span>
                                </CardContent>
                            </Card>
                            <Card className="bg-primary/5 border-primary/20">
                                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                    <span className="text-2xl font-bold text-primary">{profileData.stats.hoursLearned}h</span>
                                    <span className="text-xs text-muted-foreground mt-1">Learning Time</span>
                                </CardContent>
                            </Card>
                            <Card className="bg-primary/5 border-primary/20">
                                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                    <span className="text-2xl font-bold text-primary">{profileData.stats.avgGrade}</span>
                                    <span className="text-xs text-muted-foreground mt-1">Avg. Grade</span>
                                </CardContent>
                            </Card>
                        </div>

                        <Tabs defaultValue="courses" className="w-full">
                            <TabsList className="bg-transparent border-b w-full justify-start h-auto p-0 rounded-none gap-6 mb-6">
                                <TabsTrigger value="courses" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3 data-[state=active]:shadow-none">
                                    Active Courses
                                </TabsTrigger>
                                <TabsTrigger value="achievements" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3 data-[state=active]:shadow-none">
                                    Achievements
                                </TabsTrigger>
                                <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3 data-[state=active]:shadow-none">
                                    Activity
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="courses" className="space-y-4 animate-fade-in">
                                {myCourses.map(course => (
                                    <Card key={course.id} className="hover:border-primary/50 transition-colors group cursor-pointer">
                                        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
                                            <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                                                {course.image}
                                            </div>
                                            <div className="flex-1 min-w-0 text-center sm:text-left">
                                                <h4 className="font-semibold truncate group-hover:text-primary transition-colors">{course.title}</h4>
                                                <p className="text-sm text-muted-foreground mb-1">{course.teacher}</p>
                                                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.lessons} Lessons</span>
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 12h Total</span>
                                                </div>
                                            </div>
                                            <div className="w-full sm:w-24 text-center sm:text-right">
                                                <span className="text-sm font-bold text-primary">{course.progress}%</span>
                                                <Progress value={course.progress} className="h-1.5 mt-1" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </TabsContent>

                            <TabsContent value="achievements" className="space-y-6 animate-fade-in">
                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground"><Award className="w-4 h-4" /> Badges</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {profileData.badges.map(badge => (
                                            <div key={badge.id} className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all hover:scale-105 ${badge.color}`}>
                                                <span className="text-3xl drop-shadow-sm">{badge.icon}</span>
                                                <span className="font-medium text-sm text-foreground">{badge.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground"><GraduationCap className="w-4 h-4" /> Certificates</h3>
                                    <div className="space-y-3">
                                        {profileData.certificates.map(cert => (
                                            <Card key={cert.id} className="bg-secondary/20 hover:bg-secondary/40 transition-colors">
                                                <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                            <Award className="w-6 h-6 text-primary" />
                                                        </div>
                                                        <div className="text-center sm:text-left">
                                                            <p className="font-medium">{cert.title}</p>
                                                            <p className="text-xs text-muted-foreground">Issued by {cert.issuer} • {cert.date}</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm" className="w-full sm:w-auto">Download</Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="activity" className="animate-fade-in">
                                <Card>
                                    <CardContent className="p-12 text-center text-muted-foreground">
                                        <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>No recent activity to show.</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Profile;
