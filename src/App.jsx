import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Students from "./pages/Students";
import Exams from "./pages/Exams";
import CreateExam from "./pages/CreateExam";
import TakeExam from "./pages/TakeExam";
import Attendance from "./pages/Attendance";
import Schedule from "./pages/Schedule";
import Payments from "./pages/Payments";
import ZoomClasses from "./pages/ZoomClasses";
import Reports from "./pages/Reports";
import UserManagement from "./pages/UserManagement";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();
const App = () => (<QueryClientProvider client={queryClient}>
  <AuthProvider>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" attribute="class">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetails />} />
            <Route path="/students" element={<Students />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/exams/create" element={<CreateExam />} />
            <Route path="/exams/:examId/take" element={<TakeExam />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/zoom" element={<ZoomClasses />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </AuthProvider>
</QueryClientProvider>);
export default App;
