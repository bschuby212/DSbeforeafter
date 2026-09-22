import {
  Check,
  Eye,
  Layers3,
  Route,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import './styles.css'

type Critique = {
  title: string
  description: string
  highlight: { x: number; y: number; width: number; height: number }
}

type CritiqueSet = {
  id: string
  title: string
  summary: string
  beforeSrc: string
  screenAlt: string
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
  }
}

const critiqueSets: CritiqueSet[] = [
  {
    id: 'homepage',
    title: 'Outdated System Homepage',
    summary:
      'The homepage acted as the primary entry point, but struggled to surface key resources and guide users effectively.',
    beforeSrc: '/vizient/outdated-system-homepage.png',
    screenAlt: 'Legacy Vizient UX/UI Toolkit homepage',
    afterPlaceholder: {
      title: 'A clearer starting point is next.',
      description: 'The redesigned homepage will be added here when the final screen is ready.',
    },
    resolution: {
      title: 'A clearer entry point.',
      description:
        'The redesign direction prioritizes key resources, clearer paths, and faster orientation.',
      note: 'Stronger hierarchy · clearer paths · less cognitive load',
    },
    critiques: [
      {
        title: 'Weak visual hierarchy',
        description:
          'Important content and actions compete for attention, making the page difficult to scan.',
        highlight: { x: 19, y: 24, width: 63, height: 31 },
      },
      {
        title: 'Poor content prioritization',
        description:
          'Critical resources, actions, and workflows lack emphasis, reducing efficiency.',
        highlight: { x: 23, y: 37, width: 53, height: 19 },
      },
      {
        title: 'High cognitive load',
        description:
          'Dense content and minimal prioritization force users to process too much information at once.',
        highlight: { x: 20, y: 58, width: 61, height: 23 },
      },
    ],
  },
  {
    id: 'component-library',
    title: 'Fragmented Component Library',
    summary:
      'As the library expanded, inconsistent organization made components harder to discover and compare.',
    beforeSrc: '/vizient/fragmented-component-library.png',
    screenAlt: 'Legacy Vizient component library index',
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
    },
    critiques: [
      {
        title: 'Information overload',
        description:
          'Large component lists create a cluttered experience that is difficult to scan and navigate.',
        highlight: { x: 14, y: 28, width: 72, height: 59 },
      },
      {
        title: 'Limited guidance and feedback',
        description:
          'Interaction states, active context, and user progress are not clearly communicated.',
        highlight: { x: 68, y: 14, width: 19, height: 21 },
      },
      {
        title: 'Weak visual structure',
        description:
          'Inconsistent emphasis and static layouts make important information harder to find.',
        highlight: { x: 19, y: 31, width: 64, height: 52 },
      },
    ],
  },
  {
    id: 'component-documentation',
    title: 'Shallow Component Documentation',
    summary:
      'Component pages provided examples and specifications, but offered limited guidance on usage, behavior, and best practices.',
    beforeSrc: '/vizient/shallow-component-documentation.png',
    screenAlt: 'Legacy Vizient Button component documentation',
    afterPlaceholder: {
      title: 'Deeper documentation is next.',
      description: 'The redesigned component documentation will be added here when the final screen is ready.',
    },
    resolution: {
      title: 'Guidance that supports decisions.',
      description:
        'The redesign direction makes component relationships, recommendations, and navigation easier to understand.',
      note: 'Clear structure · practical guidance · efficient navigation',
    },
    critiques: [
      {
        title: 'Disorganized structure',
        description:
          'Components are grouped inconsistently, making variations and relationships difficult to understand.',
        highlight: { x: 12, y: 22, width: 12, height: 53 },
      },
      {
        title: 'Limited guidance and feedback',
        description:
          'Basic examples are provided, but clear usage recommendations and best practices are missing.',
        highlight: { x: 25, y: 29, width: 61, height: 49 },
      },
      {
        title: 'Inefficient navigation',
        description:
          'Missing in-page navigation and persistent UI elements make documentation harder to browse.',
        highlight: { x: 12, y: 17, width: 76, height: 62 },
      },
    ],
  },
]

const critiqueIcons = [Eye, Layers3, Route]

function Screenshot({
  set,
  active,
  mode,
  isResolved,
}: {
  set: CritiqueSet
  active: number
  mode: 'before' | 'after'
  isResolved: boolean
}) {
  const critique = set.critiques[Math.min(active, set.critiques.length - 1)]
  const region = critique.highlight

  return (
    <div className="visual-wrap">
      <div
        aria-label={`${mode === 'before' ? set.screenAlt : `After redesign placeholder for ${set.title}`}. ${mode === 'before' ? `Current issue: ${critique.title}` : set.afterPlaceholder.description}`}
        className={`screenshot-shell is-${mode}`}
        role="img"
      >
        <div aria-hidden="true">
          <div className="mockup-viewport vizient-viewport">
            {mode === 'before'
              ? (
                <div className="vizient-crop">
                  <img
                    alt=""
                    className="vizient-screen"
                    decoding="async"
                    height="672"
                    src={set.beforeSrc}
                    width="1008"
                  />
                  {!isResolved && (
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
                      />
                    </>
                  )}
                </div>
              )
              : (
                <div className="after-placeholder">
                  <strong>{set.afterPlaceholder.title}</strong>
                  <p>{set.afterPlaceholder.description}</p>
                </div>
              )}
          </div>
        </div>
      </div>
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
        const Icon = critiqueIcons[index]
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
              <i><Icon size={18} strokeWidth={1.7} /></i>
              <b className={active > index ? 'complete' : ''} />
            </span>
            <span className="critique-copy">
              <strong>{critique.title}</strong>
              <span className="critique-description">{critique.description}</span>
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
          <i><Check size={18} strokeWidth={1.7} /></i>
        </span>
        <span className="critique-copy resolution-callout">
          <span className="resolution-kicker">Better with redesign</span>
          <strong>{set.resolution.title}</strong>
          <span className="critique-description">{set.resolution.description}</span>
          <span className="resolution-outcome">{set.resolution.note}</span>
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
        <h2>{set.title}</h2>
        <p>{set.summary}</p>
      </div>
      <div className="critique-layout">
        <div className="sticky-visual">
          <div aria-live="polite" className="mobile-current-critique">
            <strong>{activeStory.title}</strong>
            <p>{activeStory.description}</p>
          </div>
          <Screenshot
            active={active}
            isResolved={isResolved}
            mode={mode}
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
    <main className="case-study-embed">
      {critiqueSets.map((set) => <CritiqueSection key={set.id} set={set} />)}
    </main>
  )
}
