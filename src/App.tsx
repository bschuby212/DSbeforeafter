import {
  Check,
  Sparkles,
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
  critiques: Critique[]
  resolution: {
    title: string
    reasons: [string, string]
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
      title: "It's better",
      reasons: [
        'Key resources and actions are easier to find at a glance.',
        'Clearer paths reduce the amount of information users have to parse.',
      ],
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
    resolution: {
      title: "It's better",
      reasons: [
        'Components are grouped with enough context to compare options quickly.',
        'Wayfinding and feedback make discovery feel intentional instead of noisy.',
      ],
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
      title: "It's better",
      reasons: [
        'Structure and recommendations help teams decide how to use a component.',
        'Navigation stays available so documentation is easier to browse in place.',
      ],
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
        aria-label={mode === 'before'
          ? `${set.screenAlt}. Current issue: ${critique.title}`
          : `After redesign preview for ${set.title}`}
        className={`media-panel is-${mode}`}
        role="img"
      >
        <div aria-hidden="true" className="media-panel-inner">
          {mode === 'before'
            ? (
              <div className="media-shot">
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
              <div className="after-placeholder" />
            )}
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
  const activeRef = useRef(active)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const elements = itemRefs.current.filter(
      (element): element is HTMLButtonElement => element !== null,
    )
    if (elements.length === 0) return

    const updateActive = () => {
      if (window.innerHeight < 120) return

      const tops = elements.map((element) => element.getBoundingClientRect().top)
      const uniqueTops = new Set(tops.map((top) => Math.round(top)))
      // Ignore collapsed/jsdom layouts where every item shares one top.
      if (uniqueTops.size === 1 && elements.length > 1) return

      const activationLine = window.innerHeight * 0.36
      let bestIndex = 0
      tops.forEach((top, index) => {
        if (top <= activationLine) bestIndex = index
      })

      if (activeRef.current !== bestIndex) onActiveChange(bestIndex)
    }

    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)

    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [onActiveChange, set.id])

  return (
    <div className="critique-list">
      {set.critiques.map((critique, index) => (
        <button
          aria-label={`Critique ${index + 1} of ${set.critiques.length}: ${critique.title}`}
          aria-pressed={active === index}
          className={`critique-item ${active === index ? 'active' : ''}`}
          key={critique.title}
          onClick={() => onActiveChange(index)}
          ref={(element) => { itemRefs.current[index] = element }}
          type="button"
        >
          <span className="critique-copy">
            <strong>{critique.title}</strong>
            <span className="critique-description">{critique.description}</span>
          </span>
        </button>
      ))}
      <button
        aria-label={`Resolution: ${set.resolution.title}`}
        aria-pressed={active === set.critiques.length}
        className={`critique-item resolution-step ${active === set.critiques.length ? 'active' : ''}`}
        onClick={() => onActiveChange(set.critiques.length)}
        ref={(element) => { itemRefs.current[set.critiques.length] = element }}
        type="button"
      >
        <span className="critique-copy resolution-stack">
          <strong>{set.resolution.title}</strong>
          <span className="resolution-reasons">
            <span>
              <Check size={16} strokeWidth={1.7} />
              <span>{set.resolution.reasons[0]}</span>
            </span>
            <span>
              <Sparkles size={16} strokeWidth={1.7} />
              <span>{set.resolution.reasons[1]}</span>
            </span>
          </span>
        </span>
      </button>
    </div>
  )
}

function CritiqueSection({ set }: { set: CritiqueSet }) {
  const [active, setActive] = useState(0)
  const [mode, setMode] = useState<'before' | 'after'>('before')
  const sectionRef = useRef<HTMLElement | null>(null)
  const headingRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const handleActiveChange = useCallback((index: number) => {
    setActive(index)
    setMode(index === set.critiques.length ? 'after' : 'before')
  }, [set.critiques.length])
  const isResolved = active === set.critiques.length
  const activeStory = isResolved
    ? {
        title: set.resolution.title,
        description: set.resolution.reasons.join(' '),
      }
    : set.critiques[active]

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const list = listRef.current
    if (!section || !heading || !list) return

    const syncMediaHeight = () => {
      const headingStyles = getComputedStyle(heading)
      const marginBottom = Number.parseFloat(headingStyles.marginBottom) || 0
      const height = heading.offsetHeight + marginBottom + list.offsetHeight + 16
      section.style.setProperty('--media-height', `${Math.max(height, 240)}px`)
    }

    syncMediaHeight()
    const observer = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(syncMediaHeight)
    observer?.observe(heading)
    observer?.observe(list)
    window.addEventListener('resize', syncMediaHeight)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', syncMediaHeight)
    }
  }, [active, set.id])

  return (
    <section className="critique-section" id={set.id} ref={sectionRef}>
      <div className="critique-layout">
        <div className="section-heading" ref={headingRef}>
          <h2>{set.title}</h2>
          <p>{set.summary}</p>
        </div>
        <div
          aria-live="polite"
          className={`mobile-current-critique ${isResolved ? 'is-resolved' : ''}`}
        >
          {!isResolved && (
            <>
              <strong>{activeStory.title}</strong>
              <p>{activeStory.description}</p>
            </>
          )}
        </div>
        <div className="critique-list-wrap" ref={listRef}>
          <CritiqueList set={set} active={active} onActiveChange={handleActiveChange} />
        </div>
        <div className="sticky-visual">
          <Screenshot
            active={active}
            isResolved={isResolved}
            mode={mode}
            set={set}
          />
        </div>
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
