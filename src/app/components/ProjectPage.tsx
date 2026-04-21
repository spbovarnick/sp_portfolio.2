"use client";

import { ProjectQueryResult } from "@/sanity/types";
import ProjectPageGallery from "./ProjectPageGallery";
import { AllImageArray } from "../lib/types";

import { useRef, useEffect, useSyncExternalStore } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Nav from "./Nav";
gsap.registerPlugin(ScrollTrigger);


interface ProjectPageProps {
  project: ProjectQueryResult;
}

type GroupType = "full" | "half";

export interface ImageGroup {
  type: GroupType;
  images: AllImageArray[];
};

interface PhotoCred {
  photogName?: string;
  photogUrl?: string;
  _key: string;
}


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

const useScreenWidth = () => {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => window.innerWidth,
    () => 1024
  );
}

export default function ProjectPage({project}: ProjectPageProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const windowWidth = useScreenWidth();

  const isMobile = windowWidth < 768

  const groups = buildGroups(project?.photos ?? []);

  useGSAP(() => {
    const container = scrollRef.current;
    if (!container) return;



    const sections = gsap.utils.toArray<HTMLDivElement>(".row", container);
    if (sections.length < 2) {
      return;
    };

    ScrollTrigger.defaults({ scroller: container });

    sections.forEach((section, i) => {
      if (i === 0) return;
      if (section.dataset.animated) return;

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
    })

    ScrollTrigger.refresh();
  }, {
    scope: scrollRef,
    dependencies: [groups]
  })

  const photoCreditsElement = (creditList: PhotoCred[]) => {
    return (
      <div
        className=""
      >
        PHOTO{creditList.length > 1 ? "S" : ""} BY {
          creditList.map((cred, i) => {
            return (
              cred.photogUrl ? (
                <span key={cred._key}>{i > 0 && <span> & </span>}<a className="folioPicCred" href={cred.photogUrl} target="_blank">{cred.photogName}</a></span>) : (<span key={cred._key}>{i > 0 && <span> & </span>}<span className="folioPicCred" key={cred._key}>{cred.photogName}</span></span>
              )
            )
          })
        }
      </div>
    )
  }

  return (
    <div
      ref={scrollRef}
      className="relative w-full h-screen overflow-y-scroll relative"
    >
      <Nav
        page="project"
        ref={navRef}
      />
      {project?.photos &&
        <ProjectPageGallery
          isMobile={isMobile}
          groups={groups}
          projectName={project.projectName ?? null}
        />
      }
      <div className="text-white z-[100] uppercase px-6 md:px-10 fixed bottom-6 md:bottom-10">
        {project?.projectName &&
          <p>{project?.projectName}</p>
        }
        {project?.projectLocation &&
          <p>{project?.projectLocation}</p>
        }
        {project?.projectType &&
          <p>{project?.projectType}</p>
        }
        {project?.photoCredit &&
          photoCreditsElement(project?.photoCredit)
        }
      </div>
    </div>
  )
}