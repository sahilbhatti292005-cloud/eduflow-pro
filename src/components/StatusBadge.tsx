type BadgeVariant = "active" | "completed" | "upcoming" | "draft" | "default";

const variantStyles: Record<BadgeVariant, string> = {
  active: "bg-success/10 text-success",
  completed: "bg-muted text-muted-foreground",
  upcoming: "bg-warning/10 text-warning",
  draft: "bg-primary/10 text-primary",
  default: "bg-muted text-muted-foreground",
};

interface StatusBadgeProps {
  status: string;
  variant?: BadgeVariant;
}

const StatusBadge = ({ status, variant }: StatusBadgeProps) => {
  const v = variant || (status.toLowerCase() as BadgeVariant);
  const style = variantStyles[v] || variantStyles.default;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
