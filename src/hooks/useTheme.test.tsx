import React from 'react'
import { render, screen } from '@testing-library/react'
import useTheme from './useTheme'
import { ThemeProvider } from '../theme-styled'
import defaultTheme from '../themes/defaultTheme'

describe('useTheme', () => {
  const TestComponent = () => {
    const theme = useTheme()
    return <p data-testid="theme-name">{theme.name}</p>
  }

  it('Should be able to access the theme from within the render function of a component', () => {
    const theme = {
      ...defaultTheme,
      name: 'the-name-of-the-theme'
    }

    render(
      <ThemeProvider theme={theme}>
        <TestComponent />
      </ThemeProvider>
    )

    const themeNameParagraph = screen.getByTestId('theme-name')

    expect(themeNameParagraph.innerHTML).toBe('the-name-of-the-theme')
  })
})