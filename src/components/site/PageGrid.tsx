/** Subtle full-height column lines behind the page. Decorative only. */
export function PageGrid() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="container-x grid h-full grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`h-full border-l border-line ${i >= 4 ? "hidden lg:block" : ""} ${i === 3 ? "border-r lg:border-r-0" : ""} ${i === 5 ? "lg:border-r" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
