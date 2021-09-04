import React from 'react'
import styled from 'styled-components/native'
import { translate } from '../../i18n'
import { Button } from '../button/button'
import { Text } from '../text/text'
import { HeaderProps } from './header.props'

const HeaderWrapper = styled.View<HeaderProps>`
	align-items: center;
	flex-direction: row;
	justify-content: flex-start;
	padding-bottom: ${({ theme }) => `${theme.spacing.large}px`};
	padding-horizontal: ${({ theme }) => `${theme.spacing.large}px`};
	padding-top: ${({ theme }) => `${theme.spacing.large}px`};
	${({ isAbsolute }) =>
		isAbsolute &&
		`
		z-index: 20;
  `}
`

const Title = styled(Text)`
	max-width: 80%;
	text-align: center;
	text-transform: uppercase;
`

const TitleWrapper = styled.View`
	flex-direction: row;
	flex: 1;
	justify-content: center;
`

const SideContent = styled.View`
	width: 32px;
`

export const StyledHeader = (props: HeaderProps) => {
	const { onLeftPress, leftIcon, headerText, headerTx, rightIcon, onRightPress, isAbsolute } = props
	const header = headerText || (headerTx && translate(headerTx)) || ''
	return (
		<HeaderWrapper isAbsolute={isAbsolute}>
			{leftIcon ? (
				<Button onPress={onLeftPress} variant={'mono'} size={'small'} icon={leftIcon} iconSize={'small'} />
			) : (
				<SideContent />
			)}
			<TitleWrapper>
				<Title typography={'h4'} text={header} numberOfLines={1} />
			</TitleWrapper>
			{rightIcon ? (
				<Button onPress={onRightPress} variant={'mono'} size={'small'} icon={rightIcon} iconSize={'small'} />
			) : (
				<SideContent />
			)}
		</HeaderWrapper>
	)
}
