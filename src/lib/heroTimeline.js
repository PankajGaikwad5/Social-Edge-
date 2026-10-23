// Scroll timeline for the pinned hero, as fractions of its scroll progress (0 → 1).
// The section is ~4.45 screens of scroll; comments give each step in screens.
export const TIMELINE = {
  // Copy fades out to the left; dimmed columns come up to full strength (0 → 1.15)
  copyOut: [0, 0.258],
  // Point where the inset wall springs out to full width
  wallPop: 0.081,
  // The centre column eases its film tile to the vertical centre and holds it there (1.87 → 3.02)
  settle: [0.42, 0.679],
  // That same tile expands into the full viewport (3.15 → 3.95)
  expand: [0.708, 0.888],
  // Film controls fade in as the film lands full screen (3.85 → 4.15), then a short hold
  controls: [0.865, 0.933],
};

// Once the film fills the viewport the wall is hidden behind it
export const WALL_COVERED = TIMELINE.expand[1];

export const FILM_TILE_SRC = "https://assets.mixkit.co/videos/41165/41165-720.mp4";

export const clamp01 = (v) => Math.min(1, Math.max(0, v));

export const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const phase = (p, [start, end]) => clamp01((p - start) / (end - start));
