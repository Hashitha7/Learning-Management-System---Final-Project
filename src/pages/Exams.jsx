import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockExams } from '@/data/mockExamData';
import { Plus, ClipboardList, Clock, FileText, Eye, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';

const Exams = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  if (!user) return <Navigate to="/" />;

  const filteredExams = mockExams.filter(exam => {
    if (filter === 'all') return true;
    return exam.status === filter;
  });

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'upcoming': return 'default';
      case 'completed': return 'secondary';
      case 'grading': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        <PageHeader title="Exams" subtitle="Manage assessments & grading">
          {user.role !== 'student' && (
            <Button
              size="sm"
              className="gradient-primary text-primary-foreground"
              onClick={() => navigate('/exams/create')}
            >
              <Plus className="w-4 h-4 mr-1" /> Create Exam
            </Button>
          )}
        </PageHeader>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="glass-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockExams.length}</p>
              <p className="text-xs text-muted-foreground">Total Exams</p>
            </div>
          </Card>
          <Card className="glass-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {mockExams.filter(e => e.status === 'upcoming').length}
              </p>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </div>
          </Card>
          <Card className="glass-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {mockExams.filter(e => e.status === 'grading').length}
              </p>
              <p className="text-xs text-muted-foreground">Needs Grading</p>
            </div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 border-b border-border pb-2">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'upcoming' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
          <Button
            variant={filter === 'grading' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('grading')}
          >
            Grading
          </Button>
        </div>

        {/* Exams Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>All Exams</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Avg Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams.map(e => (
                  <TableRow key={e.id} className="cursor-pointer hover:bg-secondary/50">
                    <TableCell className="font-medium text-foreground">{e.title}</TableCell>
                    <TableCell className="text-muted-foreground">{e.course}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="uppercase text-xs">
                        {e.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{e.date}</TableCell>
                    <TableCell>{e.duration} min</TableCell>
                    <TableCell>{e.questions}</TableCell>
                    <TableCell>{e.totalMarks}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(e.status)} className="capitalize">
                        {e.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{e.avgScore ? `${e.avgScore}%` : '—'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {user.role === 'student' && e.status === 'upcoming' && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => navigate(`/exams/${e.id}/take`)}
                          >
                            Start
                          </Button>
                        )}
                        {user.role !== 'student' && (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => navigate(`/exams/${e.id}`)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => navigate(`/exams/${e.id}/edit`)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost">
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Exams;
