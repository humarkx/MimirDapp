import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { Spacer } from './spacer'

declare let module

storiesOf('Spacing', module)
	.addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)

	.add('Spacer', () => (
		<Story>
			<UseCase text="Space" usage="Used to give space for the component bellow.">
				<Spacer space={'larger'} />
			</UseCase>
		</Story>
	))
