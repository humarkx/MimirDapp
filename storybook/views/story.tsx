import * as React from 'react'
import { ScrollView, View, ViewStyle } from 'react-native'
import { lightTheme } from '../../app/theme/theme'

export interface StoryProps {
  children?: React.ReactNode
}

const ROOT: ViewStyle = { backgroundColor: lightTheme.colors.background, flex: 1 }

export function Story(props: StoryProps) {
	return (
		<View style={ROOT}>
			<ScrollView keyboardShouldPersistTaps="handled">{props.children}</ScrollView>
		</View>
	)
}
