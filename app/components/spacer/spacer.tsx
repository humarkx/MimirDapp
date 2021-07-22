import * as React from 'react'
import { SpacerProps } from './spacer.props'
import { StyledSpace } from './spacer.styled'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */

export const Spacer = (props: SpacerProps) => {
	return <StyledSpace {...props} />
}
