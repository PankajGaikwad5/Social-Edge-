import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Endless right-to-left drift over a track holding two identical rows.
// Scrolling nudges it faster; hovering the track eases it to a stop so cards can be read.
export function leftwardMarquee(track, { trigger, duration }) {
  const loop = gsap.fromTo(
    track,
    { xPercent: 0 },
    { xPercent: -50, duration, ease: "none", repeat: -1 }
  );
  let hovered = false;

  const settle = () =>
    gsap.to(loop, { timeScale: hovered ? 0 : 1, duration: 0.9, ease: "power2.out", overwrite: true });

  ScrollTrigger.create({
    trigger,
    start: "top bottom",
    end: "bottom top",
    onUpdate(self) {
      if (hovered) return;
      const boost = gsap.utils.clamp(1, 4, 1 + Math.abs(self.getVelocity()) / 400);
      gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true, onComplete: settle });
    },
  });

  const onEnter = () => {
    hovered = true;
    settle();
  };
  const onLeave = () => {
    hovered = false;
    settle();
  };

  track.addEventListener("mouseenter", onEnter);
  track.addEventListener("mouseleave", onLeave);

  return () => {
    track.removeEventListener("mouseenter", onEnter);
    track.removeEventListener("mouseleave", onLeave);
  };
}
