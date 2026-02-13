
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockCourses } from '@/data/mockData';
import { Plus, Search, Filter, X } from 'lucide-react';
import { useState } from 'react';

const Courses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  if (!user) return <Navigate to="/" />;

  // Get unique grades from mock data for the filter
  const grades = [...new Set(mockCourses.map(c => c.grade))].sort();

  const filtered = mockCourses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.teacher.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || c.grade === gradeFilter;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const resetFilters = () => {
    setSearch('');
    setGradeFilter('all');
    setStatusFilter('all');
  };

  const hasActiveFilters = search || gradeFilter !== 'all' || statusFilter !== 'all';

  return (
    <AppLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        <PageHeader title="Courses" subtitle={`${filtered.length} courses found`}>
          {(user.role === 'admin' || user.role === 'super_admin') && (
            <Button size="sm" className="gradient-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-1" /> New Course
            </Button>
          )}
        </PageHeader>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses or teachers..."
              className="pl-9 bg-secondary/50"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {grades.map(g => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" size="icon" onClick={resetFilters} title="Clear Filters">
                <X className="w-4 h-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No courses found</h3>
            <p className="text-muted-foreground mt-1 max-w-sm mx-auto">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button variant="outline" className="mt-4" onClick={resetFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(c => (
              <Card key={c.id} onClick={() => navigate(`/courses/${c.id}`)} className="glass-card hover:border-primary/50 transition-all cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{c.image}</span>
                    <Badge variant={c.price === 0 ? 'secondary' : 'default'}>
                      {c.price === 0 ? 'Free' : `$${c.price}`}
                    </Badge>
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-1">{c.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground line-clamp-1">{c.teacher}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{c.students} students</span>
                      <span>{c.lessons} lessons</span>
                      <span>{c.grade}</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${c.progress}%` }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant={c.status === 'active' ? 'default' : 'outline'} className="text-[10px] uppercase">{c.status}</Badge>
                      <span className="text-xs text-muted-foreground">{c.progress}% complete</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Courses;
