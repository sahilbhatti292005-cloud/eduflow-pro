import { BookOpen, GraduationCap, HelpCircle, FileText, Layers, UserPlus, PlusCircle } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import { Link } from "react-router-dom";

const quickActions = [
  { label: "Manage Exams", icon: FileText, path: "/exams", color: "bg-primary text-primary-foreground" },
  { label: "Add Question", icon: PlusCircle, path: "/questions", color: "bg-success text-success-foreground" },
  { label: "Enroll Students", icon: UserPlus, path: "/students", color: "bg-warning text-warning-foreground" },
  { label: "Create Batch", icon: Layers, path: "/batches", color: "bg-info text-info-foreground" },
];

const Overview = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back, System Admin</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={BookOpen} value={12} label="Total Courses" iconColor="text-primary" iconBg="bg-primary/10" />
        <MetricCard icon={GraduationCap} value={248} label="Total Students" iconColor="text-success" iconBg="bg-success/10" />
        <MetricCard icon={HelpCircle} value={1420} label="Total Questions" iconColor="text-warning" iconBg="bg-warning/10" />
        <MetricCard icon={FileText} value={36} label="Total Exams" iconColor="text-info" iconBg="bg-info/10" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="bg-card rounded-2xl p-5 card-shadow hover:card-shadow-hover transition-all duration-200 border border-border/50 flex items-center gap-4 group"
            >
              <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="font-semibold text-foreground">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
