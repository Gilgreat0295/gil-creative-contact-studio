import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ProjectCard } from '@/components/project-card';
import { ContactForm } from '@/components/contact-form';
import { MotionProvider } from '@/components/motion-provider';
import { projects, publishedCategories, services, showreel } from '@/content/site';

export default function Home() {
  const featured = projects.filter((project) => project.featured);
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <section className="hero">
          <p className="eyebrow">Independent creative practice · Port Harcourt, Nigeria</p>
          <h1><span className="hero-line">Design with a</span><span className="hero-line hero-muted">point of view.</span></h1>
          <div className="hero-bottom">
            <p>I build visual identities, design campaigns and digital experiences, and bring ideas to life through motion and video.</p>
            <div className="actions">
              <Link className="button button-accent" href="/work">View work <span aria-hidden="true">↗</span></Link>
              <Link className="button" href="#contact">Start a project <span aria-hidden="true">↓</span></Link>
            </div>
          </div>
          <p className="location-line">Based in Port Harcourt, Nigeria. Available for remote projects.</p>
        </section>

        <section className="reel-shell signature-media" aria-label="Showreel">
          {showreel.src ? (
            <video className="showreel-video" controls preload="metadata" poster={showreel.poster || undefined}>
              <source src={showreel.src} />
              Your browser does not support video playback.
            </video>
          ) : (
            <div className="reel-cover">
              <span>Showreel</span><p>Reel media is ready to add</p><strong>Gil / 001</strong>
            </div>
          )}
        </section>

        <section className="selected" aria-labelledby="selected-title">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2 id="selected-title">A few things<br />I’ve made lately.</h2>
          </div>
          <div className="project-grid">
            {featured.map((project, index) => (
              <ProjectCard project={project} index={projects.indexOf(project)} className={`project-${index + 1}`} key={project.slug} />
            ))}
          </div>
          <div className="section-action"><Link className="text-link" href="/work">View all work <span aria-hidden="true">↗</span></Link></div>
        </section>

        <section className="services" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">Capabilities</p>
            <div><h2 id="services-title">Services for ideas<br />that need a clear voice.</h2><p className="section-copy">Seven ways I can help—from the first mark to the final frame.</p></div>
          </div>
          <div className="service-list">
            {services.map((service, index) => {
              const hasWork = publishedCategories.some((category) => category.slug === service.category);
              const href = hasWork ? `/work?category=${service.category}` : `/?service=${encodeURIComponent(service.name)}#contact`;
              return (
                <Link className="service-row" href={href} key={service.name} data-reveal>
                  <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <span className="service-arrow" aria-hidden="true">{hasWork ? '↗' : '+'}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <div className="about-copy">
            <p className="eyebrow">About</p>
            <h2 id="about-title">Independent by design.<br />Collaborative by nature.</h2>
            <p>I’m Gilbert Gospel Jacob, the designer behind Gil Creative Co. I work across branding, campaigns, motion and digital design.</p>
            <p>My work ranges from visual campaigns for restaurants and delivery brands to websites and creative communications for businesses in marine technology and other industries. I’m based in Port Harcourt and available for remote projects.</p>
          </div>
          <div className="portrait-placeholder" data-reveal>
            <span>Portrait</span><strong>G/G</strong><p>Space reserved for Gilbert’s portrait</p>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <ContactForm />
        </section>
      </main>
      <SiteFooter />
      <MotionProvider />
    </>
  );
}
