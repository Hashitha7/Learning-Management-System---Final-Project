import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockCourses, mockStudents } from '@/data/mockData';
import { mockAttendanceRecords } from '@/data/mockExamData';
import { CheckCircle, XCircle, Clock, Download, Calendar as CalendarIcon, Users } from 'lucide-react';

const Attendance = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCourse, setSelectedCourse] = useState('1');
  const [attendanceData, setAttendanceData] = useState(
    mockAttendanceRecords.find(r => r.courseId === selectedCourse)?.students || []
  );

  if (!user) return <Navigate to="/" />;

  const markAttendance = (studentId, status) => {
    setAttendanceData(prev =>
      prev.map(s => s.id === studentId ? { ...s, status } : s)
    );
  };

  const markAllPresent = () => {
    setAttendanceData(prev => prev.map(s => ({ ...s, status: 'present' })));
  };

  const saveAttendance = () => {
    console.log('Saving attendance:', {
      courseId: selectedCourse,
      date: selectedDate.toISOString().split('T')[0],
      students: attendanceData
    });
    // In production: POST to /api/attendance/mark
  };

  const presentCount = attendanceData.filter(s => s.status === 'present').length;
  const absentCount = attendanceData.filter(s => s.status === 'absent').length;
  const lateCount = attendanceData.filter(s => s.status === 'late').length;
  const totalCount = attendanceData.length;
  const attendanceRate = totalCount > 0 ? ((presentCount + lateCount) / totalCount * 100).toFixed(1) : 0;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'absent': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'late': return <Clock className="w-5 h-5 text-orange-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      present: 'default',
      absent: 'destructive',
      late: 'secondary'
    };
    return (
      <Badge variant={variants[status] || 'outline'} className="capitalize">
        {status || 'Not Marked'}
      </Badge>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        <PageHeader title="Attendance Management" subtitle="Track and manage student attendance">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" /> Export
            </Button>
            {user.role !== 'student' && (
              <Button size="sm" className="gradient-primary" onClick={saveAttendance}>
                Save Attendance
              </Button>
            )}
          </div>
        </PageHeader>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{presentCount}</p>
                <p className="text-xs text-muted-foreground">Present</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{absentCount}</p>
                <p className="text-xs text-muted-foreground">Absent</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{lateCount}</p>
                <p className="text-xs text-muted-foreground">Late</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{attendanceRate}%</p>
                <p className="text-xs text-muted-foreground">Attendance Rate</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm">Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {user.role !== 'student' && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="sm"
                      onClick={markAllPresent}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark All Present
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      size="sm"
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      View History
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Attendance Table */}
          <div className="lg:col-span-3">
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle>Mark Attendance</CardTitle>
                    <CardDescription>
                      {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </CardDescription>
                  </div>
                  {user.role !== 'student' && (
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCourses.map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Student Name</TableHead>
                      {user.role !== 'student' && (
                        <>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </>
                      )}
                      {user.role === 'student' && <TableHead>Status</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(student.status)}
                            <span>{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(student.status)}</TableCell>
                        {user.role !== 'student' && (
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant={student.status === 'present' ? 'default' : 'outline'}
                                onClick={() => markAttendance(student.id, 'present')}
                              >
                                Present
                              </Button>
                              <Button
                                size="sm"
                                variant={student.status === 'late' ? 'default' : 'outline'}
                                onClick={() => markAttendance(student.id, 'late')}
                              >
                                Late
                              </Button>
                              <Button
                                size="sm"
                                variant={student.status === 'absent' ? 'destructive' : 'outline'}
                                onClick={() => markAttendance(student.id, 'absent')}
                              >
                                Absent
                              </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Attendance;
