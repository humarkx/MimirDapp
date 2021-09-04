import * as React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { Spacer } from '../spacer/spacer'
import { Button } from './button'

declare let module

const noop = () => undefined

storiesOf('Button', module)
	.addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
	.add(
		'Buttons',
		() => (
			<Story>
				<UseCase text="Primary" usage="Primary Button">
					<Button type={'solid'} text={'solid'} onPress={noop} disabled={boolean('Disabled', false)} />
				</UseCase>
				<UseCase text="Subtle" usage="Secondary Button">
					<Button type={'outline'} text={'outline'} onPress={noop} disabled={boolean('Disabled', false)} />
				</UseCase>
				<UseCase text="Clear" usage="Link Button">
					<Button type={'clear'} text={'clear'} onPress={noop} disabled={boolean('Disabled', false)} />
				</UseCase>
			</Story>
		),
		{
			notes: '',
		},
	)
	.add(
		'Buttons with Icon',
		() => (
			<Story>
				<UseCase text="Button Icon" usage="Coloured Button Icon">
					<Button icon={'Home'} disabled={boolean('Disabled', false)} />
				</UseCase>
				<UseCase text="Monochromatic Button Icon" usage="Mono Icon Button">
					<Button icon={'Home'} variant={'mono'} disabled={boolean('Disabled', false)} />
				</UseCase>
			</Story>
		),
		{
			notes: '',
		},
	)
	.add(
		'Button Sizes',
		() => (
			<Story>
				<UseCase text="Button Sizes" usage="General buttons with different sizes">
					<Button type={'solid'} text={'small'} size={'small'} onPress={noop} disabled={boolean('Disabled', false)} />
					<Spacer />
					<Button type={'solid'} text={'medium'} size={'medium'} onPress={noop} disabled={boolean('Disabled', false)} />
					<Spacer />
					<Button type={'solid'} text={'large'} size={'large'} onPress={noop} disabled={boolean('Disabled', false)} />
				</UseCase>
				<UseCase text="Button Icon Sizes" usage="Button Icon Sizes">
					<Button icon={'Home'} size={'small'} disabled={boolean('Disabled', false)} />
					<Spacer />
					<Button icon={'Home'} size={'medium'} disabled={boolean('Disabled', false)} />
					<Spacer />
					<Button icon={'Home'} size={'large'} disabled={boolean('Disabled', false)} />
				</UseCase>
			</Story>
		),
		{
			notes: '',
		},
	)
