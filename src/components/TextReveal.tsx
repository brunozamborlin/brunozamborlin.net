import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  /** External scroll progress from parent (0-1) */
  scrollYProgress?: MotionValue<number>;
  /** Range within parent scroll where this paragraph animates [start, end] */
  range?: [number, number];
}

export default function TextReveal({
  children,
  className = "",
  scrollYProgress: externalProgress,
  range = [0, 1]
}: TextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // Use external scroll progress if provided, otherwise track own scroll
  const { scrollYProgress: ownProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.25"]
  });

  const scrollYProgress = externalProgress || ownProgress;
  const [rangeStart, rangeEnd] = range;

  const words = children.split(" ");

  return (
    <p ref={containerRef} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, i) => {
        // Map word index to position within the assigned range
        const wordStart = rangeStart + (i / words.length) * (rangeEnd - rangeStart);
        const wordEnd = rangeStart + ((i + 1) / words.length) * (rangeEnd - rangeStart);

        return (
          <Word key={i} start={wordStart} end={wordEnd} scrollYProgress={scrollYProgress}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

interface WordProps {
  children: string;
  start: number;
  end: number;
  scrollYProgress: MotionValue<number>;
}

function Word({ children, start, end, scrollYProgress }: WordProps) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="transition-colors duration-300">
      {children}
    </motion.span>
  );
}
