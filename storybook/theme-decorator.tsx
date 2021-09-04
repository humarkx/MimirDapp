import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { lightTheme } from '../app/theme/theme'

export const ThemeDecorator = storyFn => <ThemeProvider theme={lightTheme}>{storyFn()}</ThemeProvider>
