import { animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export const usePopulationTween = (target: number) => {
  const mv = useMotionValue(target);
  const display = useTransform(mv, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(mv, target, { duration: 0.8, ease: "easeOut" });
    return () => controls.stop();
  }, [mv, target]);

  return display;
};
