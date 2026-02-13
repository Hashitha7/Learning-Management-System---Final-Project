
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Share2, MoreHorizontal, MessageCircle, Star, Clock, CheckCircle, Lock, Play, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockCourses } from '@/data/mockData';
import { mockCourseModules, mockCourseReviews } from '@/data/mockCourseContent';
import { cn } from '@/lib/utils'; // Assuming this utility exists

const CourseDetails = () => {
    const { courseId } = useParams();
    const course = mockCourses.find(c => c.id === courseId) || mockCourses[0]; // Fallback to first course if not found
    const [currentLesson, setCurrentLesson] = useState(mockCourseModules[0].lessons[0]);
    const [expandedModules, setExpandedModules] = useState([1]); // Default first module open
    const [completedLessons, setCompletedLessons] = useState(new Set([101])); // Mock initial completed lesson

    const toggleCompletion = () => {
        setCompletedLessons(prev => {
            const newSet = new Set(prev);
            if (newSet.has(currentLesson.id)) {
                newSet.delete(currentLesson.id);
            } else {
                newSet.add(currentLesson.id);
            }
            return newSet;
        });
    };

    const toggleModule = (id) => {
        setExpandedModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    return (
        <AppLayout>
            <div className="flex flex-col lg:flex-row h-[calc(100vh-100px)] gap-6 overflow-hidden">
                {/* Main Content Area (Video & Tabs) */}
                <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto lg:overflow-visible">
                    {/* Video Player Section */}
                    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative group">
                        {/* Placeholder Video - For demo purposes we simulate a video player */}
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder"
                                title="Course Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            ></iframe>
                        </div>
                    </div>

                    {/* Lesson Title & Actions */}
                    <div className="mt-4 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold line-clamp-2">{currentLesson.title}</h1>
                                <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                                    <span className="font-medium text-primary">{course.title}</span>
                                    <span>•</span>
                                    <span>Lesson {currentLesson.id}</span>
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <Button variant="outline" size="sm" className="hidden sm:flex"><Share2 className="w-4 h-4 mr-2" /> Share</Button>
                                <Button variant="ghost" size="icon" className="sm:hidden"><MoreHorizontal className="w-5 h-5" /></Button>
                                <Button size="sm" onClick={toggleCompletion} className={completedLessons.has(currentLesson.id) ? "bg-green-600 hover:bg-green-700 text-white" : "gradient-primary"}>
                                    {completedLessons.has(currentLesson.id) ? <CheckCircle className="w-4 h-4 mr-2" /> : null}
                                    {completedLessons.has(currentLesson.id) ? "Completed" : "Mark Complete"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <Tabs defaultValue="overview" className="flex-1">
                        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                            <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3">Overview</TabsTrigger>
                            <TabsTrigger value="resources" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3">Resources</TabsTrigger>
                            <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3">Reviews</TabsTrigger>
                            <TabsTrigger value="discussion" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3">Discussion</TabsTrigger>
                        </TabsList>

                        <ScrollArea className="h-[400px] mt-4">
                            <TabsContent value="overview" className="space-y-4 pr-4">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">About this lesson</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        In this lesson, we will cover the fundamental concepts required to master this subject.
                                        We'll explore real-world examples and breakdown complex theories into simple, manageable steps.
                                        By the end of this video, you will have a solid understanding of the core principles.
                                    </p>
                                </div>

                                <Card>
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.teacher}`} />
                                            <AvatarFallback>IN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-foreground">{course.teacher}</p>
                                            <p className="text-xs text-muted-foreground">Course Instructor • {course.lessons} Lessons</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="ml-auto">View Profile</Button>
                                    </CardContent>
                                </Card>

                                <div>
                                    <h3 className="font-semibold text-lg mb-2">What you'll learn</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> Master core concepts</li>
                                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> Real-world application</li>
                                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> Advanced problem solving</li>
                                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> Industry best practices</li>
                                    </ul>
                                </div>
                            </TabsContent>

                            <TabsContent value="reviews" className="space-y-4 pr-4">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-foreground">4.8</div>
                                        <div className="flex text-warning text-xs mt-1">★★★★★</div>
                                        <div className="text-xs text-muted-foreground mt-1">Course Rating</div>
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        {[5, 4, 3, 2, 1].map(stars => (
                                            <div key={stars} className="flex items-center gap-2 text-xs">
                                                <div className="w-12 text-muted-foreground text-right">{stars} stars</div>
                                                <Progress value={stars === 5 ? 70 : stars === 4 ? 20 : 5} className="h-2" />
                                                <div className="w-8 text-muted-foreground">
                                                    {stars === 5 ? '70%' : stars === 4 ? '20%' : '5%'}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {mockCourseReviews.map(review => (
                                        <div key={review.id} className="border-b border-border pb-4 last:border-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="w-8 h-8">
                                                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium text-sm">{review.user}</span>
                                                </div>
                                                <span className="text-xs text-muted-foreground">{review.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-warning fill-warning' : 'text-muted'}`} />
                                                ))}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="discussion">
                                <div className="text-center py-10 text-muted-foreground">
                                    <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
                                    <p>Discussion forum loaded here...</p>
                                </div>
                            </TabsContent>
                        </ScrollArea>
                    </Tabs>
                </div>

                {/* Sidebar (Curriculum) */}
                <div className="w-full lg:w-96 flex flex-col h-full bg-card border-l border-border/40 lg:ml-auto">
                    <div className="p-4 border-b border-border/40">
                        <h2 className="font-bold text-lg mb-1">Course Content</h2>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{course.lessons} Lessons • {course.duration || '12h 30m'} Total</span>
                            <span>{course.progress}% Complete</span>
                        </div>
                        <Progress value={course.progress} className="h-2 mt-3" />
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="divide-y divide-border/40">
                            {mockCourseModules.map((module, index) => (
                                <div key={module.id} className="bg-card/50">
                                    <button
                                        onClick={() => toggleModule(module.id)}
                                        className="w-full flex items-center justify-between p-4 hover:bg-accent/5 transition-colors text-left"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm">Module {index + 1}: {module.title}</h3>
                                            <p className="text-xs text-muted-foreground mt-1">{module.lessons.length} Lessons</p>
                                        </div>
                                        {expandedModules.includes(module.id) ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                                    </button>

                                    {expandedModules.includes(module.id) && (
                                        <div className="bg-background/50">
                                            {module.lessons.map(lesson => {
                                                const isActive = currentLesson.id === lesson.id;
                                                return (
                                                    <button
                                                        key={lesson.id}
                                                        onClick={() => setCurrentLesson(lesson)}
                                                        className={cn(
                                                            "w-full flex items-start gap-3 p-3 px-5 text-left text-sm transition-all border-l-4 hover:bg-accent/5",
                                                            isActive ? "bg-primary/5 border-primary" : "border-transparent",
                                                            completedLessons.has(lesson.id) ? "opacity-75" : ""
                                                        )}
                                                    >
                                                        <div className="mt-0.5">
                                                            {completedLessons.has(lesson.id) ? (
                                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                                            ) : isActive ? (
                                                                <Play className="w-4 h-4 text-primary fill-primary" />
                                                            ) : lesson.type === 'video' ? (
                                                                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                                                            ) : (
                                                                <FileText className="w-4 h-4 text-muted-foreground" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className={cn("font-medium", isActive ? "text-primary" : "text-foreground")}>{lesson.title}</p>
                                                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                                                {lesson.type === 'video' ? <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.duration}</span> : <span>Reading</span>}
                                                            </div>
                                                        </div>
                                                        {lesson.locked && <Lock className="w-3 h-3 text-muted-foreground" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </AppLayout>
    );
};

export default CourseDetails;
