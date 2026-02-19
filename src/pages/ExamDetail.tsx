import { useState } from "react";
import { ArrowLeft, Users, FileText, BarChart3, Settings, Target, TrendingUp, Trophy, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import StatusBadge from "@/components/StatusBadge";
import MetricCard from "@/components/MetricCard";

const tabs = ["Questions", "Attempts", "Analytics", "Settings"];

const ExamDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Questions");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/exams" className="p-2 rounded-lg hover:bg-accent transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">JavaScript Fundamentals</h1>
          <p className="text-sm text-muted-foreground">Full Stack Development • FSD Batch A</p>
        </div>
        <StatusBadge status="Active" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Users} value={28} label="Attempts" iconColor="text-primary" iconBg="bg-primary/10" />
        <MetricCard icon={TrendingUp} value="72%" label="Avg Score" iconColor="text-success" iconBg="bg-success/10" />
        <MetricCard icon={Target} value="78%" label="Pass Rate" iconColor="text-warning" iconBg="bg-warning/10" />
        <MetricCard icon={Clock} value="87%" label="Completion" iconColor="text-info" iconBg="bg-info/10" />
      </div>

      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border/50 card-shadow">
        <p className="text-muted-foreground">Select a tab to view {activeTab.toLowerCase()} details for exam #{id}.</p>
      </div>
    </div>
  );
};

export default ExamDetail;
