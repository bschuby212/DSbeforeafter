import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('portfolio critique', () => {
  it('renders both critique sets with accessible before and after controls', () => {
    render(<App />)

    expect(screen.getByText('Make the important thing obvious.')).toBeInTheDocument()
    expect(screen.getByText('Reduce uncertainty at every step.')).toBeInTheDocument()

    const beforeButtons = screen.getAllByRole('button', { name: 'before' })
    const afterButtons = screen.getAllByRole('button', { name: 'after' })

    expect(beforeButtons[0]).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Useful data, without a point of view')).toBeInTheDocument()

    fireEvent.click(afterButtons[0])

    expect(afterButtons[0]).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('A focused narrative with clear next steps')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Review order' })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', {
      name: 'Resolution: One story, from signal to action.',
    }))

    expect(afterButtons[0]).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Clear priority · useful context · direct action')).toBeInTheDocument()
  })
})
