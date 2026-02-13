
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import {
    Search,
    Bell,
    Sun,
    Moon,
    Menu,
    CheckCircle2,
    AlertCircle,
    Info,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockNotifications } from '@/data/mockData';

export const Header = () => {
    const location = useLocation();
    const { theme, setTheme } = useTheme();
    const [notifications, setNotifications] = useState(mockNotifications);

    // Generate breadcrumb title based on path
    const getPageTitle = () => {
        const path = location.pathname.substring(1);
        if (!path) return 'Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1).replace('/', ' / ').replace('-', ' ');
    };

    const unreadCount = notifications.filter(n => n.unread).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, unread: false } : n
        ));
    };

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
            case 'alert': return <AlertCircle className="w-4 h-4 text-red-500" />;
            default: return <Info className="w-4 h-4 text-blue-500" />;
        }
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Mobile Menu Placeholder (handled by Sidebar, but we need spacing) */}
            <div className="w-8 lg:hidden" />

            {/* Breadcrumb / Title */}
            <div className="flex-1">
                <h1 className="text-lg font-semibold md:text-xl capitalize truncate">
                    {getPageTitle()}
                </h1>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
                {/* Search Bar - Hidden on mobile */}
                <div className="hidden md:flex relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
                    />
                </div>

                {/* Notifications Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                            <Bell className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                                    {unreadCount}
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h4 className="font-semibold">Notifications</h4>
                            {unreadCount > 0 && (
                                <Button variant="ghost" size="sm" className="text-xs h-auto p-0 text-primary" onClick={markAllRead}>
                                    Mark all read
                                </Button>
                            )}
                        </div>
                        <ScrollArea className="h-[300px]">
                            {notifications.length === 0 ? (
                                <div className="p-4 text-center text-sm text-muted-foreground">
                                    No notifications
                                </div>
                            ) : (
                                <div className="grid gap-1 p-1">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-start gap-3 p-3 rounded-md transition-colors hover:bg-accent cursor-pointer ${notification.unread ? 'bg-accent/50' : ''}`}
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <div className="mt-1 shrink-0">
                                                {getIcon(notification.type)}
                                            </div>
                                            <div className="grid gap-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-sm font-medium leading-none">
                                                        {notification.title}
                                                    </p>
                                                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                                        {notification.time}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground line-clamp-2">
                                                    {notification.message}
                                                </p>
                                            </div>
                                            {notification.unread && (
                                                <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-primary" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                        <DropdownMenuSeparator />
                        <div className="p-2">
                            <Button variant="outline" className="w-full h-8 text-xs">
                                View all notifications
                            </Button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
        </header>
    );
};
