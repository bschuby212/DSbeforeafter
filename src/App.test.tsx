import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('portfolio critique', () => {
  it('renders all three Vizient critique sets and placeholder after states', () => {
    render(<App />)

    expect(screen.getByText('Outdated System Homepage')).toBeInTheDocument()
    expect(screen.getByText('Fragmented Component Library')).toBeInTheDocument()
    expect(screen.getByText('Shallow Component Documentation')).toBeInTheDocument()

    const beforeButtons = screen.getAllByRole('button', { name: 'before' })
    const afterButtons = screen.getAllByRole('button', { name: 'after' })

    expect(beforeButtons).toHaveLength(3)
    expect(afterButtons).toHaveLength(3)
    expect(beforeButtons[0]).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Legacy toolkit homepage')).toBeInTheDocument()
    expect(screen.getByRole('img', {
      name: /Legacy Vizient UX\/UI Toolkit homepage/,
    })).toBeInTheDocument()

    fireEvent.click(afterButtons[0])

    expect(afterButtons[0]).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Redesigned homepage · preview pending')).toBeInTheDocument()
    expect(screen.getByText('A clearer starting point is next.')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', {
      name: 'Resolution: A clearer entry point.',
    }))

    expect(afterButtons[0]).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Stronger hierarchy · clearer paths · less cognitive load')).toBeInTheDocument()
  })
})
