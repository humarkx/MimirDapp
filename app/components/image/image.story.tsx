/* eslint-disable */
import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { Image } from './image'

declare let module

const bowser = require('../../screens/welcome/bowser.png')
const morty = { uri: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg' }

storiesOf('AutoImage', module)
	.addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
	.add('Style Presets', () => (
		<Story>
			<UseCase text="With require()">
				<Image source={bowser} />
				<Image source={bowser} style={{ width: 150 }} />
				<Image source={bowser} style={{ width: 150, height: 150 }} />
				<Image source={bowser} style={{ height: 150 }} />
				<Image source={bowser} style={{ height: 150, resizeMode: 'contain' }} />
			</UseCase>
			<UseCase text="With URL">
				<Image source={morty} />
				<Image source={morty} style={{ width: 150 }} />
				<Image source={morty} style={{ width: 150, height: 150 }} />
				<Image source={morty} style={{ height: 150 }} />
				<Image source={morty} style={{ height: 150, resizeMode: 'contain' }} />
			</UseCase>
		</Story>
	))
