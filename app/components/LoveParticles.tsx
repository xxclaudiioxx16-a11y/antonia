"use client";

import { Heart, Sparkles } from "lucide-react";
import { useMemo } from "react";

export default function LoveParticles() {
  const items = useMemo(
    () =>
      Array.from({ length: 38 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 10 + 9,
        size: Math.random() * 18 + 10,
        type: Math.random() > 0.5 ? "heart" : "spark",
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((item) => {
        const Icon = item.type === "heart" ? Heart : Sparkles;

        return (
          <Icon
            key={item.id}
            className="absolute text-rose-200/20"
            style={{
              left: `${item.left}%`,
              bottom: "-50px",
              width: `${item.size}px`,
              height: `${item.size}px`,
              animation: `floatUp ${item.duration}s linear infinite`,
              animationDelay: `${item.delay}s`,
            }}
          />
        );
      })}

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(.7);
            opacity: 0;
          }
          15% {
            opacity: .75;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}