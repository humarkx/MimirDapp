import React, { useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { TournamentsScreenProps } from '../../@types'
import { GameModel, GameType } from '../../@types/games'
import { Text, Screen, Wallpaper, Spacer, Container, ScreenWrapper, Header, Card } from '../../components'
import { RootState } from '../../store'
import { getFreeGames, getPaidGames, setCurrentGame } from '../../store/games/actions'

export const TournamentsScreen = ({ route, navigation }: TournamentsScreenProps) => {
	const { gameType } = route.params
	const dispatch = useDispatch()
	const { games } = useSelector((state: RootState) => state.games)

	useEffect(() => {
		if (gameType === GameType.BET) {
			dispatch(getPaidGames())
		} else if (gameType === GameType.FREE) {
			dispatch(getFreeGames())
		}
	}, [])

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
					{games.map(game => (
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
									style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}
									imageStyle={{ borderRadius: 25, opacity: 0.5 }}
									resizeMode="cover"
									source={{
										uri: 'https://www.limelightmagazine.com.au/wp-content/uploads/2019/06/0f14b1b9-australian-chamber-orchestra.jpg',
									}}>
									<Text text={'RANDOM'} typography={'h1'} />
								</ImageBackground>
							</Card>
						</TouchableOpacity>
					))}
				</Container>
				<Spacer space={'huge'} />
			</Screen>
		</ScreenWrapper>
	)
}
