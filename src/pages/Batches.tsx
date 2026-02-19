import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Eye, Users, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/StatusBadge";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const batchesData = [
  { id: 1, name: "FSD Batch A - 2024", course: "Full Stack Development", status: "Active" as const, start: "Jan 15, 2024", end: "Jul 15, 2024", students: 30, exams: 5, progress: 65 },
  { id: 2, name: "DS Batch B - 2024", course: "Data Science & Analytics", status: "Active" as const, start: "Feb 1, 2024", end: "Aug 1, 2024", students: 25, exams: 4, progress: 45 },
  { id: 3, name: "UX Batch A - 2024", course: "UI/UX Design", status: "Upcoming" as const, start: "Mar 1, 2024", end: "Sep 1, 2024", students: 20, exams: 3, progress: 0 },
  { id: 4, name: "Cloud Batch A - 2023", course: "Cloud Computing", status: "Completed" as const, start: "Jun 1, 2023", end: "Dec 1, 2023", students: 28, exams: 6, progress: 100 },
  { id: 5, name: "FSD Batch B - 2024", course: "Full Stack Development", status: "Upcoming" as const, start: "Apr 1, 2024", end: "Oct 1, 2024", students: 0, exams: 0, progress: 0 },
  { id: 6, name: "DS Batch A - 2023", course: "Data Science & Analytics", status: "Completed" as const, start: "Jan 1, 2023", end: "Jul 1, 2023", students: 35, exams: 6, progress: 100 },
];

const Batches = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = batchesData.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Batches</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Create Batch</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Batch</DialogTitle>
            </DialogHeader>
            <div className="space-y-5 pt-2">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Basic Info</h4>
                <div className="space-y-2">
                  <Label>Batch Name</Label>
                  <Input placeholder="e.g., FSD Batch C - 2024" />
                </div>
                <div className="space-y-2">
                  <Label>Select Course</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Choose a course" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fsd">Full Stack Development</SelectItem>
                      <SelectItem value="ds">Data Science & Analytics</SelectItem>
                      <SelectItem value="ux">UI/UX Design</SelectItem>
                      <SelectItem value="cloud">Cloud Computing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Capacity Limit</Label>
                    <Input type="number" placeholder="30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-border">
                <h4 className="text-sm font-semibold text-foreground pt-2">Enrollment Settings</h4>
                <div className="flex items-center justify-between">
                  <Label>Allow Self Enrollment</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Auto Assign Exams</Label>
                  <Switch />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)}>Create Batch</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search batches..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((batch) => (
          <div key={batch.id} className="bg-card rounded-2xl p-5 card-shadow hover:card-shadow-hover transition-shadow duration-200 border border-border/50">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{batch.name}</h3>
                <p className="text-sm text-muted-foreground">{batch.course}</p>
              </div>
              <StatusBadge status={batch.status} />
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground my-3">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {batch.start}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {batch.end}</span>
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {batch.students} Students</span>
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> {batch.exams} Exams</span>
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{batch.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${batch.progress}%` }} />
              </div>
            </div>

            <div className="flex gap-1 mt-4 pt-3 border-t border-border">
              <Link to={`/batches/${batch.id}`} className="p-2 rounded-lg hover:bg-accent transition-colors"><Eye className="w-4 h-4 text-muted-foreground" /></Link>
              <button className="p-2 rounded-lg hover:bg-accent transition-colors"><Edit2 className="w-4 h-4 text-muted-foreground" /></button>
              <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"><Trash2 className="w-4 h-4 text-destructive" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Batches;
