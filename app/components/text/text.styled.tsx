import React from 'react'
import styled from 'styled-components/native'
import { translate } from '../../i18n'
import { ThemeType } from '../../theme/theme'
import { TextProps } from './text.props'
import { TextColorVariants } from './text.types'

const handleColorVariant = (theme: ThemeType, variant: TextColorVariants) => {
	switch (variant) {
		case 'primary':
			return theme.colors.primary
		case 'secondary':
			return theme.colors.secondary
		case 'dark':
			return theme.colors.background
		case 'success':
			return theme.colors.interface.success
		case 'warning':
			return theme.colors.interface.warning
		case 'danger':
			return theme.colors.interface.error
		case 'info':
			return theme.colors.interface.info
		case 'faded':
			return theme.colors.transparent.faded
		case 'ghost':
			return theme.colors.transparent.ghost
		case 'white':
			return theme.colors.palette.white
		case 'default':
		default:
			return theme.colors.text
	}
}

const Text = styled.Text<TextProps>`
	color: ${({ variant, theme }) => handleColorVariant(theme, variant)};
	font-family: ${({ typography, theme }) => theme.typography[typography].fontFamily};
	font-size: ${({ typography, theme }) => `${theme.typography[typography].fontSize}px`};
	font-weight: ${({ typography, theme }) => theme.typography[typography].fontWeight};
	letter-spacing: ${({ typography, theme }) => theme.typography[typography].letterSpacing ?? 0};
	line-height: ${({ typography, theme }) => `${theme.typography[typography].lineHeight}px`};
	${({ align }) => `text-align: ${align};`}
	${({ textShadow }) =>
		textShadow &&
		`
		text-shadow: 0px 1px 1px ${textShadow};
  `}
`

export const StyledText = (props: TextProps) => {
	const { typography = 'h3', variant, tx, txOptions, text, children, style: styleOverride, ...rest } = props
	const i18nText = tx && translate(tx, txOptions)
	const content = i18nText || text || children

	return (
		<Text variant={variant} typography={typography} {...rest} style={styleOverride}>
			{content}
		</Text>
	)
}
