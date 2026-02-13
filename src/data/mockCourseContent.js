export const mockCourseModules = [
    {
        id: 1,
        title: "Module 1: Introduction & Fundamentals",
        lessons: [
            { id: 101, title: "Welcome to the Course", duration: "5:00", type: "video", completed: true },
            { id: 102, title: "Setting Up Your Environment", duration: "12:00", type: "video", completed: true },
            { id: 103, title: "Course Overview & Goals", duration: "8:30", type: "video", completed: false },
        ]
    },
    {
        id: 2,
        title: "Module 2: Core Concepts",
        lessons: [
            { id: 201, title: "Understanding the Basics", duration: "15:00", type: "video", completed: false },
            { id: 202, title: "Deep Dive into Theory", duration: "25:00", type: "video", completed: false },
            { id: 203, title: "Practical Application", duration: "20:00", type: "video", completed: false },
            { id: 204, title: "Module Quiz", duration: "10:00", type: "quiz", completed: false },
        ]
    },
    {
        id: 3,
        title: "Module 3: Advanced Topics",
        lessons: [
            { id: 301, title: "Advanced Techniques", duration: "30:00", type: "video", completed: false },
            { id: 302, title: "Real-world Examples", duration: "22:00", type: "video", completed: false },
            { id: 303, title: "Final Project Guidelines", duration: "10:00", type: "text", completed: false },
        ]
    }
];

export const mockCourseReviews = [
    { id: 1, user: "Sarah J.", rating: 5, comment: "This course completely changed my understanding of the subject. Highly recommended!", date: "2 days ago" },
    { id: 2, user: "Mike T.", rating: 4, comment: "Great content, but the audio quality in Module 2 was slightly off.", date: "1 week ago" },
    { id: 3, user: "Emily R.", rating: 5, comment: "Fantastic instructor! Everything is explained clearly.", date: "2 weeks ago" }
];
