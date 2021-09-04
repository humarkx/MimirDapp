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
import { MainNavigator, AuthNavigator } from './index'
import { useTheme } from 'styled-components'
import { navigationRef } from './navigation-utilities'
import { RootParamList } from '../@types/navigation'

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
	const { colors } = useTheme()
	const onAuthStateChanged = async user => {
		if (!user) {
			socket.io.opts.query = { token: '' }
		} else {
			await user.getIdToken().then(token => {
				socket.io.opts.query = { token: token ?? '' }
			})
		}
		let res = socket.connect()
		console.log('connect res', user)
		console.log('connect res', socket.connected)
		console.log('connect res', res.connected)

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
				cardStyle: { backgroundColor: colors.palette.deepPurple },
				headerShown: false,
			}}>
			{initializing && <Stack.Screen name="initStack" component={Initializing} />}
			{!initializing && user && (
				<Stack.Screen
					name="MainStack"
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

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const RootNavigator = (props: NavigationProps) => {
	const { colors, dark } = useTheme()

	const theme = {
		dark,
		colors: {
			primary: colors.palette.white,
			background: colors.palette.white,
			card: colors.palette.white,
			text: colors.palette.white,
			border: colors.palette.white,
			notification: colors.palette.white,
		},
	}

	return (
		<NavigationContainer ref={navigationRef} theme={theme} {...props}>
			<RootStack />
		</NavigationContainer>
	)
}
RootNavigator.displayName = 'RootNavigator'

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ['MainStack']
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
