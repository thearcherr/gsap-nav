"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Menu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<null | gsap.core.Timeline>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    tl.current = gsap.timeline({ paused: true });

    tl.current.fromTo(
      overlayRef.current,
      {
        clipPath: "inset(0 0 100% 0)", 
      },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        ease: "power3.inOut",
        willChange: "clip-path",
      }
    );

    tl.current.from(
      ".links-div span",
      {
        duration: 0.5,
        ease: "power3.out",
        y: 20,
        opacity: 0,
        stagger: 0.1,
        willChange: "transform, opacity",
      },
      "-=0.4"
    );

    // --- The big X ---
    tl.current.to(
      ".just-x",
      {
        duration: 0.5,
        ease: "power3.out",
        x: 0,
        opacity: 1,
        willChange: "transform, opacity",
      },
      "-=0.35"
    );

    tl.current.reverse();
  }, []);

  useEffect(() => {
    if (!tl.current) return;
    isOpen ? tl.current.play() : tl.current.reverse();
  }, [isOpen]);

  return (
    <div className="bg-black relative">
      <span onClick={() => setIsOpen(true)}>
        {!isOpen && (
          <h1 className="text-white orbitron absolute right-10 top-10 cursor-pointer z-50">
            Menu
          </h1>
        )}
      </span>

      <div
        ref={overlayRef}
        style={{
          clipPath: "inset(0 0 100% 0)", // Set initial state
        }}
        className={`h-screen w-screen absolute top-0 z-40 bg-[#c6fb46] will-change-auto ${
          !isOpen ? "pointer-events-none" : ""
        }`}
      >
        <span onClick={() => setIsOpen(false)}>
          <h1 className="text-black orbitron absolute right-10 top-10 cursor-pointer">
            Close
          </h1>
        </span>

        <div className="flex flex-row h-screen links-div">
          <div className="flex flex-col justify-center items-center mx-auto">
            <span><Link onClick={() => setIsOpen(false)} href={'/'} className="md:text-7xl text-3xl orbitron text-black">
              Home<sup>(01)</sup>
            </Link></span>
            <span><Link onClick={() => setIsOpen(false)} href={'/'} className="md:text-7xl text-3xl orbitron text-black">
              Work<sup>(02)</sup>
            </Link></span>
            <span><Link onClick={() => setIsOpen(false)} href={'/'} className="md:text-7xl text-3xl orbitron text-black">
              About<sup>(03)</sup>
            </Link></span>
            <span><Link onClick={() => setIsOpen(false)} href={'/'} className="md:text-7xl text-3xl orbitron text-black">
              Lab<sup>(04)</sup>
            </Link></span>
          </div>

          <div className="flex justify-center items-center">
            <h1 style={{transform: "translateX(100px)", opacity: 0}} className="text-9xl orbitron text-black mx-15 just-x">
              X
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

