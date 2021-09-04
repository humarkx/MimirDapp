import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../storybook/views'
import { Text } from './text'

declare let module

storiesOf('Typography', module)
	.addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
	.add('default', () => (
		<Story>
			<UseCase text="default" usage="Used for normal body text.">
				<Text>
					Tahini drizzle cozy cinnamon oatmeal cookies golden cayenne pepper banh mi salad rolls shallots winter spiced
					pumpkin chili almond milk crunchy crispy cashew enchiladas scotch bonnet pepper hemp seeds. A delicious meal
					soup earl grey latte bento box ginger carrot spiced juice red grapes mocha chocolate Italian pepperoncini
					coconut rice quinoa flatbread blueberry chia seed jam cocoa lavender lemonade udon noodles second course lemon
					lime minty avocado peanut butter crunch apples salty four-layer cool. Raspberry fizz macadamia nut cookies
					cumin fruit smash hummus falafel bowl cool cucumbers sweet potato artichoke hearts kale caesar salad Chinese
					five-spice powder Thai strawberry mango smoothie blueberry pops mediterranean cherry bomb pepper sweet potato
					black bean burrito tomato and basil red lentil curry.
				</Text>
			</UseCase>
		</Story>
	))
	.add('Title', () => (
		<Story>
			<UseCase text="Title" usage="Used for Title text.">
				<Text>This is my Title</Text>
			</UseCase>
		</Story>
	))
