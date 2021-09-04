import React from 'react'
import styled from 'styled-components/native'
import { ContainerProps } from './container.props'

const ContainerStyle = styled.View<ContainerProps>`
	padding-horizontal: ${({ theme }) => `${theme.spacing.large}px`};
	${({ hasFlex }) =>
		hasFlex &&
		`
    flex: 1;
  `}
	${({ center }) =>
		center &&
		`
		align-items: center;
  `}
  	${({ direction }) =>
		direction &&
		`
		flex-direction: ${direction};
  `}
`

export const StyledContainer = props => {
	const { hasFlex = true, center = false, direction } = props
	return <ContainerStyle hasFlex={hasFlex} center={center} direction={direction} {...props} />
}
