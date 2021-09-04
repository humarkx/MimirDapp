import React from 'react'
import { ContainerProps } from './container.props'
import { StyledContainer } from './container.styled'

export const Container = (props: ContainerProps) => {
	return <StyledContainer {...props} />
}
