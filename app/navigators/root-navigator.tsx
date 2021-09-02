/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your MainNavigator) which the user
 * will use once logged in.
 */
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
import { ActivityIndicator } from '../components'
import socket from '../services/sockets'
import { color } from '../theme'
import { MainNavigator, AuthNavigator } from './index'

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RootParamList = {
	initStack: undefined
	mainStack: undefined
	authStack: undefined
}

const Stack = createStackNavigator<RootParamList>()

const Initializing = () => {
	return (
		// eslint-disable-next-line react-native/no-inline-styles
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator />
		</View>
	)
}

const RootStack = () => {
	const [initializing, setInitializing] = useState(true)
	const [user, setUser] = useState()

	const onAuthStateChanged = async user => {
		if (!user) {
			socket.io.opts.query = { token: '' }
		} else {
			await user.getIdToken().then(token => {
				socket.io.opts.query = { token: token ?? '' }
			})
		}
		let res = socket.connect()
		console.log("connect res", user)
		console.log("connect res", socket.connected)
		console.log("connect res", res.connected)

		// socket.on("connect_error", (error) => {
		// 	console.error(error, error.message)
		// });
		// if we don't have a user, its set to null and redirected to AuthStack
		// else we enter the app
		setUser(user)
		if (initializing) setInitializing(false)
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
		return subscriber // unsubscribe on unmount
	}, [])

	const Initializing = () => {
		return (
			// eslint-disable-next-line react-native/no-inline-styles
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator />
			</View>
		)
	}

	return (
		<Stack.Navigator
			screenOptions={{
				cardStyle: { backgroundColor: color.palette.deepPurple },
				headerShown: false,
			}}>
			{initializing && <Stack.Screen name="initStack" component={Initializing} />}
			{!initializing && user && (
				<Stack.Screen
					name="mainStack"
					component={MainNavigator}
					options={{
						headerShown: false,
					}}
				/>
			)}
			{!initializing && !user && (
				<Stack.Screen
					name="authStack"
					component={AuthNavigator}
					options={{
						headerShown: false,
					}}
				/>
			)}
		</Stack.Navigator>
	)
}

export const RootNavigator = React.forwardRef<
	NavigationContainerRef,
	Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
	return (
		<NavigationContainer {...props} ref={ref}>
			<RootStack />
		</NavigationContainer>
	)
})

RootNavigator.displayName = 'RootNavigator'
