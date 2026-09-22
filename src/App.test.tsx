import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('portfolio critique', () => {
  it('renders three embedded critique sets without standalone page controls', () => {
    render(<App />)

    expect(screen.getByText('Outdated System Homepage')).toBeInTheDocument()
    expect(screen.getByText('Fragmented Component Library')).toBeInTheDocument()
    expect(screen.getByText('Shallow Component Documentation')).toBeInTheDocument()

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'before' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'after' })).not.toBeInTheDocument()
    expect(screen.queryByText(/Screen 01/)).not.toBeInTheDocument()
    expect(screen.queryByText('View area')).not.toBeInTheDocument()
    expect(screen.getByRole('img', {
      name: /Legacy Vizient UX\/UI Toolkit homepage/,
    })).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', {
      name: "Resolution: It's better",
    })[0])

    expect(screen.getByText('Key resources and actions are easier to find at a glance.')).toBeInTheDocument()
    expect(document.querySelector('.after-placeholder')).toBeTruthy()
    expect(document.querySelector('.after-placeholder')?.textContent?.trim()).toBe('')
  })
})
