import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/shared/StatCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockStudents } from '@/data/mockData';
import { Search, Filter, UserPlus, Download } from 'lucide-react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
const Students = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    if (!user)
        return <Navigate to="/"/>;
    const filtered = mockStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
    return (<AppLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        <PageHeader title="Students" subtitle={`${mockStudents.length} students enrolled`}>
          <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-1"/> Export</Button>
          <Button size="sm" className="gradient-primary text-primary-foreground"><UserPlus className="w-4 h-4 mr-1"/> Add Student</Button>
        </PageHeader>
        <div className="flex gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
            <Input placeholder="Search students..." className="pl-9 bg-secondary/50" value={search} onChange={e => setSearch(e.target.value)}/>
          </div>
          <Button variant="outline" size="icon"><Filter className="w-4 h-4"/></Button>
        </div>
        <Card className="glass-card">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Avg Grade</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(s => (<TableRow key={s.id} className="cursor-pointer hover:bg-secondary/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{s.grade}</TableCell>
                    <TableCell>{s.courses}</TableCell>
                    <TableCell className="font-medium">{s.avgGrade}%</TableCell>
                    <TableCell>{s.attendance}%</TableCell>
                    <TableCell>
                      <Badge variant={s.status === 'active' ? 'default' : 'secondary'}>{s.status}</Badge>
                    </TableCell>
                  </TableRow>))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>);
};
export default Students;
