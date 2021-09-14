import { CompositeNavigationProp, CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

export type MainParamList = {
	welcome: undefined
	Dashboard: undefined
	GameLobby: undefined
	question: undefined
	Game: undefined
	GameMode: { gameType: string }
	Tournaments: { gameType: string }
	demoList: undefined
	Final: undefined
}

export type RootParamList = {
	initStack: undefined
	BoardingStack: undefined
	MainStack: NavigatorScreenParams<MainParamList>
	authStack: undefined
}

export type WelcomeScreenProps = StackScreenProps<MainParamList, 'welcome'>
export type DashboardScreenProps = StackScreenProps<MainParamList, 'Dashboard'>
export type GameModeScreenProps = StackScreenProps<MainParamList, 'GameMode'>
export type TournamentsScreenProps = StackScreenProps<MainParamList, 'Tournaments'>
export type GameScreenProps = StackScreenProps<MainParamList, 'Game'>
export type GameLobbyScreenProps = StackScreenProps<MainParamList, 'GameLobby'>
export type FinalScreenProps = StackScreenProps<MainParamList, 'Final'>
