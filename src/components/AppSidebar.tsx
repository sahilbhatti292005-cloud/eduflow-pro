import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  HelpCircle,
  FileText,
  GraduationCap,
  BarChart3,
  LogOut,
  Layers,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const adminNav = [
  { title: "Overview", path: "/", icon: LayoutDashboard },
  { title: "Courses", path: "/courses", icon: BookOpen },
  { title: "Batches", path: "/batches", icon: Layers },
  { title: "Questions", path: "/questions", icon: HelpCircle },
  { title: "Exams", path: "/exams", icon: FileText },
  { title: "Students", path: "/students", icon: GraduationCap },
  { title: "Results", path: "/results", icon: BarChart3 },
];

const studentNav = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "My Exams", path: "/exams", icon: FileText },
  { title: "My Results", path: "/results", icon: BarChart3 },
];

const AppSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = user?.role === "student" ? studentNav : adminNav;

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-card border-r border-border flex flex-col z-30">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">ExamPro</span>
        </div>
      </div>

      {/* Role badge */}
      <div className="px-5 pt-4 pb-2">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
          user?.role === "admin"
            ? "bg-primary/10 text-primary"
            : "bg-success/10 text-success"
        }`}>
          {user?.role === "admin" ? "Admin Panel" : "Student Portal"}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-3 border-t border-border">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
