"use client";

import { PortfolioQueryResult } from "@/sanity/types"

import { useState, useRef } from "react";

import { shuffle } from "../lib/util";
import Row from "./Row"
import Nav from "./Nav";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface ProjectProps {
  portfolio: PortfolioQueryResult
}

const Homepage: React.FC<ProjectProps> = ({ portfolio }) => {
  const [projects, setProjects] = useState(portfolio)
  const scrollRef = useRef<HTMLDivElement>(null);

  const addToScroll = () => {
    const appendage = shuffle(portfolio)
    setProjects((prev) => [...prev, ...appendage])
  }

  useGSAP(() => {
    const container = scrollRef.current;
    if (!container) return;

    const sections = gsap.utils.toArray<HTMLElement>(".row");
    if (sections.length < 2) {
      return;
    }

    ScrollTrigger.getAll().forEach(t => t.kill());

    sections.forEach((section, i) => {
      if (i === 0) {
        gsap.set(section, {opacity: 1});
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

    ScrollTrigger.create({
      scroller: container,

      trigger: sections[0],
      start: "top top",

      end: () => container.scrollHeight - container.clientHeight,

      snap: {
        snapTo: 1 / (sections.length - 1),
        duration: 0.5,
        ease: "power3.out",
        delay: .3,
        directional: true,
      },

      invalidateOnRefresh: true,
    });

    ScrollTrigger.refresh();

  }, {
    scope: scrollRef,
    dependencies: [projects.length],
    revertOnUpdate: true,
  });



  return (
    <div
      ref={scrollRef}
      className="relative w-screen h-screen overflow-y-scroll"
    >
      <Nav />
      {projects.map((proj, index) => (
        <Row
          key={`${proj._id}-${index}`}
          project={proj}
          isLast={index === projects.length - 1}
          addToScroll={addToScroll}
          index={index}
        />
      ))}
    </div>
  )
}

export default Homepage;