"use client";

import { useEffect, useRef, useState } from "react";

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);

      if (!active) setActive(true);
    };

    // pointermove covers mouse/trackpad; works best on desktop
    window.addEventListener("pointermove", move, { passive: true });

    return () => window.removeEventListener("pointermove", move);
  }, [active]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        // IMPORTANT: no background at all until first move (prevents “bg glow”)
        background: active
          ? "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.12), transparent 55%)"
          : "none",
      }}
    />
  );
}
