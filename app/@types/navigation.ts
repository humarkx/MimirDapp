import { CompositeNavigationProp, CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

export type MainParamList = {
	welcome: undefined
	Dashboard: undefined
	bet: { gameId: string }
	question: undefined
	game: { gameId: string }
	GameMode: { gameType: string }
	Tournaments: { gameType: string }
	demoList: undefined
	final: undefined
}

export type RootParamList = {
	initStack: undefined
	BoardingStack: undefined
	MainStack: NavigatorScreenParams<MainParamList>
	authStack: undefined
}

export type WelcomeScreenProps = StackScreenProps<MainParamList, 'welcome'>
export type DashboardScreenProps = StackScreenProps<MainParamList, 'Dashboard'>
