import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/shared/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockZoomClasses } from '@/data/mockData';
import { Video, Plus, ExternalLink, Play } from 'lucide-react';
const ZoomClasses = () => {
    const { user } = useAuth();
    if (!user)
        return <Navigate to="/"/>;
    return (<AppLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        <PageHeader title="Online Classes" subtitle="Zoom meeting management">
          {user.role !== 'student' && (<Button size="sm" className="gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-1"/> Schedule Class</Button>)}
        </PageHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockZoomClasses.map(z => (<Card key={z.id} className="glass-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Video className="w-5 h-5 text-primary"/>
                  </div>
                  <Badge variant={z.status === 'live' ? 'destructive' : z.status === 'scheduled' ? 'default' : 'secondary'}>
                    {z.status === 'live' ? '🔴 Live' : z.status}
                  </Badge>
                </div>
                <CardTitle className="text-base mt-2">{z.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{z.course}</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>📅 {z.date} at {z.time}</p>
                  <p>⏱ {z.duration} minutes</p>
                  <p>👥 {z.students} students</p>
                  <p>👨‍🏫 {z.teacher}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  {z.status === 'live' && (<Button size="sm" className="flex-1 gradient-primary text-primary-foreground">
                      <Play className="w-4 h-4 mr-1"/> Join Now
                    </Button>)}
                  {z.status === 'scheduled' && (<Button size="sm" variant="outline" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-1"/> Copy Link
                    </Button>)}
                  {z.recordingUrl && (<Button size="sm" variant="outline" className="flex-1">
                      <Play className="w-4 h-4 mr-1"/> Recording
                    </Button>)}
                </div>
              </CardContent>
            </Card>))}
        </div>
      </div>
    </AppLayout>);
};
export default ZoomClasses;
