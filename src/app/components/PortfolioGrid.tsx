"use client";

import { PortfolioQueryResult } from "@/sanity/types";
import PortfolioGridTile from "./PortfolioGridTile";
import PortfolioGridNav from "./PortfolioGridNav";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface PortfolioPageProps {
  portfolio: PortfolioQueryResult
}

const PortfolioGrid: React.FC<PortfolioPageProps> = ({ portfolio }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const rO = new ResizeObserver(() => setNavHeight(nav.offsetHeight));

    rO.observe(nav);
    return () => rO.disconnect();
  }, []);

  useGSAP(() => {
    const container = scrollRef.current;
    if (!container) return;

    ScrollTrigger.create({
      scroller: container,
      start: "top top",
      end: () => container.scrollHeight - container.clientHeight,
      onUpdate: (self) => {
        const nav = navRef.current;
        if (!nav) return;

        if (self.progress < 0.01) {
          nav.style.transform = "translateY(0)";
          return;
        }

        if (self.direction === 1) {
          nav.style.transform = "translateY(-100%)";
        } else if (self.direction === -1) {
          nav.style.transform = "translateY(0)";
        }
      }
    });

    ScrollTrigger.refresh();
  }, {
    scope: scrollRef,
    dependencies: [portfolio]
  });

  return (
    <div
      ref={scrollRef}
      className="relative w-full h-screen overflow-y-scroll pb-12"
    >
      <PortfolioGridNav ref={navRef} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8" style={{ paddingTop: `calc(var(--nav-h) + 2.5rem)` }}>
        {portfolio && portfolio.map((proj) => (
          <PortfolioGridTile
            key={proj._id}
            project={proj}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioGrid;
