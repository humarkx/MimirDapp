import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

export type MainParamList = {
	welcome: undefined
	demo: undefined
	bet: undefined
	question: undefined
	game: undefined
	demoList: undefined
	final: undefined
}

export type RootParamList = {
	initStack: undefined
	mainStack: NavigatorScreenParams<MainParamList>
	authStack: undefined
}

export type WelcomeScreenProps = StackScreenProps<MainParamList, 'welcome'>
