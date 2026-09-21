import {
  ArrowDown,
  ArrowRight,
  Check,
  Eye,
  MousePointer2,
  Sparkles,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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
  mockup: 'insights' | 'checkout'
  reverse?: boolean
  critiques: Critique[]
}

const critiqueSets: CritiqueSet[] = [
  {
    id: 'focus',
    eyebrow: 'Set 01 · Analytics',
    title: 'Make the important thing obvious.',
    summary:
      'A dashboard can show everything and still communicate nothing. This redesign creates a clear path from signal to action.',
    beforeCaption: 'Useful data, without a point of view',
    afterCaption: 'A focused narrative with clear next steps',
    mockup: 'insights',
    critiques: [
      {
        label: 'Hierarchy',
        title: 'Lead with the decision, not the data.',
        description:
          'The original header gave every metric equal weight. The redesign elevates the outcome that needs attention and moves supporting context into a quieter second layer.',
        icon: Eye,
        highlight: { x: 4, y: 10, width: 60, height: 22 },
      },
      {
        label: 'Context',
        title: 'Make change understandable at a glance.',
        description:
          'A number without context creates work for the reader. A compact trend treatment now explains direction, magnitude, and timeframe in one scan.',
        icon: Sparkles,
        highlight: { x: 67, y: 10, width: 29, height: 22 },
      },
      {
        label: 'Focus',
        title: 'Let the chart answer one question.',
        description:
          'Competing series and persistent controls obscured the pattern. Reducing visual noise makes the critical drop visible before the user starts exploring.',
        icon: Eye,
        highlight: { x: 4, y: 36, width: 64, height: 43 },
      },
      {
        label: 'Action',
        title: 'Connect the insight to a next step.',
        description:
          'The redesigned recommendation panel turns observation into momentum. It explains why the signal matters and offers one clear, contextual action.',
        icon: ArrowRight,
        highlight: { x: 71, y: 36, width: 25, height: 43 },
      },
    ],
  },
  {
    id: 'flow',
    eyebrow: 'Set 02 · Checkout',
    title: 'Reduce uncertainty at every step.',
    summary:
      'Checkout friction is rarely one dramatic failure. It is the accumulation of small questions the interface leaves unanswered.',
    beforeCaption: 'A dense form with hidden expectations',
    afterCaption: 'A guided flow that builds confidence',
    mockup: 'checkout',
    reverse: true,
    critiques: [
      {
        label: 'Orientation',
        title: 'Set expectations before asking for effort.',
        description:
          'A lightweight progress marker shows where customers are, what remains, and how close they are to completion—without turning the flow into a wizard.',
        icon: Eye,
        highlight: { x: 8, y: 7, width: 84, height: 12 },
      },
      {
        label: 'Comprehension',
        title: 'Group inputs around how people think.',
        description:
          'The form now follows a natural mental model: contact, delivery, then payment. Clear grouping lowers the effort required to understand what belongs where.',
        icon: MousePointer2,
        highlight: { x: 8, y: 23, width: 53, height: 57 },
      },
      {
        label: 'Reassurance',
        title: 'Answer the cost question early.',
        description:
          'The order summary stays visible and explains delivery, discounts, and total cost before commitment. No surprises are deferred to the final click.',
        icon: Check,
        highlight: { x: 64, y: 23, width: 28, height: 40 },
      },
      {
        label: 'Commitment',
        title: 'Make the final action feel safe.',
        description:
          'Specific button language and nearby reassurance clarify exactly what happens next. Confidence replaces the generic, high-friction “Continue” label.',
        icon: ArrowRight,
        highlight: { x: 64, y: 67, width: 28, height: 13 },
      },
    ],
  },
]

function InsightsMockup({ mode }: { mode: 'before' | 'after' }) {
  return (
    <div className={`product-ui insights-ui ${mode}`}>
      <aside className="mock-sidebar" aria-hidden="true">
        <span className="mock-logo">n</span>
        <span />
        <span />
        <span />
        <span className="sidebar-bottom" />
      </aside>
      <div className="mock-workspace">
        <header className="mock-topbar">
          <div>
            <small>Overview</small>
            <strong>Product insights</strong>
          </div>
          <div className="avatar-row"><i /><i /><b>Share</b></div>
        </header>
        <section className="metric-row">
          <div className="primary-metric">
            <small>{mode === 'after' ? 'Activation this month' : 'Total activation'}</small>
            <strong>{mode === 'after' ? '68.4%' : '18,492'}</strong>
            <span>{mode === 'after' ? '↑ 8.2% from last month' : 'All workspaces'}</span>
          </div>
          <div className="secondary-metric">
            <small>Week over week</small>
            <strong>{mode === 'after' ? '+12.8%' : '6.72%'}</strong>
            <span>{mode === 'after' ? 'Strongest since May' : 'View report'}</span>
          </div>
        </section>
        <section className="chart-card">
          <div className="chart-title">
            <span><strong>{mode === 'after' ? 'Activation trend' : 'Workspace overview'}</strong><small>Last 30 days</small></span>
            <b>Monthly⌄</b>
          </div>
          <div className="chart-grid">
            <div className="chart-bars" aria-hidden="true">
              {[42, 57, 51, 68, 62, 78, 49, 54, 38, 66, 73, 82].map((height, index) => (
                <i key={height + index} style={{ height: `${mode === 'after' && index > 7 ? height - 18 : height}%` }} />
              ))}
            </div>
          </div>
        </section>
        <section className="insight-card">
          <span className="insight-icon"><Sparkles size={12} /></span>
          <div><small>{mode === 'after' ? 'Opportunity found' : 'Latest update'}</small><strong>{mode === 'after' ? 'Shorten the invite step' : 'Weekly report is ready'}</strong></div>
          <ArrowRight size={12} />
        </section>
      </div>
    </div>
  )
}

function CheckoutMockup({ mode }: { mode: 'before' | 'after' }) {
  return (
    <div className={`product-ui checkout-ui ${mode}`}>
      <header className="shop-header">
        <strong>Northstar</strong>
        <span>Secure checkout</span>
      </header>
      <div className="checkout-progress">
        <span className="complete"><i><Check size={8} /></i>Cart</span>
        <b />
        <span className="current"><i>2</i>Details</span>
        <b />
        <span><i>3</i>Confirm</span>
      </div>
      <div className="checkout-columns">
        <section className="form-panel">
          <div className="form-heading"><small>Step 2 of 3</small><strong>Delivery details</strong></div>
          <div className="field"><span>Email address</span><i>alex@north.co</i></div>
          <div className="field-row"><div className="field"><span>First name</span><i>Alex</i></div><div className="field"><span>Last name</span><i>Morgan</i></div></div>
          <div className="field"><span>Address</span><i>1428 Franklin Street</i></div>
          <div className="field-row"><div className="field"><span>City</span><i>San Francisco</i></div><div className="field small"><span>ZIP code</span><i>94109</i></div></div>
        </section>
        <aside className="order-panel">
          <small>Your order</small>
          <div className="order-product"><i /><span><strong>Everyday carry</strong><small>Sand · 1 item</small></span><b>$128</b></div>
          <div className="order-line"><span>Subtotal</span><b>$128</b></div>
          <div className="order-line"><span>Shipping</span><b>{mode === 'after' ? 'Free' : '—'}</b></div>
          <div className="order-total"><span>Total</span><strong>$128</strong></div>
          <button type="button">{mode === 'after' ? 'Review order' : 'Continue'} <ArrowRight size={11} /></button>
          <p><Check size={9} /> No charge until you confirm</p>
        </aside>
      </div>
    </div>
  )
}

function Screenshot({
  set,
  active,
}: {
  set: CritiqueSet
  active: number
}) {
  const [mode, setMode] = useState<'before' | 'after'>('after')
  const region = set.critiques[active].highlight

  return (
    <div className="visual-wrap">
      <div className="visual-toolbar">
        <div className="view-toggle" aria-label="Screenshot view">
          {(['before', 'after'] as const).map((view) => (
            <button
              className={mode === view ? 'active' : ''}
              key={view}
              onClick={() => setMode(view)}
              type="button"
            >
              {view}
            </button>
          ))}
        </div>
        <span>{mode === 'before' ? set.beforeCaption : set.afterCaption}</span>
      </div>
      <div className={`screenshot-shell is-${mode}`}>
        <div className="browser-bar" aria-hidden="true">
          <span><i /><i /><i /></span>
          <b>northstar.app</b>
          <i />
        </div>
        <div className="mockup-viewport">
          {set.mockup === 'insights'
            ? <InsightsMockup mode={mode} />
            : <CheckoutMockup mode={mode} />}
          {mode === 'after' && (
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
        </div>
      </div>
      <p className="visual-hint">
        <MousePointer2 size={13} />
        Select before or after to compare the experience
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
    const observers = itemRefs.current.map((element, index) => {
      if (!element) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) onActiveChange(index)
        },
        { rootMargin: '-38% 0px -44% 0px', threshold: 0.1 },
      )
      observer.observe(element)
      return observer
    })

    return () => observers.forEach((observer) => observer?.disconnect())
  }, [onActiveChange])

  return (
    <div className="critique-list">
      {set.critiques.map((critique, index) => {
        const Icon = critique.icon
        return (
          <button
            className={`critique-item ${active === index ? 'active' : ''}`}
            key={critique.title}
            onClick={() => onActiveChange(index)}
            ref={(element) => { itemRefs.current[index] = element }}
            type="button"
          >
            <span className="progress-rail" aria-hidden="true">
              <i>{String(index + 1).padStart(2, '0')}</i>
              {index < set.critiques.length - 1 && <b />}
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
    </div>
  )
}

function CritiqueSection({ set }: { set: CritiqueSet }) {
  const [active, setActive] = useState(0)

  return (
    <section className={`critique-section ${set.reverse ? 'reverse' : ''}`} id={set.id}>
      <div className="section-heading">
        <p>{set.eyebrow}</p>
        <h2>{set.title}</h2>
        <span>{set.summary}</span>
      </div>
      <div className="critique-layout">
        <div className="sticky-visual">
          <Screenshot set={set} active={active} />
        </div>
        <CritiqueList set={set} active={active} onActiveChange={setActive} />
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
          <a href="#focus">Work</a>
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
            <a href="#focus">Explore the work <ArrowDown size={15} /></a>
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
