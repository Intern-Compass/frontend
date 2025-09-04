import {
  Circle,
  HelpCircle,
  Timer,
} from "lucide-react";

export const statuses = [
  {
    value: "upcoming",
    label: "Upcoming",
    icon: HelpCircle,
  },
  {
    value: "overdue",
    label: "Overdue",
    icon: Circle,
  },
  {
    value: "completed",
    label: "Completed",
    icon: Timer,
  }
];