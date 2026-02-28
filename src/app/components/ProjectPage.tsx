"use client";

import { ProjectQueryResult } from "@/sanity/types";
import ProjectPageNav from "./ProjectPageNav";
import ProjectPageGallery from "./ProjectPageGallery";
import { AllImageArray } from "../lib/types";

import { useRef, useEffect, useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


interface ProjectPageProps {
  project: ProjectQueryResult;
}

type GroupType = "full" | "half";

export interface ImageGroup {
  type: GroupType;
  images: AllImageArray[];
};

function buildGroups(images: AllImageArray[]): ImageGroup[] {
  const groups: ImageGroup[] = [];
  let i = 0;
  let groupIdx = 0;

  while (i < images.length) {
    const type: GroupType = groupIdx % 2 === 0 ? "full" : "half"
    const count = type === "full" ? 1 : 2;
    const slice = images.slice(i, i + count);

    if (slice.length > 0) {
      groups.push({ type, images: slice });
    }

    i += count;
    groupIdx++;
  }

  return groups;
}

export default function ProjectPage({project}: ProjectPageProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [navHeight, setNavHeight] = useState(0);

  const groups = buildGroups(project?.photos ?? []);

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

    const sections = gsap.utils.toArray<HTMLDivElement>(".row", container);
    if (sections.length < 2) {
      return;
    };

    ScrollTrigger.defaults({ scroller: container });

    ScrollTrigger.getAll().forEach(t => t.kill());

    sections.forEach((section, i) => {
      if (i === 0) {
        gsap.set(section, { opacity: 1 });
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
      start: "bottom bottom",

      end: () => container.scrollHeight - container.clientHeight,

      snap: {
        snapTo: 1 / (sections.length - 1),
        duration: .5,
        ease: "power3.out",
        delay: .3,
        directional: true,
      },

      invalidateOnRefresh: true,
    });

    ScrollTrigger.refresh();
  }, {
    scope: scrollRef,
    dependencies: [groups]
  })

  return (
    <div
      ref={scrollRef}
      className="relative w-screen h-screen overflow-y-scroll"
      style={{ "--nav-h": `${navHeight}px`} as React.CSSProperties }
    >
      <ProjectPageNav
        projectName={project?.projectName ?? ""}
        location={project?.projectLocation ?? ""}
        projectType={project?.projectType ?? null}
        photoCredit={project?.photoCredit ?? null}
        ref={navRef}
      />
      {project?.photos &&
        <ProjectPageGallery
          groups={groups}
          projectName={project.projectName ?? null}
          firstRowHeight={`calc(100vh - ${navHeight}px)`}
        />
      }
    </div>
  )
}