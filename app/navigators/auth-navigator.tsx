import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, SignUpScreen, RecoverScreen } from '../screens'

type AuthParamList = {
	Login: undefined
	SignUp: undefined
	Recover: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<AuthParamList>()

export function AuthNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyle: { backgroundColor: 'transparent' },
				headerShown: false,
			}}>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="SignUp" component={SignUpScreen} />
			<Stack.Screen name="Recover" component={RecoverScreen} />
		</Stack.Navigator>
	)
}
