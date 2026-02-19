import { useAuth } from "@/contexts/AuthContext";
import { FileText, BarChart3, CheckCircle, Clock, ArrowRight } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";

const assignedExams = [
  { id: 1, title: "JavaScript Fundamentals", course: "Full Stack Dev", duration: 60, status: "active" as const, date: "2025-02-20" },
  { id: 2, title: "React Advanced Concepts", course: "Full Stack Dev", duration: 90, status: "upcoming" as const, date: "2025-02-25" },
  { id: 3, title: "Data Structures Quiz", course: "Data Science", duration: 45, status: "completed" as const, date: "2025-02-10" },
  { id: 4, title: "HTML/CSS Basics", course: "Web Design", duration: 30, status: "completed" as const, date: "2025-02-05" },
];

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground mt-1">Here's your exam overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard icon={FileText} value={4} label="Exams Attempted" iconColor="text-primary" iconBg="bg-primary/10" />
        <MetricCard icon={BarChart3} value="78%" label="Avg Performance" iconColor="text-success" iconBg="bg-success/10" />
        <MetricCard icon={CheckCircle} value="75%" label="Success Rate" iconColor="text-warning" iconBg="bg-warning/10" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Assigned Exams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignedExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-card rounded-2xl p-5 border border-border/50 card-shadow hover:card-shadow-hover transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{exam.title}</h3>
                  <p className="text-sm text-muted-foreground">{exam.course}</p>
                </div>
                <StatusBadge status={exam.status} />
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {exam.duration} min
                </span>
                <span>{exam.date}</span>
              </div>
              {exam.status === "active" && (
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                  Start Exam <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {exam.status === "completed" && (
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
                  View Results
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
