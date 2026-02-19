import { useState } from "react";
import { ArrowLeft, ArrowRight, Plus, X, Zap, Search, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StepIndicator from "@/components/StepIndicator";
import StatusBadge from "@/components/StatusBadge";

const steps = ["Basic Info", "Questions", "Settings", "Publish"];

const questionPool = [
  { id: 1, text: "What is the difference between let and var in JavaScript?", difficulty: "Easy", marks: 2 },
  { id: 2, text: "Explain the concept of closures in JavaScript.", difficulty: "Medium", marks: 5 },
  { id: 3, text: "What is the virtual DOM in React?", difficulty: "Medium", marks: 5 },
  { id: 4, text: "Describe RESTful API principles.", difficulty: "Hard", marks: 10 },
  { id: 5, text: "What are React hooks?", difficulty: "Easy", marks: 2 },
  { id: 6, text: "Explain event delegation in JavaScript.", difficulty: "Medium", marks: 5 },
  { id: 7, text: "What is the purpose of useEffect?", difficulty: "Easy", marks: 2 },
  { id: 8, text: "Describe the MVC architecture pattern.", difficulty: "Hard", marks: 10 },
];

const difficultyVariant = (d: string) => d === "Easy" ? "active" : d === "Medium" ? "upcoming" : "draft";

const CreateExam = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [questionMode, setQuestionMode] = useState<"manual" | "auto">("manual");
  const [search, setSearch] = useState("");
  const [publishMode, setPublishMode] = useState<"draft" | "schedule" | "now">("draft");

  // Auto generate state
  const [easy, setEasy] = useState(5);
  const [medium, setMedium] = useState(3);
  const [hard, setHard] = useState(2);

  const toggleQuestion = (id: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const totalMarks = selectedQuestions.reduce((sum, id) => {
    const q = questionPool.find((q) => q.id === id);
    return sum + (q?.marks || 0);
  }, 0);

  const filteredQuestions = questionPool.filter((q) =>
    q.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/exams" className="p-2 rounded-lg hover:bg-accent transition-colors">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="text-2xl font-bold text-foreground">Create Exam</h1>
      </div>

      <StepIndicator steps={steps} currentStep={currentStep} />

      <div className="bg-card rounded-2xl p-6 border border-border/50 card-shadow">
        {/* STEP 1 - Basic Info */}
        {currentStep === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Exam Title</Label>
                <Input placeholder="e.g., JavaScript Fundamentals" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Brief description of the exam..." rows={3} />
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
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Batch</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Choose a batch" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fsd-a">FSD Batch A - 2024</SelectItem>
                    <SelectItem value="ds-b">DS Batch B - 2024</SelectItem>
                    <SelectItem value="ux-a">UX Batch A - 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Duration (minutes)</Label>
                  <Input type="number" placeholder="60" />
                </div>
                <div className="space-y-2">
                  <Label>Passing Marks</Label>
                  <Input type="number" placeholder="40" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Exam Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="practice">Practice</SelectItem>
                    <SelectItem value="final">Final</SelectItem>
                    <SelectItem value="mock">Mock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 - Questions */}
        {currentStep === 1 && (
          <div className="space-y-5">
            {/* Toggle */}
            <div className="flex gap-2 p-1 bg-muted rounded-xl w-fit">
              <button
                onClick={() => setQuestionMode("manual")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  questionMode === "manual" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                Manual
              </button>
              <button
                onClick={() => setQuestionMode("auto")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  questionMode === "auto" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                <Zap className="w-4 h-4 inline mr-1" />
                Auto Generate
              </button>
            </div>

            {questionMode === "manual" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left - Question Pool */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Question Pool</h4>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search questions..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
                  </div>
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {filteredQuestions.map((q) => {
                      const isSelected = selectedQuestions.includes(q.id);
                      return (
                        <div
                          key={q.id}
                          className={`p-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/30"
                          }`}
                          onClick={() => toggleQuestion(q.id)}
                        >
                          <div className="flex items-start justify-between">
                            <p className="text-sm text-foreground flex-1 pr-2">{q.text}</p>
                            {isSelected ? (
                              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                <Check className="w-3.5 h-3.5 text-primary-foreground" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full border-2 border-border flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <StatusBadge status={q.difficulty} variant={difficultyVariant(q.difficulty)} />
                            <span className="text-xs text-muted-foreground">{q.marks} marks</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right - Selected Questions */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-foreground">Selected Questions</h4>
                    <div className="flex gap-3 text-sm">
                      <span className="text-muted-foreground">{selectedQuestions.length} questions</span>
                      <span className="font-semibold text-primary">{totalMarks} marks</span>
                    </div>
                  </div>
                  {selectedQuestions.length === 0 ? (
                    <div className="h-40 flex items-center justify-center bg-muted/30 rounded-xl border border-dashed border-border">
                      <p className="text-sm text-muted-foreground">Select questions from the pool</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                      {selectedQuestions.map((id) => {
                        const q = questionPool.find((q) => q.id === id)!;
                        return (
                          <div key={id} className="p-3 rounded-xl border border-border/50 bg-muted/20 flex items-start justify-between">
                            <div>
                              <p className="text-sm text-foreground">{q.text}</p>
                              <div className="flex gap-2 mt-1">
                                <StatusBadge status={q.difficulty} variant={difficultyVariant(q.difficulty)} />
                                <span className="text-xs text-muted-foreground">{q.marks} marks</span>
                              </div>
                            </div>
                            <button onClick={() => toggleQuestion(id)} className="p-1 hover:bg-destructive/10 rounded-lg transition-colors">
                              <X className="w-4 h-4 text-destructive" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Auto Generate Mode */
              <div className="max-w-md space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Easy</Label>
                    <Input type="number" value={easy} onChange={(e) => setEasy(+e.target.value)} min={0} />
                  </div>
                  <div className="space-y-2">
                    <Label>Medium</Label>
                    <Input type="number" value={medium} onChange={(e) => setMedium(+e.target.value)} min={0} />
                  </div>
                  <div className="space-y-2">
                    <Label>Hard</Label>
                    <Input type="number" value={hard} onChange={(e) => setHard(+e.target.value)} min={0} />
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl border border-border/50 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Questions:</span>
                    <span className="font-semibold text-foreground">{easy + medium + hard}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Marks:</span>
                    <span className="font-semibold text-primary">{easy * 2 + medium * 5 + hard * 10}</span>
                  </div>
                </div>
                <Button className="w-full"><Zap className="w-4 h-4 mr-2" /> Generate Preview</Button>
              </div>
            )}
          </div>
        )}

        {/* STEP 3 - Settings */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Behavior */}
            <div className="bg-muted/20 rounded-xl p-5 border border-border/50 space-y-4">
              <h4 className="font-semibold text-foreground">Behavior</h4>
              <div className="space-y-3">
                {["Shuffle Questions", "Shuffle Options", "Allow Multiple Attempts", "Show Result Immediately", "Enable Review Before Submit"].map((label) => (
                  <div key={label} className="flex items-center justify-between">
                    <Label className="text-sm">{label}</Label>
                    <Switch />
                  </div>
                ))}
              </div>
            </div>

            {/* Scoring */}
            <div className="bg-muted/20 rounded-xl p-5 border border-border/50 space-y-4">
              <h4 className="font-semibold text-foreground">Scoring</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Negative Marking</Label>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Negative Mark Value</Label>
                  <Input type="number" placeholder="0.25" />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Auto Submit on Time Over</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Show Correct Answers After</Label>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-muted/20 rounded-xl p-5 border border-border/50 space-y-4">
              <h4 className="font-semibold text-foreground">Security</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Full Screen Mode</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Prevent Tab Switch</Label>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Access Code</Label>
                  <Input placeholder="Optional code" />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Restrict Attempt Time</Label>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 - Publish */}
        {currentStep === 3 && (
          <div className="max-w-lg mx-auto space-y-6">
            <div className="space-y-3">
              {[
                { value: "draft", label: "Save as Draft", desc: "Save and publish later" },
                { value: "schedule", label: "Schedule", desc: "Set start and end dates" },
                { value: "now", label: "Publish Now", desc: "Make available immediately" },
              ].map((option) => (
                <div
                  key={option.value}
                  onClick={() => setPublishMode(option.value as any)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    publishMode === option.value ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      publishMode === option.value ? "border-primary" : "border-muted-foreground"
                    }`}>
                      {publishMode === option.value && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {publishMode === "schedule" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="datetime-local" />
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Status Preview:</span>
              <StatusBadge
                status={publishMode === "draft" ? "Draft" : publishMode === "schedule" ? "Scheduled" : "Active"}
                variant={publishMode === "draft" ? "draft" : publishMode === "schedule" ? "upcoming" : "active"}
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}>
            Next <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button>
            <Check className="w-4 h-4 mr-2" /> Create Exam
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateExam;
