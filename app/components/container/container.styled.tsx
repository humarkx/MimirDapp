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
	${({ centerHorizontal, dir }) =>
		centerHorizontal && (dir === 'column' || dir === 'column-reverse')
			? `
		align-items: center;
  `
			: centerHorizontal && (dir === 'row' || dir === 'row-reverse')
			? `
		justify-content: center;
  `
			: ''}
  ${({ centerVertical, dir }) =>
		centerVertical && (dir === 'column' || dir === 'column-reverse')
			? `
		justify-content: center;
  `
			: centerVertical && (dir === 'row' || dir === 'row-reverse')
			? `
		align-items: center;
  `
			: ''}
  	${({ dir, hasFlex }) =>
		dir &&
		hasFlex &&
		`
		flex-direction: ${dir};
  `}
`

export const StyledContainer = (props: ContainerProps) => {
	const { hasFlex = true, centerHorizontal = false, centerVertical = false, dir = 'column', style, ...rest } = props
	return (
		<ContainerStyle
			hasFlex={hasFlex}
			dir={dir}
			{...props}
			style={style}
			centerHorizontal={centerHorizontal}
			centerVertical={centerVertical}
		/>
	)
}
