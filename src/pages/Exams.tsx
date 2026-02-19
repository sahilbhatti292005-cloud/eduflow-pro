import { useState } from "react";
import { Plus, Search, Eye, Edit2, Copy, Trash2, Clock, FileText, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/StatusBadge";
import { Link } from "react-router-dom";

const examsData = [
  { id: 1, title: "JavaScript Fundamentals", course: "Full Stack Development", batch: "FSD Batch A", duration: "60 min", questions: 30, attempts: 28, avgScore: 72, status: "Active" },
  { id: 2, title: "React Advanced Concepts", course: "Full Stack Development", batch: "FSD Batch A", duration: "90 min", questions: 40, attempts: 22, avgScore: 68, status: "Active" },
  { id: 3, title: "Python Basics", course: "Data Science & Analytics", batch: "DS Batch B", duration: "45 min", questions: 25, attempts: 25, avgScore: 82, status: "Completed" },
  { id: 4, title: "Database Design", course: "Full Stack Development", batch: "FSD Batch A", duration: "60 min", questions: 20, attempts: 0, avgScore: 0, status: "Upcoming" },
  { id: 5, title: "UI Principles", course: "UI/UX Design", batch: "UX Batch A", duration: "30 min", questions: 15, attempts: 0, avgScore: 0, status: "Draft" },
  { id: 6, title: "Cloud Fundamentals", course: "Cloud Computing", batch: "Cloud Batch A", duration: "60 min", questions: 35, attempts: 28, avgScore: 75, status: "Completed" },
];

const Exams = () => {
  const [search, setSearch] = useState("");
  const filtered = examsData.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Exams</h1>
        <Link to="/exams/create">
          <Button><Plus className="w-4 h-4 mr-2" /> Create Exam</Button>
        </Link>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search exams..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((exam) => (
          <div key={exam.id} className="bg-card rounded-2xl p-5 card-shadow hover:card-shadow-hover transition-shadow duration-200 border border-border/50">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground text-lg">{exam.title}</h3>
                <p className="text-sm text-muted-foreground">{exam.course} • {exam.batch}</p>
              </div>
              <StatusBadge status={exam.status} />
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground mt-3">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {exam.duration}</span>
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> {exam.questions} Questions</span>
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {exam.attempts} Attempts</span>
              <span className="flex items-center gap-1.5"><BarChart3 className="w-3.5 h-3.5" /> Avg: {exam.avgScore || "—"}%</span>
            </div>
            <div className="flex gap-1 mt-4 pt-3 border-t border-border">
              <Link to={`/exams/${exam.id}`} className="p-2 rounded-lg hover:bg-accent transition-colors"><Eye className="w-4 h-4 text-muted-foreground" /></Link>
              <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Edit2 className="w-4 h-4 text-muted-foreground" /></button>
              <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Copy className="w-4 h-4 text-muted-foreground" /></button>
              <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
