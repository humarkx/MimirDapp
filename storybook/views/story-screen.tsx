import * as React from 'react'
import { ViewStyle, KeyboardAvoidingView, Platform } from 'react-native'
import { lightTheme } from '../../app/theme/theme'

const ROOT: ViewStyle = { backgroundColor: lightTheme.colors.background, flex: 1 }

export interface StoryScreenProps {
  children?: React.ReactNode
}

const behavior = Platform.OS === 'ios' ? 'padding' : undefined
export const StoryScreen = props => (
	<KeyboardAvoidingView style={ROOT} behavior={behavior} keyboardVerticalOffset={50}>
		{props.children}
	</KeyboardAvoidingView>
)
