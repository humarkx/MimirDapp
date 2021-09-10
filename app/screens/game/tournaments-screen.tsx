import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { DashboardScreenProps } from '../../@types/navigation'
import { Button, Icon, Text, Screen, Wallpaper, Spacer, Container, ScreenWrapper, Header, Card } from '../../components'
import socket from '../../services/sockets'
import { RootState } from '../../store'
import { getFreeGames } from '../../store/games/actions'
import { MimirLogo } from '../dashboard/dashboard-screen.styled'

const logoMimir = require('../../../assets/images/mimir.png')

export const TournamentsScreen = ({ navigation }: DashboardScreenProps) => {
	const dispatch = useDispatch()
	const [balance, setBalance] = useState('')

	const { username } = useSelector((state: RootState) => state.user)
	const { freeGames } = useSelector((state: RootState) => state.games)

	useFocusEffect(() => {
		console.log('CHECKING WALLET BALLANCE')
		// socket.emit('getGames')
		checkWalletBalance()
	})

	useEffect(() => {
		dispatch(getFreeGames())
	}, [])

	const checkWalletBalance = async () => {
		try {
			const currentBalance = await AsyncStorage.getItem('balance')
			if (!currentBalance) {
				await AsyncStorage.setItem('balance', '3570')
				setBalance('3570')
			} else {
				setBalance(currentBalance)
			}
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<ScreenWrapper testID="GameModeScreen" safeAreaView>
			<Wallpaper />
			<Header leftIcon={'arrow-left2'} onLeftPress={navigation.goBack} headerText={'Tournaments'} />
			<Screen unsafe>
				<Container>
					{freeGames.map(game => (
						<TouchableOpacity
							key={game._id}
							style={{ flex: 1, maxHeight: 220 }}
							onPress={() => navigation.navigate('game', { gameId: game.refId })}>
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
									borderRadius: 10,
									elevation: 8,
								}}>
								<Text text={'CLASSICAL MUSIC'} typography={'h1'} />
							</Card>
						</TouchableOpacity>
					))}
				</Container>
				<Spacer space={'huge'} />
			</Screen>
		</ScreenWrapper>
	)
}
