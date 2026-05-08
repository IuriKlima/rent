import { jsxs, jsx } from "react/jsx-runtime";
import { Bike, Dumbbell, Activity, Footprints } from "lucide-react";
import { c as cn } from "./router-dGa2FNW3.js";
const ICONS = {
  evo: Dumbbell,
  select: Activity,
  "peso-livre": Dumbbell,
  cardio: Bike
};
const ALT_ICONS = {
  evo: Activity,
  select: Footprints,
  "peso-livre": Footprints,
  cardio: Footprints
};
function ProductPlaceholder({
  category,
  className,
  variant = "primary",
  iconSize = 96
}) {
  const IconMap = variant === "primary" ? ICONS : ALT_ICONS;
  const Icon = IconMap[category] || Dumbbell;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-secondary via-secondary to-black",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/30 blur-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 opacity-[0.07]",
            style: {
              backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Icon,
          {
            size: iconSize,
            strokeWidth: 1.25,
            className: "relative z-10 text-white/85"
          }
        )
      ]
    }
  );
}
export {
  ProductPlaceholder as P
};
