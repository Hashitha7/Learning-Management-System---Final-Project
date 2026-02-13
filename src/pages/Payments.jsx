import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader, StatCard } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockPayments } from '@/data/mockData';
import { DollarSign, CreditCard, Download, Plus, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
const Payments = () => {
    const { user } = useAuth();
    if (!user)
        return <Navigate to="/"/>;
    const totalRevenue = mockPayments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);
    return (<AppLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        <PageHeader title="Payments" subtitle="Payment history & management">
          <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-1"/> Export</Button>
          {user.role !== 'student' && (<Button size="sm" className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-1"/> Record Payment</Button>)}
        </PageHeader>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon={DollarSign} change="+12.5%" trend="up"/>
          <StatCard title="Transactions" value={mockPayments.length} icon={CreditCard}/>
          <StatCard title="Pending" value={mockPayments.filter(p => p.status === 'pending').length} icon={TrendingUp}/>
        </div>
        <Card className="glass-card">
          <CardHeader><CardTitle>Transaction History</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayments.map(p => (<TableRow key={p.id}>
                    <TableCell className="font-medium text-foreground">{p.student}</TableCell>
                    <TableCell className="text-muted-foreground">{p.course}</TableCell>
                    <TableCell className="font-semibold text-foreground">${p.amount}</TableCell>
                    <TableCell className="text-muted-foreground">{p.date}</TableCell>
                    <TableCell><Badge variant="outline">{p.method}</Badge></TableCell>
                    <TableCell>
                      <Badge variant={p.status === 'completed' ? 'default' : p.status === 'pending' ? 'secondary' : 'destructive'}>{p.status}</Badge>
                    </TableCell>
                  </TableRow>))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>);
};
export default Payments;
