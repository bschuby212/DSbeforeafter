import {
  ArrowDown,
  ArrowRight,
  Check,
  Eye,
  MousePointer2,
  Sparkles,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import './styles.css'

type Critique = {
  title: string
  description: string
  label: string
  icon: typeof Eye
  highlight: { x: number; y: number; width: number; height: number }
}

type CritiqueSet = {
  id: string
  eyebrow: string
  title: string
  summary: string
  beforeCaption: string
  afterCaption: string
  beforeSrc: string
  screenAlt: string
  browserLabel: string
  afterPlaceholder: {
    title: string
    description: string
  }
  reverse?: boolean
  critiques: Critique[]
  resolution: {
    title: string
    description: string
    note: string
    notePosition: 'left' | 'right'
  }
}

const critiqueSets: CritiqueSet[] = [
  {
    id: 'homepage',
    eyebrow: 'Screen 01 · Entry point',
    title: 'Outdated System Homepage',
    summary:
      'The homepage acted as the primary entry point, but struggled to surface key resources and guide users effectively.',
    beforeCaption: 'Legacy toolkit homepage',
    afterCaption: 'Redesigned homepage · preview pending',
    beforeSrc: '/vizient/outdated-system-homepage.png',
    screenAlt: 'Legacy Vizient UX/UI Toolkit homepage',
    browserLabel: 'Vizient UX/UI Toolkit & Style Guide',
    afterPlaceholder: {
      title: 'A clearer starting point is next.',
      description: 'The redesigned homepage will be added here when the final screen is ready.',
    },
    resolution: {
      title: 'A clearer entry point.',
      description:
        'The redesign direction prioritizes key resources, clearer paths, and faster orientation.',
      note: 'Stronger hierarchy · clearer paths · less cognitive load',
      notePosition: 'right',
    },
    critiques: [
      {
        label: 'Visual hierarchy',
        title: 'Weak visual hierarchy',
        description:
          'Important content and actions compete for attention, making the page difficult to scan.',
        icon: Eye,
        highlight: { x: 19, y: 24, width: 63, height: 31 },
      },
      {
        label: 'Prioritization',
        title: 'Poor content prioritization',
        description:
          'Critical resources, actions, and workflows lack emphasis, reducing efficiency.',
        icon: Sparkles,
        highlight: { x: 23, y: 37, width: 53, height: 19 },
      },
      {
        label: 'Cognitive load',
        title: 'High cognitive load',
        description:
          'Dense content and minimal prioritization force users to process too much information at once.',
        icon: MousePointer2,
        highlight: { x: 20, y: 58, width: 61, height: 23 },
      },
    ],
  },
  {
    id: 'component-library',
    eyebrow: 'Screen 02 · Discovery',
    title: 'Fragmented Component Library',
    summary:
      'As the library expanded, inconsistent organization made components harder to discover and compare.',
    beforeCaption: 'Legacy component library',
    afterCaption: 'Redesigned library · preview pending',
    beforeSrc: '/vizient/fragmented-component-library.png',
    screenAlt: 'Legacy Vizient component library index',
    browserLabel: 'Vizient Design System',
    afterPlaceholder: {
      title: 'A more navigable library is next.',
      description: 'The redesigned component library will be added here when the final screen is ready.',
    },
    reverse: true,
    resolution: {
      title: 'A library built for discovery.',
      description:
        'The redesign direction introduces stronger grouping, visible context, and faster component discovery.',
      note: 'Clear groups · visible context · faster discovery',
      notePosition: 'left',
    },
    critiques: [
      {
        label: 'Information density',
        title: 'Information overload',
        description:
          'Large component lists create a cluttered experience that is difficult to scan and navigate.',
        icon: Eye,
        highlight: { x: 14, y: 28, width: 72, height: 59 },
      },
      {
        label: 'Wayfinding',
        title: 'Limited guidance and feedback',
        description:
          'Interaction states, active context, and user progress are not clearly communicated.',
        icon: MousePointer2,
        highlight: { x: 68, y: 14, width: 19, height: 21 },
      },
      {
        label: 'Visual structure',
        title: 'Weak visual structure',
        description:
          'Inconsistent emphasis and static layouts make important information harder to find.',
        icon: Check,
        highlight: { x: 19, y: 31, width: 64, height: 52 },
      },
    ],
  },
  {
    id: 'component-documentation',
    eyebrow: 'Screen 03 · Guidance',
    title: 'Shallow Component Documentation',
    summary:
      'Component pages provided examples and specifications, but offered limited guidance on usage, behavior, and best practices.',
    beforeCaption: 'Legacy component documentation',
    afterCaption: 'Redesigned documentation · preview pending',
    beforeSrc: '/vizient/shallow-component-documentation.png',
    screenAlt: 'Legacy Vizient Button component documentation',
    browserLabel: 'Vizient UX/UI Toolkit & Style Guide',
    afterPlaceholder: {
      title: 'Deeper documentation is next.',
      description: 'The redesigned component documentation will be added here when the final screen is ready.',
    },
    resolution: {
      title: 'Guidance that supports decisions.',
      description:
        'The redesign direction makes component relationships, recommendations, and navigation easier to understand.',
      note: 'Clear structure · practical guidance · efficient navigation',
      notePosition: 'right',
    },
    critiques: [
      {
        label: 'Organization',
        title: 'Disorganized structure',
        description:
          'Components are grouped inconsistently, making variations and relationships difficult to understand.',
        icon: Sparkles,
        highlight: { x: 12, y: 22, width: 12, height: 53 },
      },
      {
        label: 'Guidance',
        title: 'Limited guidance and feedback',
        description:
          'Basic examples are provided, but clear usage recommendations and best practices are missing.',
        icon: Eye,
        highlight: { x: 25, y: 29, width: 61, height: 49 },
      },
      {
        label: 'Navigation',
        title: 'Inefficient navigation',
        description:
          'Missing in-page navigation and persistent UI elements make documentation harder to browse.',
        icon: ArrowRight,
        highlight: { x: 12, y: 17, width: 76, height: 62 },
      },
    ],
  },
]

function Screenshot({
  set,
  active,
  mode,
  isResolved,
  onModeChange,
}: {
  set: CritiqueSet
  active: number
  mode: 'before' | 'after'
  isResolved: boolean
  onModeChange: (mode: 'before' | 'after') => void
}) {
  const critique = set.critiques[Math.min(active, set.critiques.length - 1)]
  const region = critique.highlight

  return (
    <div className="visual-wrap">
      <div className="visual-toolbar">
        <div className="view-toggle" aria-label="Screenshot view" role="group">
          {(['before', 'after'] as const).map((view) => (
            <button
              aria-pressed={mode === view}
              className={mode === view ? 'active' : ''}
              key={view}
              onClick={() => onModeChange(view)}
              type="button"
            >
              {view}
            </button>
          ))}
        </div>
        <span aria-live="polite">{mode === 'before' ? set.beforeCaption : set.afterCaption}</span>
      </div>
      <div
        aria-label={`${mode === 'before' ? set.screenAlt : `After redesign placeholder for ${set.title}`}. ${mode === 'before' ? `Current issue: ${critique.title}` : set.afterPlaceholder.description}`}
        className={`screenshot-shell is-${mode}`}
        role="img"
      >
        <div aria-hidden="true">
          <div className="browser-bar">
            <span><i /><i /><i /></span>
            <b>{set.browserLabel}</b>
            <i />
          </div>
          <div className="mockup-viewport vizient-viewport">
            {mode === 'before'
              ? (
                <img
                  alt=""
                  className="vizient-screen"
                  decoding="async"
                  height="672"
                  src={set.beforeSrc}
                  width="1008"
                />
              )
              : (
                <div className="after-placeholder">
                  <span><Sparkles size={16} /> Redesign preview</span>
                  <strong>{set.afterPlaceholder.title}</strong>
                  <p>{set.afterPlaceholder.description}</p>
                  <small>Final redesigned screen coming next</small>
                </div>
              )}
            {mode === 'before' && !isResolved && (
              <>
                <div className="screenshot-dim" />
                <div
                  className="focus-window"
                  key={`${set.id}-${active}`}
                  style={{
                    left: `${region.x}%`,
                    top: `${region.y}%`,
                    width: `${region.width}%`,
                    height: `${region.height}%`,
                  }}
                >
                  <span>{String(active + 1).padStart(2, '0')}</span>
                </div>
              </>
            )}
            {mode === 'after' && isResolved && (
              <div
                className={`resolution-note ${set.resolution.notePosition}`}
                key={`${set.id}-resolution`}
              >
                <span><Check size={11} /> Design direction</span>
                <strong>{set.resolution.note}</strong>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="visual-hint">
        <MousePointer2 size={13} />
        {isResolved && mode === 'after'
          ? 'Redesign direction · final product screen coming next'
          : mode === 'before'
          ? 'Blue marks the current issue · Switch to After to preview the redesign direction'
          : 'Preview shown · Switch to Before to continue the critique'}
      </p>
    </div>
  )
}

function CritiqueList({
  set,
  active,
  onActiveChange,
}: {
  set: CritiqueSet
  active: number
  onActiveChange: (index: number) => void
}) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const elements = itemRefs.current.filter(
      (element): element is HTMLButtonElement => element !== null,
    )
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting)
        if (!activeEntry) return
        const index = elements.indexOf(activeEntry.target as HTMLButtonElement)
        if (index >= 0) onActiveChange(index)
      },
      { rootMargin: '-38% 0px -61% 0px', threshold: 0 },
    )
    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [onActiveChange])

  return (
    <div className="critique-list">
      {set.critiques.map((critique, index) => {
        const Icon = critique.icon
        return (
          <button
            aria-label={`Critique ${index + 1} of ${set.critiques.length}: ${critique.title}`}
            aria-pressed={active === index}
            className={`critique-item ${active === index ? 'active' : ''}`}
            key={critique.title}
            onClick={() => onActiveChange(index)}
            ref={(element) => { itemRefs.current[index] = element }}
            type="button"
          >
            <span className="progress-rail" aria-hidden="true">
              <i>{String(index + 1).padStart(2, '0')}</i>
              <b />
            </span>
            <span className="critique-copy">
              <span className="critique-label"><Icon size={14} />{critique.label}</span>
              <strong>{critique.title}</strong>
              <span className="critique-description">{critique.description}</span>
              <span className="critique-link">View area <ArrowRight size={13} /></span>
            </span>
          </button>
        )
      })}
      <button
        aria-label={`Resolution: ${set.resolution.title}`}
        aria-pressed={active === set.critiques.length}
        className={`critique-item resolution-step ${active === set.critiques.length ? 'active' : ''}`}
        onClick={() => onActiveChange(set.critiques.length)}
        ref={(element) => { itemRefs.current[set.critiques.length] = element }}
        type="button"
      >
        <span className="progress-rail" aria-hidden="true">
          <i><Check size={12} /></i>
        </span>
        <span className="critique-copy">
          <span className="critique-label"><Sparkles size={14} />The resolution</span>
          <strong>{set.resolution.title}</strong>
          <span className="critique-description">{set.resolution.description}</span>
          <span className="critique-link">See why it works <ArrowRight size={13} /></span>
        </span>
      </button>
    </div>
  )
}

function CritiqueSection({ set }: { set: CritiqueSet }) {
  const [active, setActive] = useState(0)
  const [mode, setMode] = useState<'before' | 'after'>('before')
  const handleActiveChange = useCallback((index: number) => {
    setActive(index)
    setMode(index === set.critiques.length ? 'after' : 'before')
  }, [set.critiques.length])
  const isResolved = active === set.critiques.length
  const activeStory = isResolved ? set.resolution : set.critiques[active]

  return (
    <section className={`critique-section ${set.reverse ? 'reverse' : ''}`} id={set.id}>
      <div className="section-heading">
        <p>{set.eyebrow}</p>
        <h2>{set.title}</h2>
        <span>{set.summary}</span>
      </div>
      <div className="critique-layout">
        <div className="sticky-visual">
          <div aria-live="polite" className="mobile-current-critique">
            <span>
              {isResolved
                ? <><Check size={12} /> The resolution</>
                : <>{String(active + 1).padStart(2, '0')} · {set.critiques[active].label}</>}
            </span>
            <strong>{activeStory.title}</strong>
            <p>{activeStory.description}</p>
          </div>
          <Screenshot
            active={active}
            isResolved={isResolved}
            mode={mode}
            onModeChange={setMode}
            set={set}
          />
        </div>
        <CritiqueList set={set} active={active} onActiveChange={handleActiveChange} />
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Return to top">A<span>—</span>M</a>
        <nav aria-label="Primary navigation">
          <a href="#homepage">Work</a>
          <a href="#principles">Approach</a>
          <a className="contact-link" href="mailto:hello@example.com">Let’s talk <ArrowRight size={14} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <p className="hero-kicker"><span />Product critique · Selected work</p>
          <h1>Good design makes the next step feel inevitable.</h1>
          <div className="hero-footer">
            <p>I untangle complex product experiences and turn them into clear, confident moments for the people using them.</p>
            <a href="#homepage">Explore the work <ArrowDown size={15} /></a>
          </div>
          <div className="hero-proof" aria-label="Areas of expertise">
            <span>Product strategy</span><i />
            <span>Interaction design</span><i />
            <span>Design systems</span><i />
            <span>0→1 products</span>
          </div>
        </section>

        {critiqueSets.map((set) => <CritiqueSection key={set.id} set={set} />)}

        <section className="principles" id="principles">
          <p>Working principles</p>
          <div>
            <h2>Clarity is the feature.</h2>
            <span>The best interface is not the one with the fewest elements. It is the one where every element earns its place.</span>
          </div>
          <ol>
            <li><b>01</b><span>Understand the decision before designing the screen.</span></li>
            <li><b>02</b><span>Use hierarchy to make complexity feel manageable.</span></li>
            <li><b>03</b><span>Prototype the behavior, not just the appearance.</span></li>
          </ol>
        </section>
      </main>

      <footer>
        <div><span>Have a complex product problem?</span><a href="mailto:hello@example.com">Let’s make it clear. <ArrowRight size={22} /></a></div>
        <p><span>Senior product designer · San Francisco</span><span>Available for select projects · 2026</span></p>
      </footer>
    </>
  )
}
