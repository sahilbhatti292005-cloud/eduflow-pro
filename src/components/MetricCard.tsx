import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  iconColor?: string;
  iconBg?: string;
}

const MetricCard = ({ icon: Icon, value, label, iconColor = "text-primary", iconBg = "bg-primary/10" }: MetricCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-5 card-shadow hover:card-shadow-hover transition-shadow duration-200 border border-border/50">
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
};

export default MetricCard;
