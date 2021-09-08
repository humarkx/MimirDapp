import * as React from 'react'
import { ScreenWrapperProps } from './screen-wrapper.props'
import { StyledScreenWrapper } from './screen-wrapper.styled'

export const ScreenWrapper = (props: ScreenWrapperProps) => {
	return <StyledScreenWrapper {...props} />
}
