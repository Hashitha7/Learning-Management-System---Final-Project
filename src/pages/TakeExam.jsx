import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Clock, CheckCircle2, Flag, Send } from 'lucide-react';
import { mockExams, mockExamQuestions } from '@/data/mockExamData';

const TakeExam = () => {
    const { examId } = useParams();
    const navigate = useNavigate();
    const exam = mockExams.find(e => e.id === examId);
    const questions = mockExamQuestions[examId] || [];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(exam?.duration * 60 || 3600); // in seconds
    const [showSubmitDialog, setShowSubmitDialog] = useState(false);
    const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const answeredCount = Object.keys(answers).length;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const toggleFlag = (questionId) => {
        const newFlags = new Set(flaggedQuestions);
        if (newFlags.has(questionId)) {
            newFlags.delete(questionId);
        } else {
            newFlags.add(questionId);
        }
        setFlaggedQuestions(newFlags);
    };

    const handleSubmit = (autoSubmit = false) => {
        if (autoSubmit) {
            console.log('Auto-submitting exam (time up):', answers);
            navigate('/exams');
            return;
        }
        setShowSubmitDialog(true);
    };

    const confirmSubmit = () => {
        console.log('Submitting exam:', answers);
        // In production: POST to /api/exams/:id/submit
        navigate('/exams');
    };

    if (!exam) {
        return (
            <AppLayout>
                <div className="flex items-center justify-center h-[50vh]">
                    <p className="text-muted-foreground">Exam not found</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="max-w-5xl mx-auto space-y-4 pt-4">
                {/* Header with Timer */}
                <Card className="border-2 border-primary/20">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h1 className="text-xl font-bold">{exam.title}</h1>
                                <p className="text-sm text-muted-foreground">{exam.course}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <div className={`text-2xl font-bold ${timeRemaining < 300 ? 'text-destructive' : 'text-foreground'}`}>
                                        <Clock className="w-5 h-5 inline mr-1" />
                                        {formatTime(timeRemaining)}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Time Remaining</p>
                                </div>
                                <div className="h-12 w-px bg-border" />
                                <div className="text-center">
                                    <div className="text-2xl font-bold">{answeredCount}/{questions.length}</div>
                                    <p className="text-xs text-muted-foreground">Answered</p>
                                </div>
                            </div>
                        </div>
                        <Progress value={progress} className="mt-4" />
                    </CardContent>
                </Card>

                {/* Question Card */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-3">
                        <Card className="glass-card">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">Question {currentQuestionIndex + 1}</Badge>
                                        <Badge>{currentQuestion?.type?.toUpperCase()}</Badge>
                                        <Badge variant="secondary">{currentQuestion?.marks} marks</Badge>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant={flaggedQuestions.has(currentQuestion?.id) ? 'default' : 'outline'}
                                        onClick={() => toggleFlag(currentQuestion?.id)}
                                    >
                                        <Flag className="w-4 h-4 mr-1" />
                                        {flaggedQuestions.has(currentQuestion?.id) ? 'Flagged' : 'Flag'}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <p className="text-lg leading-relaxed whitespace-pre-line">{currentQuestion?.question}</p>
                                </div>

                                {currentQuestion?.type === 'mcq' && (
                                    <RadioGroup
                                        value={answers[currentQuestion.id]?.toString()}
                                        onValueChange={(val) => handleAnswer(currentQuestion.id, parseInt(val))}
                                    >
                                        <div className="space-y-3">
                                            {currentQuestion.options.map((option, index) => (
                                                <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors">
                                                    <RadioGroupItem value={index.toString()} id={`opt-${index}`} />
                                                    <Label htmlFor={`opt-${index}`} className="flex-1 cursor-pointer">
                                                        {option}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                )}

                                {currentQuestion?.type === 'essay' && (
                                    <div className="space-y-2">
                                        <Textarea
                                            placeholder="Type your answer here..."
                                            rows={12}
                                            value={answers[currentQuestion.id] || ''}
                                            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                                            className="resize-none"
                                        />
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Word limit: {currentQuestion.wordLimit}</span>
                                            <span>Words: {(answers[currentQuestion.id] || '').split(/\s+/).filter(w => w).length}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex items-center justify-between pt-4 border-t">
                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                                        disabled={currentQuestionIndex === 0}
                                    >
                                        Previous
                                    </Button>

                                    {currentQuestionIndex < questions.length - 1 ? (
                                        <Button
                                            onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                                        >
                                            Next
                                        </Button>
                                    ) : (
                                        <Button
                                            className="gradient-primary"
                                            onClick={() => handleSubmit(false)}
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                            Submit Exam
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Question Palette */}
                    <div className="lg:col-span-1">
                        <Card className="glass-card sticky top-4">
                            <CardHeader>
                                <CardTitle className="text-sm">Question Palette</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                                    {questions.map((q, index) => {
                                        const isAnswered = answers[q.id] !== undefined;
                                        const isFlagged = flaggedQuestions.has(q.id);
                                        const isCurrent = index === currentQuestionIndex;

                                        return (
                                            <button
                                                key={q.id}
                                                onClick={() => setCurrentQuestionIndex(index)}
                                                className={`
                                                    relative aspect-square rounded-lg border-2 text-sm font-medium transition-all
                                                    ${isCurrent ? 'border-primary bg-primary text-primary-foreground' :
                                                        isAnswered ? 'border-green-500 bg-green-500/10 text-green-600' :
                                                            'border-border hover:border-primary/50'}
                                                `}
                                            >
                                                {index + 1}
                                                {isFlagged && (
                                                    <Flag className="absolute -top-1 -right-1 w-3 h-3 text-orange-500 fill-orange-500" />
                                                )}
                                                {isAnswered && !isCurrent && (
                                                    <CheckCircle2 className="absolute -bottom-1 -right-1 w-3 h-3 text-green-600 fill-green-600" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-4 space-y-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded border-2 border-green-500 bg-green-500/10" />
                                        <span className="text-muted-foreground">Answered</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded border-2 border-border" />
                                        <span className="text-muted-foreground">Not Answered</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Flag className="w-4 h-4 text-orange-500 fill-orange-500" />
                                        <span className="text-muted-foreground">Flagged</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Submit Confirmation Dialog */}
            <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Submit Exam?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You have answered {answeredCount} out of {questions.length} questions.
                            {answeredCount < questions.length && ` ${questions.length - answeredCount} question(s) remain unanswered.`}
                            <br /><br />
                            Once submitted, you cannot make any changes. Are you sure you want to submit?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Review Answers</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmSubmit}>Submit Exam</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
};

export default TakeExam;
