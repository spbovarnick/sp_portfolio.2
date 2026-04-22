"use client";

import { LandingPortfolioQueryResult } from "@/sanity/types"

import { useRef } from "react";

import Row from "./Row"
import Nav from "./Nav";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface ProjectProps {
  portfolio: LandingPortfolioQueryResult
}

const Homepage: React.FC<ProjectProps> = ({ portfolio }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = scrollRef.current;
    if (!container) return;

    const sections = gsap.utils.toArray<HTMLElement>(".row");
    if (sections.length < 2) {
      return;
    }

    sections.forEach((section, i) => {
      if (i === 0) {
        gsap.fromTo(section,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 }
        );
        return;
      }

      gsap.fromTo(section,
        { opacity: 0 },
        {
          opacity: 1,
          duration: .6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            scroller: container,
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(rafId);

  }, {
    scope: scrollRef,
    dependencies: [portfolio.length],
    revertOnUpdate: true,
  });



  return (
    <div
      ref={scrollRef}
      className="relative w-screen h-screen overflow-y-scroll"
    >
      <Nav
        page={"home"}
      />
      {portfolio.map((proj, index) => (
        <Row
          key={`${proj._id}-${index}`}
          project={proj}
        />
      ))}
    </div>
  )
}

export default Homepage;