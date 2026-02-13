import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import SuperAdminDash from '@/components/dashboards/SuperAdminDash';
import AdminDash from '@/components/dashboards/AdminDash';
import TeacherDash from '@/components/dashboards/TeacherDash';
import StudentDash from '@/components/dashboards/StudentDash';
const Dashboard = () => {
    const { user } = useAuth();
    if (!user)
        return <Navigate to="/"/>;
    const dashMap = {
        super_admin: <SuperAdminDash />,
        admin: <AdminDash />,
        teacher: <TeacherDash />,
        student: <StudentDash />,
    };
    return <AppLayout>{dashMap[user.role]}</AppLayout>;
};
export default Dashboard;
