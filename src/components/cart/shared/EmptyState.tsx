import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  message: string;
}

export function EmptyState({ icon: Icon, message }: EmptyStateProps) {
  return (
    <div className="text-center space-y-4">
      <Icon className="h-12 w-12 mx-auto text-muted-foreground" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}