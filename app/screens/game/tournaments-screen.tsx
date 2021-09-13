import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/core'
import dayjs from 'dayjs'
import { ImageBackground, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { TournamentsScreenProps } from '../../@types'
import { GameModel, GameType } from '../../@types/games'
import {
	Text,
	Screen,
	Wallpaper,
	Spacer,
	Container,
	ScreenWrapper,
	Header,
	Card,
	ActivityIndicator,
} from '../../components'
import { RootState } from '../../store'
import { getFreeGames, getPaidGames, setCurrentGame } from '../../store/games/actions'

export const TournamentsScreen = ({ route, navigation }: TournamentsScreenProps) => {
	const { gameType } = route.params
	const dispatch = useDispatch()
	const { games, loading } = useSelector((state: RootState) => state.games)

	useFocusEffect(
		useCallback(() => {
			if (gameType === GameType.BET) {
				dispatch(getPaidGames())
			} else if (gameType === GameType.FREE) {
				dispatch(getFreeGames())
			}
		}, []),
	)

	const navigateToGameDetails = (game: GameModel) => {
		dispatch(setCurrentGame(game))
		navigation.navigate('Game')
	}

	return (
		<ScreenWrapper testID="TournamentsScreen" safeAreaView>
			<Wallpaper />
			<Header leftIcon={'arrow-left2'} onLeftPress={navigation.goBack} headerText={'Tournaments'} />
			<Screen unsafe>
				<Container centerVertical>
					{loading ? (
						<ActivityIndicator />
					) : (
						games.map((game, index) => (
							<TouchableOpacity
								key={game._id}
								style={{ flex: 1, maxHeight: 220, marginBottom: 20 }}
								onPress={() => navigateToGameDetails(game)}>
								<Card
									style={{
										flex: 1,
										minHeight: 120,
										justifyContent: 'center',
										backgroundColor: '#372644',
										shadowColor: 'black',
										alignItems: 'center',
										shadowOffset: { width: 3, height: 8 },
										shadowOpacity: 0.2,
										shadowRadius: 3.84,
										borderRadius: 25,
										elevation: 8,
									}}>
									<ImageBackground
										style={{ flex: 1, width: '100%' }}
										imageStyle={{ borderRadius: 25, opacity: 0.5 }}
										resizeMode="cover"
										source={{
											uri: 'https://www.limelightmagazine.com.au/wp-content/uploads/2019/06/0f14b1b9-australian-chamber-orchestra.jpg',
										}}>
										<Container style={{ justifyContent: 'space-between' }}>
											<View>
												<Spacer space={'smaller'} />
												<Text text={'RANDOM'} typography={'h1'} />
											</View>
											<View style={{ alignItems: 'flex-end' }}>
												<View>
													<Text text={game.status} typography={'h1'} variant={'secondary'} />
													{index > 0 && (
														<Text text={dayjs(game.startDate).format('HH:mm')} typography={'h1'} variant={'white'} />
													)}
												</View>
												<Spacer space={'smaller'} />
											</View>
										</Container>
									</ImageBackground>
								</Card>
							</TouchableOpacity>
						))
					)}
				</Container>
				<Spacer space={'huge'} />
			</Screen>
		</ScreenWrapper>
	)
}
