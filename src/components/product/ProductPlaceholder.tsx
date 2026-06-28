import { Activity, Bike, Dumbbell, Footprints, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  evo: Dumbbell,
  select: Activity,
  "peso-livre": Dumbbell,
  cardio: Bike,
};

// Ícone alternativo para variar dentro de uma mesma categoria
const ALT_ICONS: Record<string, LucideIcon> = {
  evo: Activity,
  select: Footprints,
  "peso-livre": Footprints,
  cardio: Footprints,
};

type Props = {
  category: string;
  className?: string;
  variant?: "primary" | "alt";
  iconSize?: number;
};

export function ProductPlaceholder({
  category,
  className,
  variant = "primary",
  iconSize = 96,
}: Props) {
  const IconMap = variant === "primary" ? ICONS : ALT_ICONS;
  const Icon = IconMap[category] || Dumbbell; // Fallback to Dumbbell

  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-secondary via-secondary to-black",
        className,
      )}
    >
      {/* Glow laranja sutil */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      {/* Grid decorativo */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <Icon
        size={iconSize}
        strokeWidth={1.25}
        className="relative z-10 text-white/85"
      />
    </div>
  );
}
