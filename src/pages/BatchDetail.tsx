import { useState } from "react";
import { ArrowLeft, Users, FileText, BarChart3, Settings, Search, Plus, Trash2, Trophy, TrendingUp, TrendingDown, Target } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/StatusBadge";
import MetricCard from "@/components/MetricCard";

const tabs = ["Students", "Exams", "Analytics", "Settings"];

const studentsData = [
  { id: 1, name: "Arun Kumar", email: "arun@email.com", performance: "A" },
  { id: 2, name: "Priya Sharma", email: "priya@email.com", performance: "B+" },
  { id: 3, name: "Rahul Singh", email: "rahul@email.com", performance: "A-" },
  { id: 4, name: "Sneha Patel", email: "sneha@email.com", performance: "B" },
  { id: 5, name: "Vikram Reddy", email: "vikram@email.com", performance: "A+" },
];

const examsData = [
  { id: 1, title: "JavaScript Fundamentals", completion: 87, avgScore: 72, status: "Active" },
  { id: 2, title: "React Advanced Concepts", completion: 65, avgScore: 68, status: "Active" },
  { id: 3, title: "Node.js Backend", completion: 100, avgScore: 78, status: "Completed" },
  { id: 4, title: "Database Design", completion: 0, avgScore: 0, status: "Upcoming" },
];

const BatchDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Students");
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/batches" className="p-2 rounded-lg hover:bg-accent transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">FSD Batch A - 2024</h1>
          <p className="text-sm text-muted-foreground">Full Stack Development • Batch #{id}</p>
        </div>
        <StatusBadge status="Active" />
      </div>

      {/* Tabs */}
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

      {/* Tab content */}
      {activeTab === "Students" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Button><Plus className="w-4 h-4 mr-2" /> Enroll Student</Button>
          </div>
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Performance</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((s) => (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3 font-medium text-foreground">{s.name}</td>
                    <td className="px-5 py-3 text-sm text-muted-foreground">{s.email}</td>
                    <td className="px-5 py-3"><StatusBadge status={s.performance} variant="active" /></td>
                    <td className="px-5 py-3 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Exams" && (
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Exam</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Completion</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Avg Score</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {examsData.map((e) => (
                <tr key={e.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3 font-medium text-foreground">{e.title}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${e.completion}%` }} />
                      </div>
                      <span className="text-sm text-muted-foreground">{e.completion}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{e.avgScore || "—"}</td>
                  <td className="px-5 py-3"><StatusBadge status={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Analytics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard icon={Target} value="78%" label="Pass Rate" iconColor="text-success" iconBg="bg-success/10" />
            <MetricCard icon={TrendingUp} value="72.5" label="Average Score" iconColor="text-primary" iconBg="bg-primary/10" />
            <MetricCard icon={Trophy} value="Vikram R." label="Top Performer" iconColor="text-warning" iconBg="bg-warning/10" />
            <MetricCard icon={TrendingDown} value="58.2" label="Lowest Score" iconColor="text-destructive" iconBg="bg-destructive/10" />
          </div>
          {/* Visual bar chart */}
          <div className="bg-card rounded-2xl p-6 border border-border/50 card-shadow">
            <h3 className="font-semibold text-foreground mb-4">Exam Performance</h3>
            <div className="space-y-3">
              {examsData.filter(e => e.avgScore > 0).map((e) => (
                <div key={e.id} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-48 truncate">{e.title}</span>
                  <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden">
                    <div className="h-full bg-primary/80 rounded-lg flex items-center px-3 transition-all duration-500" style={{ width: `${e.avgScore}%` }}>
                      <span className="text-xs font-semibold text-primary-foreground">{e.avgScore}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Settings" && (
        <div className="max-w-lg space-y-4">
          <div className="bg-card rounded-2xl p-5 border border-border/50 card-shadow space-y-4">
            <h3 className="font-semibold text-foreground">Batch Settings</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Batch Name</label>
              <Input defaultValue="FSD Batch A - 2024" />
            </div>
            <div className="flex gap-3">
              <Button>Save Changes</Button>
              <Button variant="outline">Archive Batch</Button>
              <Button variant="destructive">Delete Batch</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchDetail;
