/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { WelcomeScreen, GameScreen, BetScreen, QuestionScreen, FinalScreen } from '../screens'
import { DashboardScreen } from '../screens/dashboard/dashboard-screen'

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
type MainParamList = {
	welcome: undefined
	demo: undefined
	bet: undefined
	question: undefined
	game: undefined
	demoList: undefined
	final: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<MainParamList>()

export function MainNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
			}}>
			<Stack.Screen name="welcome" component={WelcomeScreen} />
			<Stack.Screen name="demo" component={DashboardScreen} />
			<Stack.Screen name="game" component={GameScreen} />
			<Stack.Screen name="bet" component={BetScreen} />
			<Stack.Screen name="question" component={QuestionScreen} />
			<Stack.Screen name="final" component={FinalScreen} />
		</Stack.Navigator>
	)
}
