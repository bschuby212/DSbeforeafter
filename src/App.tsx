import { useEffect, useRef, useState } from 'react'

type Highlight = {
  top: string
  left: string
  width: string
  height: string
}

type Critique = {
  id: string
  title: string
  description: string
  highlight: Highlight
}

type CritiqueSet = {
  eyebrow: string
  title: string
  summary: string
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  critiques: Critique[]
}

const critiqueSets: CritiqueSet[] = [
  {
    eyebrow: 'Chapter 01 · Discovery',
    title: 'Finding focus in a crowded workspace',
    summary:
      'A closer look at how structure, hierarchy, and feedback made a familiar workflow harder than it needed to be.',
    beforeImage: '/images/workspace-before.svg',
    afterImage: '/images/workspace-after.svg',
    beforeAlt: 'Placeholder dashboard interface before redesign',
    afterAlt: 'Placeholder dashboard interface after redesign',
    critiques: [
      {
        id: '01',
        title: 'Competing points of entry',
        description:
          'Too many elements ask for attention at once, leaving people without a clear place to begin.',
        highlight: { top: '12%', left: '4%', width: '20%', height: '76%' },
      },
      {
        id: '02',
        title: 'Hierarchy gets lost',
        description:
          'Primary and supporting information carry similar visual weight, making the page harder to scan.',
        highlight: { top: '13%', left: '28%', width: '68%', height: '19%' },
      },
      {
        id: '03',
        title: 'Actions lack context',
        description:
          'Controls sit apart from the content they affect, increasing hesitation and the chance of error.',
        highlight: { top: '37%', left: '73%', width: '22%', height: '25%' },
      },
      {
        id: '04',
        title: 'Dense information blocks',
        description:
          'Tight spacing and weak grouping make routine comparison feel like careful inspection.',
        highlight: { top: '36%', left: '28%', width: '41%', height: '52%' },
      },
      {
        id: '05',
        title: 'Feedback arrives too late',
        description:
          'Status is understated and distant from the task, so progress is easy to overlook.',
        highlight: { top: '67%', left: '73%', width: '22%', height: '21%' },
      },
    ],
  },
  {
    eyebrow: 'Chapter 02 · Refinement',
    title: 'Making complex decisions feel lighter',
    summary:
      'The second workflow reveals where unclear sequencing and fragmented details slowed confident decisions.',
    beforeImage: '/images/insights-before.svg',
    afterImage: '/images/insights-after.svg',
    beforeAlt: 'Placeholder analytics interface before redesign',
    afterAlt: 'Placeholder analytics interface after redesign',
    critiques: [
      {
        id: '01',
        title: 'The next step is unclear',
        description:
          'Navigation describes destinations, but offers little guidance about the intended sequence.',
        highlight: { top: '4%', left: '4%', width: '92%', height: '12%' },
      },
      {
        id: '02',
        title: 'Key signals are buried',
        description:
          'High-value metrics blend into surrounding detail instead of helping people orient quickly.',
        highlight: { top: '21%', left: '5%', width: '26%', height: '28%' },
      },
      {
        id: '03',
        title: 'Comparisons require memory',
        description:
          'Related values are separated across modules, forcing people to remember what they just saw.',
        highlight: { top: '21%', left: '35%', width: '60%', height: '28%' },
      },
      {
        id: '04',
        title: 'Patterns are hard to read',
        description:
          'The visualization adds density without enough structure, obscuring the story in the data.',
        highlight: { top: '54%', left: '5%', width: '58%', height: '39%' },
      },
      {
        id: '05',
        title: 'Details feel disconnected',
        description:
          'Supporting context is isolated from the main analysis, creating unnecessary back-and-forth.',
        highlight: { top: '54%', left: '67%', width: '28%', height: '39%' },
      },
    ],
  },
]

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
  const critique = set.critiques[Math.min(activeIndex, set.critiques.length - 1)]

  return (
    <figure className={`image-stage ${showingAfter ? 'is-after' : ''}`}>
      <div className="image-stage__topline">
        <span className="state-label state-label--before">Before</span>
        <span className="state-label state-label--after">After</span>
        <span className="image-stage__counter" aria-hidden="true">
          {showingAfter
            ? 'Redesigned'
            : `${String(activeIndex + 1).padStart(2, '0')} / ${String(
                set.critiques.length,
              ).padStart(2, '0')}`}
        </span>
      </div>

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
        {!showingAfter && critique && (
          <span
            key={`${idPrefix}-${critique.id}`}
            className="image-stage__highlight"
            style={critique.highlight}
            aria-hidden="true"
          />
        )}
      </div>
      <figcaption className="image-stage__caption">
        {showingAfter
          ? 'A calmer structure brings priority, progress, and action into one clear path.'
          : `Area ${critique?.id} · ${critique?.title}`}
      </figcaption>
    </figure>
  )
}

function MobileCritique({
  critique,
  set,
  setIndex,
}: {
  critique: Critique
  set: CritiqueSet
  setIndex: number
}) {
  const critiqueIndex = set.critiques.indexOf(critique)

  return (
    <article className="mobile-critique">
      <ImageStage
        set={set}
        activeIndex={critiqueIndex}
        idPrefix={`mobile-${setIndex}`}
      />
      <div className="critique-copy is-active">
        <span className="critique-copy__number">{critique.id}</span>
        <div>
          <h3>{critique.title}</h3>
          <p>{critique.description}</p>
        </div>
      </div>
    </article>
  )
}

function BeforeAfterStory({
  set,
  setIndex,
}: {
  set: CritiqueSet
  setIndex: number
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const stepsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight / 2) -
              Math.abs(b.boundingClientRect.top - window.innerHeight / 2),
          )

        if (visible[0]) {
          setActiveIndex(Number((visible[0].target as HTMLElement).dataset.step))
        }
      },
      { rootMargin: '-46% 0px -46% 0px', threshold: 0 },
    )

    stepsRef.current.forEach((step) => step && observer.observe(step))
    return () => observer.disconnect()
  }, [])

  const registerStep = (index: number) => (node: HTMLElement | null) => {
    stepsRef.current[index] = node
  }

  return (
    <section className="story" aria-labelledby={`story-title-${setIndex}`}>
      <header className="story__header">
        <p className="eyebrow">{set.eyebrow}</p>
        <h2 id={`story-title-${setIndex}`}>{set.title}</h2>
        <p>{set.summary}</p>
      </header>

      <div className="story__desktop">
        <div className="story__visual">
          <div className="story__sticky">
            <ImageStage
              set={set}
              activeIndex={activeIndex}
              idPrefix={`desktop-${setIndex}`}
            />
          </div>
        </div>

        <div className="story__steps">
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
                <span className="critique-copy__number">{critique.id}</span>
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
            <div
              className={`resolution-copy ${
                activeIndex === set.critiques.length ? 'is-active' : ''
              }`}
            >
              <p className="eyebrow">The redesign</p>
              <h3>From friction to focus.</h3>
              <p>
                The redesigned experience clarifies the path forward while
                keeping the context people need close at hand.
              </p>
            </div>
          </article>
        </div>
      </div>

      <div className="story__mobile">
        {set.critiques.map((critique) => (
          <MobileCritique
            critique={critique}
            set={set}
            setIndex={setIndex}
            key={critique.id}
          />
        ))}
        <div className="mobile-resolution">
          <div className="resolution-copy is-active">
            <p className="eyebrow">The redesign</p>
            <h3>From friction to focus.</h3>
            <p>
              A clearer hierarchy and stronger grouping make the next step
              easier to see.
            </p>
          </div>
          <ImageStage
            set={set}
            activeIndex={set.critiques.length}
            idPrefix={`mobile-after-${setIndex}`}
          />
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <main>
      <header className="page-intro">
        <p className="eyebrow">Before & after · UX critique</p>
        <h1>Breaking down the old experience</h1>
        <p className="page-intro__lede">
          Before refining the interface, we slowed down to understand where the
          experience was asking too much of its users.
        </p>
        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll to explore</span>
          <span className="scroll-cue__line" />
        </div>
      </header>

      {critiqueSets.map((set, index) => (
        <BeforeAfterStory set={set} setIndex={index} key={set.title} />
      ))}

      <footer className="page-footer">
        <span>End of critique</span>
        <span>02 chapters · 10 observations</span>
      </footer>
    </main>
  )
}
