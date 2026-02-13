import { StatCard, PageHeader } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockStats, mockActivities } from '@/data/mockData';
import { Building2, Users, DollarSign, Activity, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const chartData = [
    { month: 'Sep', users: 8400 }, { month: 'Oct', users: 9200 }, { month: 'Nov', users: 10100 },
    { month: 'Dec', users: 10800 }, { month: 'Jan', users: 11900 }, { month: 'Feb', users: 12840 },
];
const SuperAdminDash = () => {
    const s = mockStats.superAdmin;
    return (<div className="space-y-6 pt-12 lg:pt-0">
      <PageHeader title="Super Admin Dashboard" subtitle="Platform overview & analytics"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Schools" value={s.totalSchools} icon={Building2} change="+3 this month" trend="up"/>
        <StatCard title="Total Admins" value={s.totalAdmins} icon={Users} change="+5 this month" trend="up"/>
        <StatCard title="Revenue" value={`$${s.totalRevenue.toLocaleString()}`} icon={DollarSign} change="+12.5%" trend="up"/>
        <StatCard title="Active Users" value={s.activeUsers.toLocaleString()} icon={Activity} change="+8.3%" trend="up"/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 glass-card">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary"/> User Growth</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12}/>
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, color: 'hsl(var(--foreground))' }}/>
                <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader><CardTitle className="text-lg">Recent Activity</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockActivities.map(a => (<div key={a.id} className="flex gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"/>
                <div>
                  <p className="font-medium text-foreground">{a.action}</p>
                  <p className="text-muted-foreground text-xs">{a.detail}</p>
                  <p className="text-muted-foreground text-[10px] mt-0.5">{a.time}</p>
                </div>
              </div>))}
          </CardContent>
        </Card>
      </div>
    </div>);
};
export default SuperAdminDash;
