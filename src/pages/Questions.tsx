import { useState } from "react";
import { Plus, Search, HelpCircle, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/StatusBadge";

const questionsData = [
  { id: 1, text: "What is the difference between let and var in JavaScript?", difficulty: "Easy", marks: 2, course: "Full Stack Development" },
  { id: 2, text: "Explain the concept of closures in JavaScript.", difficulty: "Medium", marks: 5, course: "Full Stack Development" },
  { id: 3, text: "What is the virtual DOM in React?", difficulty: "Medium", marks: 5, course: "Full Stack Development" },
  { id: 4, text: "Describe the differences between SQL and NoSQL databases.", difficulty: "Hard", marks: 10, course: "Data Science & Analytics" },
  { id: 5, text: "What are Python decorators?", difficulty: "Medium", marks: 5, course: "Data Science & Analytics" },
  { id: 6, text: "Explain CSS Grid vs Flexbox.", difficulty: "Easy", marks: 2, course: "UI/UX Design" },
];

const difficultyVariant = (d: string) => d === "Easy" ? "active" : d === "Medium" ? "upcoming" : "draft";

const Questions = () => {
  const [search, setSearch] = useState("");
  const filtered = questionsData.filter((q) => q.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Questions Bank</h1>
        <Button><Plus className="w-4 h-4 mr-2" /> Add Question</Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search questions..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Question</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Course</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Difficulty</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Marks</th>
              <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q) => (
              <tr key={q.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground max-w-md truncate">{q.text}</td>
                <td className="px-5 py-3 text-sm text-muted-foreground">{q.course}</td>
                <td className="px-5 py-3"><StatusBadge status={q.difficulty} variant={difficultyVariant(q.difficulty)} /></td>
                <td className="px-5 py-3 text-sm text-muted-foreground">{q.marks}</td>
                <td className="px-5 py-3 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-accent transition-colors"><Edit2 className="w-4 h-4 text-muted-foreground" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Questions;
