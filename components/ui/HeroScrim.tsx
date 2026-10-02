/**
 * Shared dark scrim for full-bleed photo heroes. Keeps overlaid copy readable and
 * stays identical on every main page so the treatment never drifts. Two layers:
 * a left-to-right gradient for text contrast and a top-to-bottom one for depth.
 */
export default function HeroScrim() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"
      />
    </>
  )
}
