import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { HomePage } from './HomePage'

describe('<HomePage/>', () => {
  test('renders component', () => {
    render(<HomePage/>)

    expect(screen.getByText(/home page/i)).toBeInTheDocument()
  })
})
