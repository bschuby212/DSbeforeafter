import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type Highlight = {
  top: string
  left: string
  width: string
  height: string
}

type Critique = {
  id: string
  icon: IconName
  title: string
  description: string
  highlight: Highlight
}

type IconName =
  | 'compass'
  | 'layers'
  | 'cursor'
  | 'grid'
  | 'feedback'
  | 'route'
  | 'signal'
  | 'compare'
  | 'chart'
  | 'link'
  | 'check'
  | 'sparkles'

type ResolutionPoint = {
  icon: IconName
  text: string
}

type CritiqueSet = {
  id: string
  label: string
  title: string
  summary: string
  resolutionTitle: string
  resolutionDescription: string
  resolutionPoints: [ResolutionPoint, ResolutionPoint]
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  critiques: Critique[]
}

const critiqueSets: CritiqueSet[] = [
  {
    id: 'workspace',
    label: 'Workspace',
    title: 'Finding focus in a crowded workspace',
    summary:
      'A closer look at how structure, hierarchy, and feedback made a familiar workflow harder than it needed to be.',
    resolutionTitle: 'From friction to focus.',
    resolutionDescription:
      'The redesigned experience clarifies the path forward while keeping the context people need close at hand.',
    resolutionPoints: [
      {
        icon: 'check',
        text: 'Priority, progress, and action sit in one clear path.',
      },
      {
        icon: 'sparkles',
        text: 'Hierarchy and feedback make the next step obvious.',
      },
    ],
    beforeImage: '/images/workspace-before.svg',
    afterImage: '/images/workspace-after.svg',
    beforeAlt: 'Placeholder dashboard interface before redesign',
    afterAlt: 'Placeholder dashboard interface after redesign',
    critiques: [
      {
        id: '01',
        icon: 'compass',
        title: 'Competing points of entry',
        description:
          'Too many elements ask for attention at once, leaving people without a clear place to begin.',
        highlight: { top: '12%', left: '4%', width: '20%', height: '76%' },
      },
      {
        id: '02',
        icon: 'layers',
        title: 'Hierarchy gets lost',
        description:
          'Primary and supporting information carry similar visual weight, making the page harder to scan.',
        highlight: { top: '13%', left: '28%', width: '68%', height: '19%' },
      },
      {
        id: '03',
        icon: 'cursor',
        title: 'Actions lack context',
        description:
          'Controls sit apart from the content they affect, increasing hesitation and the chance of error.',
        highlight: { top: '37%', left: '73%', width: '22%', height: '25%' },
      },
      {
        id: '04',
        icon: 'grid',
        title: 'Dense information blocks',
        description:
          'Tight spacing and weak grouping make routine comparison feel like careful inspection.',
        highlight: { top: '36%', left: '28%', width: '41%', height: '52%' },
      },
      {
        id: '05',
        icon: 'feedback',
        title: 'Feedback arrives too late',
        description:
          'Status is understated and distant from the task, so progress is easy to overlook.',
        highlight: { top: '67%', left: '73%', width: '22%', height: '21%' },
      },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    title: 'Making complex decisions feel lighter',
    summary:
      'The second workflow reveals where unclear sequencing and fragmented details slowed confident decisions.',
    resolutionTitle: 'From data to direction.',
    resolutionDescription:
      'The redesign brings related signals together, making patterns easier to compare and decisions easier to trust.',
    resolutionPoints: [
      {
        icon: 'check',
        text: 'Related metrics stay connected so comparisons stay in view.',
      },
      {
        icon: 'sparkles',
        text: 'Clear structure turns dense data into an actionable story.',
      },
    ],
    beforeImage: '/images/insights-before.svg',
    afterImage: '/images/insights-after.svg',
    beforeAlt: 'Placeholder analytics interface before redesign',
    afterAlt: 'Placeholder analytics interface after redesign',
    critiques: [
      {
        id: '01',
        icon: 'route',
        title: 'The next step is unclear',
        description:
          'Navigation describes destinations, but offers little guidance about the intended sequence.',
        highlight: { top: '4%', left: '4%', width: '92%', height: '12%' },
      },
      {
        id: '02',
        icon: 'signal',
        title: 'Key signals are buried',
        description:
          'High-value metrics blend into surrounding detail instead of helping people orient quickly.',
        highlight: { top: '21%', left: '5%', width: '26%', height: '28%' },
      },
      {
        id: '03',
        icon: 'compare',
        title: 'Comparisons require memory',
        description:
          'Related values are separated across modules, forcing people to remember what they just saw.',
        highlight: { top: '21%', left: '35%', width: '60%', height: '28%' },
      },
      {
        id: '04',
        icon: 'chart',
        title: 'Patterns are hard to read',
        description:
          'The visualization adds density without enough structure, obscuring the story in the data.',
        highlight: { top: '54%', left: '5%', width: '58%', height: '39%' },
      },
      {
        id: '05',
        icon: 'link',
        title: 'Details feel disconnected',
        description:
          'Supporting context is isolated from the main analysis, creating unnecessary back-and-forth.',
        highlight: { top: '54%', left: '67%', width: '28%', height: '39%' },
      },
    ],
  },
  {
    id: 'docs',
    label: 'Docs',
    title: 'Turning documentation into guidance',
    summary:
      'A third look at how sparse structure and weak recommendations left teams guessing how to use a component.',
    resolutionTitle: 'From reference to recommendation.',
    resolutionDescription:
      'The redesign pairs clear structure with practical guidance so teams can decide and ship with confidence.',
    resolutionPoints: [
      {
        icon: 'check',
        text: 'Usage guidance sits beside examples instead of afterthoughts.',
      },
      {
        icon: 'sparkles',
        text: 'Persistent navigation makes deep pages easier to browse in place.',
      },
    ],
    beforeImage: '/images/docs-before.svg',
    afterImage: '/images/docs-after.svg',
    beforeAlt: 'Placeholder documentation interface before redesign',
    afterAlt: 'Placeholder documentation interface after redesign',
    critiques: [
      {
        id: '01',
        icon: 'layers',
        title: 'Structure feels inconsistent',
        description:
          'Sections are grouped unevenly, making variations and relationships harder to understand.',
        highlight: { top: '12%', left: '6%', width: '18%', height: '70%' },
      },
      {
        id: '02',
        icon: 'feedback',
        title: 'Guidance is too thin',
        description:
          'Examples appear without clear recommendations, so teams still have to invent the right pattern.',
        highlight: { top: '24%', left: '28%', width: '62%', height: '42%' },
      },
      {
        id: '03',
        icon: 'route',
        title: 'Navigation drops away',
        description:
          'In-page wayfinding disappears as content deepens, forcing constant scrolling to reorient.',
        highlight: { top: '6%', left: '6%', width: '88%', height: '12%' },
      },
      {
        id: '04',
        icon: 'grid',
        title: 'Specs compete with meaning',
        description:
          'Technical detail and usage intent carry similar weight, slowing decisions instead of supporting them.',
        highlight: { top: '58%', left: '28%', width: '62%', height: '30%' },
      },
      {
        id: '05',
        icon: 'link',
        title: 'Related pieces feel isolated',
        description:
          'Variants and adjacent components are hard to reach, interrupting the path from question to answer.',
        highlight: { top: '20%', left: '6%', width: '18%', height: '28%' },
      },
    ],
  },
]

function CritiqueIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    compass: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m15.2 8.8-2 4.4-4.4 2 2-4.4 4.4-2Z" />
      </>
    ),
    layers: (
      <>
        <path d="m12 4 8 4-8 4-8-4 8-4Z" />
        <path d="m4 12 8 4 8-4M4 16l8 4 8-4" />
      </>
    ),
    cursor: (
      <>
        <path d="m5 3 6.8 16 2.1-6.1L20 10.8 5 3Z" />
        <path d="m14 14 4 4" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    feedback: (
      <>
        <path d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z" />
        <path d="M10 20h4" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <path d="M8 18h3a3 3 0 0 0 3-3v-6a3 3 0 0 1 3-3" />
      </>
    ),
    signal: (
      <>
        <path d="M4 18v-3M9 18v-7M14 18V8M19 18V4" />
      </>
    ),
    compare: (
      <>
        <rect x="4" y="5" width="6" height="14" rx="1" />
        <rect x="14" y="8" width="6" height="11" rx="1" />
        <path d="M7 9h0M17 12h0" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V5M4 19h16" />
        <path d="m7 15 4-5 3 3 5-7" />
      </>
    ),
    link: (
      <>
        <path d="m9.5 14.5 5-5" />
        <path d="M7.5 16.5 6 18a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5 0" />
        <path d="m16.5 7.5 1.5-1.5a3.5 3.5 0 0 1 5 5l-3 3a3.5 3.5 0 0 1-5 0" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m8.5 12.2 2.4 2.4 4.6-5" />
      </>
    ),
    sparkles: (
      <>
        <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
        <path d="m7.8 7.8 2.1 2.1M14.1 14.1l2.1 2.1M16.2 7.8l-2.1 2.1M9.9 14.1l-2.1 2.1" />
      </>
    ),
  }

  return (
    <span className="critique-copy__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        {paths[name]}
      </svg>
    </span>
  )
}

function ImageStage({
  set,
  activeIndex,
  idPrefix,
}: {
  set: CritiqueSet
  activeIndex: number
  idPrefix: string
}) {
  const showingAfter = activeIndex >= set.critiques.length
  const critique =
    activeIndex >= 0 && activeIndex < set.critiques.length
      ? set.critiques[activeIndex]
      : null

  return (
    <figure
      className={`image-stage${showingAfter ? ' is-after' : ''}`}
      aria-label={showingAfter ? set.afterAlt : set.beforeAlt}
    >
      <div className="image-stage__viewport">
        <img
          className="image-stage__image image-stage__image--before"
          src={set.beforeImage}
          alt={showingAfter ? '' : set.beforeAlt}
        />
        <img
          className="image-stage__image image-stage__image--after"
          src={set.afterImage}
          alt={showingAfter ? set.afterAlt : ''}
        />
        {critique && (
          <span
            key={`${idPrefix}-${critique.id}`}
            className="image-stage__highlight"
            style={critique.highlight}
            aria-hidden="true"
          />
        )}
      </div>
    </figure>
  )
}

function MobileCritique({
  critique,
  set,
  caseId,
}: {
  critique: Critique
  set: CritiqueSet
  caseId: string
}) {
  const critiqueIndex = set.critiques.indexOf(critique)

  return (
    <article className="mobile-critique">
      <ImageStage
        set={set}
        activeIndex={critiqueIndex}
        idPrefix={`mobile-${caseId}`}
      />
      <div className="critique-copy is-active">
        <CritiqueIcon name={critique.icon} />
        <div>
          <h3>{critique.title}</h3>
          <p>{critique.description}</p>
        </div>
      </div>
    </article>
  )
}

function CaseSwitcher({
  cases,
  activeId,
  onSelect,
}: {
  cases: CritiqueSet[]
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="case-switcher" role="tablist" aria-label="Screen UX comparisons">
      <div className="case-switcher__tabs">
        {cases.map((item) => {
          const selected = item.id === activeId
          return (
            <button
              type="button"
              role="tab"
              key={item.id}
              id={`case-tab-${item.id}`}
              className={`case-switcher__tab${selected ? ' is-selected' : ''}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onSelect(item.id)}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ResolutionCopy({
  set,
  isActive,
}: {
  set: CritiqueSet
  isActive: boolean
}) {
  return (
    <div
      className={`resolution-copy ${isActive ? 'is-active' : ''}`}
      key={isActive ? `${set.id}-active` : `${set.id}-idle`}
    >
      <h3>{set.resolutionTitle}</h3>
      <p className="resolution-copy__body">{set.resolutionDescription}</p>
      <ul className="resolution-points">
        {set.resolutionPoints.map((point) => (
          <li className="resolution-point" key={point.text}>
            <CritiqueIcon name={point.icon} />
            <span>{point.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function BeforeAfterStory({
  set,
  cases,
  onSelectCase,
}: {
  set: CritiqueSet
  cases: CritiqueSet[]
  onSelectCase: (id: string) => void
}) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const stepsRef = useRef<(HTMLElement | null)[]>([])
  const hasScrolledRef = useRef(false)
  const stickyRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    hasScrolledRef.current = false
    setActiveIndex(-1)
  }, [set.id])

  // Keep media sticky just under the fixed title / summary / tabs.
  useLayoutEffect(() => {
    const sticky = stickyRef.current
    const header = headerRef.current
    if (!sticky || !header) return

    const update = () => {
      const top = Math.ceil(header.getBoundingClientRect().height)
      sticky.style.setProperty('--story-sticky-top', `${Math.max(0, top)}px`)
    }

    update()
    const frame = window.requestAnimationFrame(update)
    const observer = new ResizeObserver(update)
    observer.observe(header)
    if (document.fonts?.ready) {
      void document.fonts.ready.then(update)
    }
    window.addEventListener('resize', update)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [set.id])

  useEffect(() => {
    const onScroll = () => {
      hasScrolledRef.current = true
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        if (!hasScrolledRef.current) {
          setActiveIndex(-1)
          return
        }

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight / 2) -
              Math.abs(b.boundingClientRect.top - window.innerHeight / 2),
          )

        if (visible[0]) {
          setActiveIndex(Number((visible[0].target as HTMLElement).dataset.step))
          return
        }

        const focusBandOccupied = stepsRef.current.some((step) => {
          if (!step) return false
          const rect = step.getBoundingClientRect()
          const mid = window.innerHeight * 0.5
          return rect.top <= mid && rect.bottom >= mid
        })
        if (!focusBandOccupied) setActiveIndex(-1)
      },
      { rootMargin: '-46% 0px -46% 0px', threshold: 0 },
    )

    stepsRef.current.forEach((step) => step && observer.observe(step))
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [set.id])

  const registerStep = (index: number) => (node: HTMLElement | null) => {
    stepsRef.current[index] = node
  }

  return (
    <section
      className="story"
      id={`story-${set.id}`}
      aria-labelledby={`story-title-${set.id}`}
    >
      <header className="story__header" ref={headerRef}>
        <h2 id={`story-title-${set.id}`}>{set.title}</h2>
        <div className="story__header-aside">
          <p>{set.summary}</p>
          <CaseSwitcher
            cases={cases}
            activeId={set.id}
            onSelect={onSelectCase}
          />
        </div>
      </header>

      <div className="story__desktop story__exchange" key={set.id}>
        <div className="story__visual">
          <div className="story__sticky" ref={stickyRef}>
            <ImageStage
              set={set}
              activeIndex={activeIndex}
              idPrefix={`desktop-${set.id}`}
            />
          </div>
        </div>

        <div className="story__steps">
          <div className="story__intro-runway" aria-hidden="true" />
          {set.critiques.map((critique, index) => (
            <article
              className="story__step"
              data-step={index}
              key={critique.id}
              ref={registerStep(index)}
            >
              <div
                className={`critique-copy ${
                  activeIndex === index ? 'is-active' : ''
                }`}
              >
                <CritiqueIcon name={critique.icon} />
                <div>
                  <h3>{critique.title}</h3>
                  <p>{critique.description}</p>
                </div>
              </div>
            </article>
          ))}

          <article
            className="story__step story__step--resolution"
            data-step={set.critiques.length}
            ref={registerStep(set.critiques.length)}
          >
            <ResolutionCopy
              set={set}
              isActive={activeIndex === set.critiques.length}
            />
          </article>
        </div>
      </div>

      <div className="story__mobile story__exchange" key={`mobile-${set.id}`}>
        {set.critiques.map((critique) => (
          <MobileCritique
            critique={critique}
            set={set}
            caseId={set.id}
            key={critique.id}
          />
        ))}
        <div className="mobile-resolution">
          <ResolutionCopy set={set} isActive />
          <ImageStage
            set={set}
            activeIndex={set.critiques.length}
            idPrefix={`mobile-after-${set.id}`}
          />
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [activeCaseId, setActiveCaseId] = useState(critiqueSets[0].id)
  const activeSet =
    critiqueSets.find((set) => set.id === activeCaseId) ?? critiqueSets[0]

  return (
    <main>
      <BeforeAfterStory
        set={activeSet}
        cases={critiqueSets}
        onSelectCase={setActiveCaseId}
      />
    </main>
  )
}
