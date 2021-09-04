import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View, Alert } from 'react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { colors } from '../../theme'
import { Header } from './header'

declare let module

const VIEWSTYLE = {
	flex: 1,
	backgroundColor: colors.backgroundDarkOpacity,
}

storiesOf('Header', module)
	.addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
	.add('Behavior', () => (
		<Story>
			<UseCase noPad text="default" usage="The default usage">
				<View style={VIEWSTYLE}>
					<Header headerText="HOW TO" />
				</View>
			</UseCase>
			<UseCase noPad text="leftIcon" usage="A left nav icon">
				<View style={VIEWSTYLE}>
					<Header headerText="HOW TO" leftIcon="Primary-Left" onLeftPress={() => Alert.alert('left nav')} />
				</View>
			</UseCase>
			<UseCase noPad text="rightIcon" usage="A right nav icon">
				<View style={VIEWSTYLE}>
					<Header headerText="HOW TO" rightIcon="Pathways" onRightPress={() => Alert.alert('right nav')} />
				</View>
			</UseCase>
		</Story>
	))
