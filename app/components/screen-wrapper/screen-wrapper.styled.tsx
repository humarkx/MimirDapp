import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { ScreenWrapperProps } from './screen-wrapper.props'

const ScreenWrapper = styled.View<ScreenWrapperProps>`
	background-color: ${({ backgroundColor, theme }) => backgroundColor ?? theme.colors.background};
	flex: 1;
`

const SafeAreaScreenView = styled(SafeAreaView)<ScreenWrapperProps>`
	background-color: ${({ backgroundColor, theme }) => backgroundColor ?? backgroundColor ?? theme.colors.background};
	flex: 1;
`

export const StyledScreenWrapper = (props: ScreenWrapperProps) => {
	const { safeAreaView, edges, ...rest } = props
	if (safeAreaView) return <SafeAreaScreenView edges={edges} {...rest} />
	return <ScreenWrapper {...rest} />
}
