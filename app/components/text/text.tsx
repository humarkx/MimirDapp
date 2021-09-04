import * as React from 'react'
import { TextProps } from './text.props'
import { StyledText } from './text.styled'
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export const Text = (props: TextProps) => {
	return <StyledText {...props} />
}
