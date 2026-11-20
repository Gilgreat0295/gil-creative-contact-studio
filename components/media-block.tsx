export function MediaBlock({ tone, ratio, label, priority = false }: { tone: string; ratio: 'landscape' | 'portrait' | 'wide'; label: string; priority?: boolean }) {
  return (
    <figure className={`media-block media-${ratio} ${tone}`} data-reveal={priority ? undefined : true}>
      <div className="media-inner" aria-label={`${label} placeholder`}>
        <span className="media-mark" aria-hidden="true">{label.slice(0, 2).toUpperCase()}</span>
        <span className="media-status">Asset pending</span>
      </div>
      <figcaption>{label}<span>Replace in content config</span></figcaption>
    </figure>
  );
}
