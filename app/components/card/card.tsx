import React from 'react'
import { CardProps } from './card.props'
import { StyledCard } from './card.styled'

export const Card = (props: CardProps) => {
	return <StyledCard {...props} />
}
