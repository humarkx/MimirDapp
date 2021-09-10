import React from 'react'
import { Card } from 'native-base'
import styled from 'styled-components/native'
import { CardProps } from './card.props'

const CardStyle = styled(Card)<CardProps>`
	flex: 1;
	color: ${({ theme }) => theme.colors.text};
	margin-bottom: 0;
	margin-top: 0;
	border-radius: 25px;
	min-height: 60px;
	background-color: ${({ theme }) => theme.colors.transparent.transparent};
	border-color: ${({ theme }) => theme.colors.primary};
	box-shadow: none;
`

export const StyledCard = props => {
	const { children, style } = props
	return <CardStyle style={style}>{children}</CardStyle>
}
