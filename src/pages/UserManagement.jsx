import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/shared/StatCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { UserPlus, Search, Shield, GraduationCap, BookOpen, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
const mockUsersList = [
    { id: '1', name: 'Marcus Chen', email: 'marcus@lms.io', role: 'super_admin', status: 'active', lastActive: '2 min ago' },
    { id: '2', name: 'Sarah Williams', email: 'sarah@lincoln.edu', role: 'admin', status: 'active', lastActive: '5 min ago' },
    { id: '3', name: 'Dr. James Carter', email: 'carter@lincoln.edu', role: 'teacher', status: 'active', lastActive: '1 hour ago' },
    { id: '4', name: 'Prof. Emily Stone', email: 'stone@lincoln.edu', role: 'teacher', status: 'active', lastActive: '30 min ago' },
    { id: '5', name: 'Alex Rivera', email: 'alex@lincoln.edu', role: 'student', status: 'active', lastActive: '10 min ago' },
    { id: '6', name: 'Jessica Park', email: 'jessica@lincoln.edu', role: 'student', status: 'active', lastActive: '2 hours ago' },
    { id: '7', name: 'Daniel Lee', email: 'daniel@lincoln.edu', role: 'student', status: 'inactive', lastActive: '3 days ago' },
];
const roleIcons = { super_admin: Shield, admin: Users, teacher: GraduationCap, student: BookOpen };
const roleColors = { super_admin: 'text-destructive', admin: 'text-primary', teacher: 'text-accent', student: 'text-success' };
const UserManagement = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    if (!user)
        return <Navigate to="/"/>;
    const filtered = mockUsersList.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
    return (<AppLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        <PageHeader title="User Management" subtitle="Manage roles & permissions">
          <Button size="sm" className="gradient-primary text-primary-foreground"><UserPlus className="w-4 h-4 mr-1"/> Add User</Button>
        </PageHeader>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {['super_admin', 'admin', 'teacher', 'student'].map(role => {
            const Icon = roleIcons[role];
            const count = mockUsersList.filter(u => u.role === role).length;
            return (<Card key={role} className="glass-card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${roleColors[role]}`}/>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{count}</p>
                  <p className="text-xs text-muted-foreground capitalize">{role.replace('_', ' ')}s</p>
                </div>
              </Card>);
        })}
        </div>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
          <Input placeholder="Search users..." className="pl-9 bg-secondary/50" value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <Card className="glass-card">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(u => (<TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                          {u.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="capitalize">{u.role.replace('_', ' ')}</Badge></TableCell>
                    <TableCell><Badge variant={u.status === 'active' ? 'default' : 'secondary'}>{u.status}</Badge></TableCell>
                    <TableCell className="text-muted-foreground text-sm">{u.lastActive}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost">Edit</Button>
                    </TableCell>
                  </TableRow>))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>);
};
export default UserManagement;
