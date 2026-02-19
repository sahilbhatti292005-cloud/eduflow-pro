import { useState } from "react";
import { Search, Edit2, Trash2, Mail, Phone, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";

const studentsData = [
  { id: 1, name: "Arun Kumar", email: "arun@email.com", phone: "+91 98765 43210", courses: ["Full Stack Development"] },
  { id: 2, name: "Priya Sharma", email: "priya@email.com", phone: "+91 87654 32109", courses: ["Data Science & Analytics"] },
  { id: 3, name: "Rahul Singh", email: "rahul@email.com", phone: "+91 76543 21098", courses: ["Full Stack Development", "Cloud Computing"] },
  { id: 4, name: "Sneha Patel", email: "sneha@email.com", phone: "+91 65432 10987", courses: ["UI/UX Design"] },
  { id: 5, name: "Vikram Reddy", email: "vikram@email.com", phone: "+91 54321 09876", courses: ["Full Stack Development"] },
  { id: 6, name: "Anjali Gupta", email: "anjali@email.com", phone: "+91 43210 98765", courses: ["Data Science & Analytics", "Cloud Computing"] },
];

const Students = () => {
  const [search, setSearch] = useState("");
  const filtered = studentsData.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Students</h1>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search students..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((student) => (
          <div key={student.id} className="bg-card rounded-2xl p-5 card-shadow hover:card-shadow-hover transition-shadow duration-200 border border-border/50">
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {student.name.charAt(0)}
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 rounded-lg hover:bg-accent transition-colors"><Edit2 className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
              </div>
            </div>
            <h3 className="font-semibold text-foreground">{student.name}</h3>
            <div className="space-y-1 mt-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {student.email}</p>
              <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {student.phone}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><BookOpen className="w-3.5 h-3.5" /> {student.courses.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
