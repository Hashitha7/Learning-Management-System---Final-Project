export const mockExams = [
    { id: '1', title: 'Midterm - Advanced Math', course: 'Advanced Mathematics', courseId: '1', type: 'mcq', date: '2026-02-15', duration: 90, questions: 40, status: 'upcoming', avgScore: null, totalMarks: 100, passingMarks: 40 },
    { id: '2', title: 'Quiz 3 - Physics', course: 'Physics Fundamentals', courseId: '2', type: 'mcq', date: '2026-02-10', duration: 30, questions: 15, status: 'completed', avgScore: 78, totalMarks: 30, passingMarks: 15 },
    { id: '3', title: 'Essay - Shakespeare Analysis', course: 'English Literature', courseId: '3', type: 'essay', date: '2026-02-12', duration: 60, questions: 3, status: 'grading', avgScore: null, totalMarks: 50, passingMarks: 25 },
    { id: '4', title: 'Final - CS101', course: 'Computer Science 101', courseId: '4', type: 'mcq', date: '2026-03-01', duration: 120, questions: 60, status: 'upcoming', avgScore: null, totalMarks: 150, passingMarks: 60 },
];

export const mockExamQuestions = {
    '1': [
        {
            id: 'q1',
            type: 'mcq',
            question: 'What is the derivative of x²?',
            options: ['2x', 'x', '2', 'x²'],
            correctAnswer: 0,
            marks: 2
        },
        {
            id: 'q2',
            type: 'mcq',
            question: 'Solve: ∫x dx',
            options: ['x²/2 + C', 'x²', '2x', 'x/2'],
            correctAnswer: 0,
            marks: 2
        },
        {
            id: 'q3',
            type: 'mcq',
            question: 'What is the value of sin(90°)?',
            options: ['0', '1', '-1', '∞'],
            correctAnswer: 1,
            marks: 2
        }
    ],
    '3': [
        {
            id: 'e1',
            type: 'essay',
            question: 'Analyze the theme of ambition in Macbeth. Support your answer with examples from the text.',
            marks: 20,
            wordLimit: 500
        },
        {
            id: 'e2',
            type: 'essay',
            question: 'Compare and contrast the characters of Romeo and Juliet.',
            marks: 15,
            wordLimit: 400
        }
    ]
};

export const mockAttendanceRecords = [
    {
        id: 'a1', courseId: '1', courseName: 'Advanced Mathematics', date: '2026-02-09', students: [
            { id: '1', name: 'Alex Rivera', status: 'present' },
            { id: '2', name: 'Jessica Park', status: 'present' },
            { id: '3', name: 'Michael Brown', status: 'absent' },
            { id: '4', name: 'Emma Wilson', status: 'present' },
        ]
    },
    {
        id: 'a2', courseId: '2', courseName: 'Physics Fundamentals', date: '2026-02-09', students: [
            { id: '1', name: 'Alex Rivera', status: 'present' },
            { id: '2', name: 'Jessica Park', status: 'late' },
            { id: '5', name: 'Daniel Lee', status: 'present' },
        ]
    }
];
