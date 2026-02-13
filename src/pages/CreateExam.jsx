import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, X } from 'lucide-react';
import { mockCourses } from '@/data/mockData';

const CreateExam = () => {
    const navigate = useNavigate();
    const [examType, setExamType] = useState('mcq');
    const [examData, setExamData] = useState({
        title: '',
        courseId: '',
        duration: 60,
        passingMarks: 40,
        instructions: '',
    });
    const [questions, setQuestions] = useState([]);

    const addMCQQuestion = () => {
        setQuestions([...questions, {
            id: `q${questions.length + 1}`,
            type: 'mcq',
            question: '',
            options: ['', '', '', ''],
            correctAnswer: 0,
            marks: 2
        }]);
    };

    const addEssayQuestion = () => {
        setQuestions([...questions, {
            id: `q${questions.length + 1}`,
            type: 'essay',
            question: '',
            marks: 10,
            wordLimit: 300
        }]);
    };

    const updateQuestion = (index, field, value) => {
        const updated = [...questions];
        updated[index][field] = value;
        setQuestions(updated);
    };

    const updateOption = (qIndex, optIndex, value) => {
        const updated = [...questions];
        updated[qIndex].options[optIndex] = value;
        setQuestions(updated);
    };

    const removeQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        console.log('Exam Data:', { ...examData, questions });
        // In production: POST to /api/exams
        navigate('/exams');
    };

    const totalMarks = questions.reduce((sum, q) => sum + parseInt(q.marks || 0), 0);

    return (
        <AppLayout>
            <div className="space-y-6 pt-12 lg:pt-0">
                <PageHeader title="Create Exam" subtitle="Design a new assessment">
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => navigate('/exams')}>
                            <X className="w-4 h-4 mr-1" /> Cancel
                        </Button>
                        <Button className="gradient-primary" onClick={handleSave}>
                            <Save className="w-4 h-4 mr-1" /> Save Exam
                        </Button>
                    </div>
                </PageHeader>

                {/* Basic Information */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Enter exam details and settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Exam Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Midterm Exam - Mathematics"
                                    value={examData.title}
                                    onChange={(e) => setExamData({ ...examData, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="course">Course *</Label>
                                <Select value={examData.courseId} onValueChange={(val) => setExamData({ ...examData, courseId: val })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {mockCourses.map(c => (
                                            <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration (minutes) *</Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    value={examData.duration}
                                    onChange={(e) => setExamData({ ...examData, duration: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Total Marks</Label>
                                <Input value={totalMarks} readOnly className="bg-secondary" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="passing">Passing Marks *</Label>
                                <Input
                                    id="passing"
                                    type="number"
                                    value={examData.passingMarks}
                                    onChange={(e) => setExamData({ ...examData, passingMarks: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Exam Type</Label>
                            <RadioGroup value={examType} onValueChange={setExamType} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="mcq" id="mcq" />
                                    <Label htmlFor="mcq" className="font-normal cursor-pointer">Multiple Choice (MCQ)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="essay" id="essay" />
                                    <Label htmlFor="essay" className="font-normal cursor-pointer">Essay</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="mixed" id="mixed" />
                                    <Label htmlFor="mixed" className="font-normal cursor-pointer">Mixed</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="instructions">Instructions</Label>
                            <Textarea
                                id="instructions"
                                placeholder="Enter exam instructions for students..."
                                rows={3}
                                value={examData.instructions}
                                onChange={(e) => setExamData({ ...examData, instructions: e.target.value })}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Questions Section */}
                <Card className="glass-card">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Questions</CardTitle>
                                <CardDescription>{questions.length} question(s) added</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                {(examType === 'mcq' || examType === 'mixed') && (
                                    <Button size="sm" variant="outline" onClick={addMCQQuestion}>
                                        <Plus className="w-4 h-4 mr-1" /> Add MCQ
                                    </Button>
                                )}
                                {(examType === 'essay' || examType === 'mixed') && (
                                    <Button size="sm" variant="outline" onClick={addEssayQuestion}>
                                        <Plus className="w-4 h-4 mr-1" /> Add Essay
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {questions.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                <p>No questions added yet. Click the buttons above to add questions.</p>
                            </div>
                        ) : (
                            questions.map((q, qIndex) => (
                                <Card key={q.id} className="border-2">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline">Q{qIndex + 1}</Badge>
                                                <Badge>{q.type.toUpperCase()}</Badge>
                                            </div>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => removeQuestion(qIndex)}
                                            >
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Question *</Label>
                                            <Textarea
                                                placeholder="Enter question..."
                                                value={q.question}
                                                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                                                rows={2}
                                            />
                                        </div>

                                        {q.type === 'mcq' && (
                                            <div className="space-y-3">
                                                <Label>Options *</Label>
                                                {q.options.map((opt, optIndex) => (
                                                    <div key={optIndex} className="flex items-center gap-2">
                                                        <RadioGroupItem
                                                            value={optIndex.toString()}
                                                            checked={q.correctAnswer === optIndex}
                                                            onClick={() => updateQuestion(qIndex, 'correctAnswer', optIndex)}
                                                        />
                                                        <Input
                                                            placeholder={`Option ${optIndex + 1}`}
                                                            value={opt}
                                                            onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                                                        />
                                                    </div>
                                                ))}
                                                <p className="text-xs text-muted-foreground">Select the correct answer</p>
                                            </div>
                                        )}

                                        {q.type === 'essay' && (
                                            <div className="space-y-2">
                                                <Label>Word Limit</Label>
                                                <Input
                                                    type="number"
                                                    value={q.wordLimit}
                                                    onChange={(e) => updateQuestion(qIndex, 'wordLimit', parseInt(e.target.value))}
                                                    className="w-32"
                                                />
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <Label>Marks *</Label>
                                            <Input
                                                type="number"
                                                value={q.marks}
                                                onChange={(e) => updateQuestion(qIndex, 'marks', parseInt(e.target.value))}
                                                className="w-24"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default CreateExam;
