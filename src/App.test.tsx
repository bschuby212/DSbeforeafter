import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('portfolio critique', () => {
  it('renders both critique sets and updates the screenshot view', () => {
    render(<App />)

    expect(screen.getByText('Make the important thing obvious.')).toBeInTheDocument()
    expect(screen.getByText('Reduce uncertainty at every step.')).toBeInTheDocument()

    const beforeButtons = screen.getAllByRole('button', { name: 'before' })
    fireEvent.click(beforeButtons[0])

    expect(screen.getByText('Useful data, without a point of view')).toBeInTheDocument()
  })
})
