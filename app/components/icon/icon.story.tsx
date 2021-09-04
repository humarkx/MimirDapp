import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { Icon } from './icon'

declare let module

storiesOf('Icon', module)
	.addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
	.add('Names', () => (
		<Story>
			<UseCase text="Pathways" usage="Pathways icon">
				<Icon name="Pathways" />
			</UseCase>
			<UseCase text="Home" usage="Home icon">
				<Icon name="Home" />
			</UseCase>
		</Story>
	))
