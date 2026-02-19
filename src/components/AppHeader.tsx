import { useLocation } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const pathToBreadcrumb: Record<string, string> = {
  "/": "OVERVIEW",
  "/courses": "COURSES",
  "/batches": "BATCHES",
  "/questions": "QUESTIONS",
  "/exams": "EXAMS",
  "/exams/create": "EXAMS / CREATE",
  "/students": "STUDENTS",
  "/results": "RESULTS",
};

const AppHeader = () => {
  const location = useLocation();
  const { user } = useAuth();

  const breadcrumb = Object.entries(pathToBreadcrumb).find(([path]) =>
    location.pathname === path || (path !== "/" && location.pathname.startsWith(path))
  )?.[1] || "PLATFORM";

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="text-xs font-semibold tracking-wider text-muted-foreground">
        PLATFORM / {breadcrumb}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-foreground">{user?.name}</span>
        <span className="px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
          {user?.role === "admin" ? "Admin" : "Student"}
        </span>
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
