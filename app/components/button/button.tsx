import * as React from 'react'
import { ButtonProps } from './button.props'
import { StyledButton } from './button.styled'
/**
 * All text will start off looking like this.
 */
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */

export const Button = (props: ButtonProps) => {
	return <StyledButton {...props} />
}
