import { FileText, Users, CheckCircle, TrendingUp, BarChart3, Trophy, Target } from "lucide-react";
import MetricCard from "@/components/MetricCard";

const topStudents = [
  { name: "Vikram Reddy", score: 92, course: "Full Stack Development" },
  { name: "Priya Sharma", score: 88, course: "Data Science & Analytics" },
  { name: "Arun Kumar", score: 85, course: "Full Stack Development" },
  { name: "Anjali Gupta", score: 83, course: "Cloud Computing" },
  { name: "Sneha Patel", score: 80, course: "UI/UX Design" },
];

const difficultyData = [
  { level: "Easy", correct: 89, total: 100 },
  { level: "Medium", correct: 72, total: 100 },
  { level: "Hard", correct: 54, total: 100 },
];

const Results = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-foreground">Results & Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={FileText} value={36} label="Total Exams" iconColor="text-primary" iconBg="bg-primary/10" />
        <MetricCard icon={Users} value={186} label="Students Participated" iconColor="text-success" iconBg="bg-success/10" />
        <MetricCard icon={CheckCircle} value="84%" label="Completion Rate" iconColor="text-warning" iconBg="bg-warning/10" />
        <MetricCard icon={TrendingUp} value="72%" label="Success Rate" iconColor="text-info" iconBg="bg-info/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Bar Graph */}
        <div className="bg-card rounded-2xl p-6 border border-border/50 card-shadow">
          <h3 className="font-semibold text-foreground mb-4">Course Performance</h3>
          <div className="space-y-4">
            {[
              { name: "Full Stack Dev", score: 74 },
              { name: "Data Science", score: 78 },
              { name: "UI/UX Design", score: 82 },
              { name: "Cloud Computing", score: 71 },
            ].map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-32 truncate">{c.name}</span>
                <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                  <div className="h-full bg-primary/80 rounded-lg flex items-center px-3 transition-all duration-500" style={{ width: `${c.score}%` }}>
                    <span className="text-xs font-semibold text-primary-foreground">{c.score}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Analysis */}
        <div className="bg-card rounded-2xl p-6 border border-border/50 card-shadow">
          <h3 className="font-semibold text-foreground mb-4">Difficulty Analysis</h3>
          <div className="space-y-4">
            {difficultyData.map((d) => (
              <div key={d.level} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-20">{d.level}</span>
                <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                  <div
                    className={`h-full rounded-lg flex items-center px-3 transition-all duration-500 ${
                      d.level === "Easy" ? "bg-success/80" : d.level === "Medium" ? "bg-warning/80" : "bg-destructive/80"
                    }`}
                    style={{ width: `${d.correct}%` }}
                  >
                    <span className="text-xs font-semibold text-primary-foreground">{d.correct}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Students */}
      <div className="bg-card rounded-2xl p-6 border border-border/50 card-shadow">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-warning" /> Top Performers</h3>
        <div className="space-y-3">
          {topStudents.map((s, i) => (
            <div key={s.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="font-medium text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.course}</p>
              </div>
              <span className="text-lg font-bold text-primary">{s.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
