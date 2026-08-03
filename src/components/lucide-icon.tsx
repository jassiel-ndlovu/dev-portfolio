import {
  Braces,
  Smartphone,
  Database,
  Triangle,
  Cloud,
  Network,
  Radio,
  BarChart3,
  Boxes,
  Sigma,
  Puzzle,
  Users,
  MessagesSquare,
  Lightbulb,
  Palette,
  Repeat,
  Handshake,
  Clock,
  Music,
  BookOpen,
  Code,
  type LucideIcon as LucideIconType,
} from "lucide-react";

const map: Record<string, LucideIconType> = {
  Braces,
  Smartphone,
  Database,
  Triangle,
  Cloud,
  Network,
  Radio,
  BarChart3,
  Boxes,
  Sigma,
  Puzzle,
  Users,
  MessagesSquare,
  Lightbulb,
  Palette,
  Repeat,
  Handshake,
  Clock,
  Music,
  BookOpen,
};

export function LucideIcon({
  name,
  className,
  size = 20,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Icon = map[name] ?? Code;
  return <Icon className={className} size={size} aria-hidden="true" />;
}
