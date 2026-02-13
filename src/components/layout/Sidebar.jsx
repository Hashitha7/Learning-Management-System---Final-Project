import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { LayoutDashboard, BookOpen, Users, GraduationCap, ClipboardList, Calendar, CreditCard, Video, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight, Shield, Menu, X, UserCog, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
const menuItems = {
  super_admin: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'User Management', icon: UserCog, path: '/users' },
    { label: 'Courses', icon: BookOpen, path: '/courses' },
    { label: 'Payments', icon: CreditCard, path: '/payments' },
    { label: 'Reports', icon: BarChart3, path: '/reports' },
    { label: 'Messages', icon: MessageSquare, path: '/messages' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ],
  admin: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Courses', icon: BookOpen, path: '/courses' },
    { label: 'Students', icon: Users, path: '/students' },
    { label: 'Exams', icon: ClipboardList, path: '/exams' },
    { label: 'Attendance', icon: Calendar, path: '/attendance' },
    { label: 'Schedule', icon: Calendar, path: '/schedule' },
    { label: 'Payments', icon: CreditCard, path: '/payments' },
    { label: 'Zoom Classes', icon: Video, path: '/zoom' },
    { label: 'Reports', icon: BarChart3, path: '/reports' },
    { label: 'User Management', icon: UserCog, path: '/users' },
    { label: 'Messages', icon: MessageSquare, path: '/messages' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ],
  teacher: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Courses', icon: BookOpen, path: '/courses' },
    { label: 'Students', icon: Users, path: '/students' },
    { label: 'Exams', icon: ClipboardList, path: '/exams' },
    { label: 'Attendance', icon: Calendar, path: '/attendance' },
    { label: 'Schedule', icon: Calendar, path: '/schedule' },
    { label: 'Zoom Classes', icon: Video, path: '/zoom' },
    { label: 'Reports', icon: BarChart3, path: '/reports' },
    { label: 'Messages', icon: MessageSquare, path: '/messages' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ],
  student: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Courses', icon: BookOpen, path: '/courses' },
    { label: 'Exams', icon: GraduationCap, path: '/exams' },
    { label: 'Attendance', icon: Calendar, path: '/attendance' },
    { label: 'Schedule', icon: Calendar, path: '/schedule' },
    { label: 'Zoom Classes', icon: Video, path: '/zoom' },
    { label: 'Payments', icon: CreditCard, path: '/payments' },
    { label: 'Messages', icon: MessageSquare, path: '/messages' },
    { label: 'Profile', icon: User, path: '/profile' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ],
};
export const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  if (!user)
    return null;
  const items = menuItems[user.role];
  const roleBadge = user.role.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
  const sidebarContent = (<div className={cn("flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300", collapsed ? "w-[72px]" : "w-64")}>
    {/* Header */}
    <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
      <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
        <Shield className="w-5 h-5 text-primary-foreground" />
      </div>
      {!collapsed && (<div className="overflow-hidden">
        <h1 className="font-bold text-sm text-sidebar-foreground truncate">EduFlow LMS</h1>
        <p className="text-[10px] text-muted-foreground truncate">{user.school}</p>
      </div>)}
      <Button variant="ghost" size="icon" className="ml-auto hidden lg:flex h-7 w-7 text-muted-foreground" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </Button>
    </div>

    {/* Navigation */}
    <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
      {items.map(item => {
        const active = location.pathname === item.path;
        return (<Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200", active
          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
          : "text-sidebar-foreground hover:bg-sidebar-accent")}>
          <item.icon className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="truncate">{item.label}</span>}
        </Link>);
      })}
    </nav>

    {/* User */}
    <div className="p-3 border-t border-sidebar-border">
      <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
        <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-primary">
          {user.name.split(' ').map(n => n[0]).join('')}
        </div>
        {!collapsed && (<div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
          <p className="text-[10px] text-muted-foreground">{roleBadge}</p>
        </div>)}
        {!collapsed && (<Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => { logout(); navigate('/'); }}>
          <LogOut className="w-4 h-4" />
        </Button>)}
      </div>
    </div>
  </div>);
  return (<>
    {/* Mobile toggle */}
    <Button variant="ghost" size="icon" className="fixed top-3 left-3 z-50 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
      {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </Button>

    {/* Mobile overlay */}
    {mobileOpen && (<div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />)}

    {/* Sidebar */}
    <aside className={cn("fixed top-0 left-0 h-full z-40 lg:relative lg:z-0", mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
      {sidebarContent}
    </aside>
  </>);
};
