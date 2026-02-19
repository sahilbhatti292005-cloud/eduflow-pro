import { useState } from "react";
import { Plus, Search, BookOpen, Users, FileText, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const coursesData = [
  { id: 1, name: "Full Stack Development", description: "Complete web development program covering frontend and backend technologies.", students: 45, exams: 8 },
  { id: 2, name: "Data Science & Analytics", description: "Comprehensive data science program with Python, ML, and statistics.", students: 38, exams: 6 },
  { id: 3, name: "UI/UX Design", description: "Design thinking, wireframing, prototyping and user research.", students: 32, exams: 5 },
  { id: 4, name: "Cloud Computing", description: "AWS, Azure, and GCP cloud architecture and deployment.", students: 28, exams: 4 },
];

const Courses = () => {
  const [search, setSearch] = useState("");
  const filtered = coursesData.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Academic Programs</h1>
        <Button><Plus className="w-4 h-4 mr-2" /> Add Program</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search programs..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((course) => (
          <div key={course.id} className="bg-card rounded-2xl p-5 card-shadow hover:card-shadow-hover transition-shadow duration-200 border border-border/50">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex gap-1">
                <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Edit2 className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
              </div>
            </div>
            <h3 className="font-semibold text-foreground text-lg">{course.name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
            <div className="flex gap-4 mt-4 pt-4 border-t border-border">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><Users className="w-4 h-4" />{course.students} Students</span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground"><FileText className="w-4 h-4" />{course.exams} Exams</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
