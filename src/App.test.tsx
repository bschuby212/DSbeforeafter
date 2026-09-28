import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('scroll critique', () => {
  it('renders the workspace critique with case tabs', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: 'Finding focus in a crowded workspace',
      }),
    ).toBeInTheDocument()

    expect(screen.getByRole('tab', { name: 'Workspace' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tab', { name: 'Insights' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Docs' })).toBeInTheDocument()

    expect(
      screen.getAllByText('Competing points of entry').length,
    ).toBeGreaterThan(0)
    expect(
      screen.queryByText('End of critique'),
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('tab', { name: 'Insights' }))

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Making complex decisions feel lighter',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Insights' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })
})
