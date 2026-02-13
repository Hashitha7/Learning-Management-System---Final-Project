
import { StatCard, PageHeader } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockStats, mockActivities, mockCourses, mockStudents } from '@/data/mockData';
import { Users, GraduationCap, BookOpen, DollarSign, Plus, UserPlus, CalendarCheck, TrendingUp, TrendingDown, MoreHorizontal, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const studentStatusData = [
  { name: 'Active', value: 850, color: '#10b981' }, // emerald-500
  { name: 'Inactive', value: 120, color: '#ef4444' }, // red-500
  { name: 'New', value: 270, color: '#3b82f6' }, // blue-500
];

const revenueData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 2000 },
  { name: 'Apr', amount: 2780 },
  { name: 'May', amount: 1890 },
  { name: 'Jun', amount: 2390 },
  { name: 'Jul', amount: 3490 },
  { name: 'Aug', amount: 4200 },
  { name: 'Sep', amount: 5100 },
];

const enrollmentData = [
  { name: 'Mon', students: 12 },
  { name: 'Tue', students: 18 },
  { name: 'Wed', students: 15 },
  { name: 'Thu', students: 25 },
  { name: 'Fri', students: 20 },
  { name: 'Sat', students: 8 },
  { name: 'Sun', students: 5 },
];

const AdminDash = () => {
  const s = mockStats.admin;

  return (
    <div className="space-y-6 pt-6">
      <PageHeader title="Admin Dashboard" subtitle="Overview of Lincoln Academy Performance">
        <div className="flex gap-2">
          <Button size="sm" variant="outline"><CalendarCheck className="w-4 h-4 mr-2" /> Academic Calendar</Button>
          <Button size="sm" className="gradient-primary text-primary-foreground"><UserPlus className="w-4 h-4 mr-2" /> Add Student</Button>
        </div>
      </PageHeader>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={s.totalStudents.toLocaleString()}
          icon={Users}
          change="+12.5%"
          trend="up"
          className="bg-card border-l-4 border-l-blue-500"
        />
        <StatCard
          title="Total Teachers"
          value={s.totalTeachers}
          icon={GraduationCap}
          change="+2"
          trend="up"
          className="bg-card border-l-4 border-l-purple-500"
        />
        <StatCard
          title="Revenue"
          value={`$${s.revenue.toLocaleString()}`}
          icon={DollarSign}
          change="+8.2%"
          trend="up"
          className="bg-card border-l-4 border-l-green-500"
        />
        <StatCard
          title="Avg. Attendance"
          value={`${s.attendanceRate}%`}
          icon={CalendarCheck}
          change="-1.5%"
          trend="down"
          className="bg-card border-l-4 border-l-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-4 glass-card">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue performance for the current academic year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Student Status Pie Chart */}
        <Card className="lg:col-span-3 glass-card">
          <CardHeader>
            <CardTitle>Student Distribution</CardTitle>
            <CardDescription>Active vs Inactive Students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={studentStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {studentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-3xl font-bold">{s.totalStudents}</span>
                <span className="text-xs text-muted-foreground">Total Students</span>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {studentStatusData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-sm text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enrollments / Activity */}
        <Card className="lg:col-span-2 glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Performing Students</CardTitle>
              <CardDescription>Based on recent exam scores and attendance</CardDescription>
            </div>
            <Button variant="ghost" size="sm">View All <ArrowRight className="w-4 h-4 ml-1" /></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockStudents.slice(0, 5).map(student => (
                <div key={student.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm text-foreground">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{student.avgGrade}%</p>
                    <p className="text-xs text-muted-foreground">Avg. Grade</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Courses */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Popular Courses</CardTitle>
            <CardDescription>By student enrollment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockCourses.slice(0, 4).map(course => (
              <div key={course.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="h-10 w-10 flex items-center justify-center bg-secondary rounded-md text-xl">
                  {course.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{course.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{course.students} Students</span>
                    <span>•</span>
                    <span>{course.grade}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2" size="sm">View All Courses</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent System Activity */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActivities.map(activity => (
              <div key={activity.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 ring-4 ring-primary/20" />
                  <div className="w-0.5 grow bg-border mt-2 h-full" />
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.detail}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDash;
