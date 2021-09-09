import React from 'react'
import { Spinner } from 'native-base'
import { rgba } from 'polished'
import { useTheme } from 'styled-components'
import styled from 'styled-components/native'
import { Icon } from '../icon/icon'
import { Text } from '../text/text'
import { ButtonProps } from './button.props'

const getTextColorVariant = (type, variant) => {
	const useWhiteWhen = ['solid']
	return useWhiteWhen.includes(type) ? 'white' : variant
}

const getColorVariant = (theme, variant, opacity) => {
	const buttonColorVariant = {
		dark: theme.colors.background,
		default: theme.colors.secondary,
		faded: theme.colors.transparent.faded,
		ghost: theme.colors.transparent.transparent,
		mono: theme.colors.transparent.black,
		primary: theme.colors.primary,
		secondary: theme.colors.secondary,
		success: theme.colors.primary,
		warning: theme.colors.error,
	}
	const colorVariant = buttonColorVariant[variant] || theme.colors.primary

	return rgba(colorVariant, opacity)
}

const getButtonSize = (size, icon) => {
	switch (size) {
		case 'small':
			return `
        height: 38px;
        ${icon ? 'width: 38px;' : ''}
        border-radius: 38px;
        padding-horizontal: 6px;
				`
		case 'medium':
			return `
        height: 40px;
        ${icon ? 'width: 40px;' : ''}
        border-radius: 40px;
         padding-horizontal: 8px;
      `
		case 'large':
			return `
        height: 58px;
				${icon ? 'width: 58px;' : ''}
        border-radius: 58px;
        padding-horizontal: 16px;
      `
		case 'default':
		default:
			return `
        height: 58px;
        ${icon ? 'width: 58px;' : ''}
        border-radius: 58px;
				padding-horizontal: 12px;
      `
	}
}

const Button = styled.TouchableOpacity<ButtonProps>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: ${({ fitContent }) => (fitContent ? 'auto' : '100%')};
	${({ size, icon }) => getButtonSize(size, icon)};
	background: ${({ type, theme, variant, opacity }) =>
		type === 'clear' || type === 'outline'
			? 'transparent'
			: variant === 'mono'
			? theme.colors.palette.gray
			: getColorVariant(theme, variant, opacity)};
	${({ theme, type, variant, disabled, opacity }) =>
		type === 'outline' &&
		`border: 1px solid ${
			disabled ? theme.colors.palette.branding['grey-200'] : getColorVariant(theme, variant, opacity)
		};`};

	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

export const StyledButton = (props: ButtonProps) => {
	const theme = useTheme()
	const {
		loading,
		children,
		icon,
		iconSize,
		disabled,
		tx,
		text,
		typography,
		textVariant,
		textStyle: textStyleOverride,
		style: styleOverride,
		variant = 'primary',
		type = 'solid',
		opacity = 1,
		...rest
	} = props
	const content = loading ? (
		<Spinner size="small" color={'white'} />
	) : (
		children || (
			<>
				{icon ? (
					<Icon
						name={icon}
						size={iconSize || 'small'}
						color={
							['outline', 'clear'].includes(type)
								? getColorVariant(theme, variant, opacity)
								: variant === 'mono'
								? '#000'
								: '#fff'
						}
					/>
				) : (
					<Text
						tx={tx}
						text={text}
						typography={typography}
						style={textStyleOverride}
						variant={disabled ? 'faded' : textVariant || getTextColorVariant(type, variant)}
					/>
				)}
			</>
		)
	)

	return (
		<Button
			variant={variant}
			type={type}
			style={styleOverride}
			opacity={opacity}
			disabled={disabled}
			icon={icon}
			{...rest}>
			{content}
		</Button>
	)
}
