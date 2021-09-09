import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { DashboardScreenProps } from '../../@types/navigation'
import { Button, Icon, Text, Screen, Wallpaper, Spacer, Container, ScreenWrapper, Header, Card } from '../../components'
import socket from '../../services/sockets'
import { RootState } from '../../store'
import { MimirLogo } from '../dashboard/dashboard-screen.styled'

const logoMimir = require('../../../assets/images/mimir.png')

export const GameModeScreen = ({ navigation }: DashboardScreenProps) => {
	const [balance, setBalance] = useState('')

	const { username } = useSelector((state: RootState) => state.user)

	useFocusEffect(() => {
		console.log('CHECKING WALLET BALLANCE')
		// socket.emit('getGames')
		checkWalletBalance()
	})

	useEffect(() => {
		console.log('CHECKING WALLET BALLANCE')
		socket.emit('getGames')
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
			<Header leftIcon={'arrow-left'} onLeftPress={navigation.goBack} headerText={'Game Modes'} />
			<Screen unsafe>
				<Container centerHorizontal centerVertical>
					<Button disabled variant={'secondary'} text={'1 vs 1'} typography={'h2'} onPress={navigation.goBack} />
					<Spacer space={'medium'} />

					<Button
						variant={'secondary'}
						text={'TOURNAMENTS'}
						typography={'h2'}
						onPress={() => navigation.navigate('Tournaments')}
					/>
				</Container>

				<Container>
					<Card
						style={{
							flex: 1,
							minHeight: 120,
							justifyContent: 'center',
							marginLeft: 10,
							backgroundColor: '#372644',
							shadowColor: 'black',
							alignItems: 'center',
							shadowOffset: { width: 3, height: 8 },
							shadowOpacity: 0.2,
							shadowRadius: 3.84,
							borderRadius: 10,
							elevation: 8,
						}}>
						<Icon color={'white'} name={'mimir_wallet'} />
						<Spacer space={'small'} />
						<Text text={balance} typography={'h1'} />
					</Card>
					<Spacer space={'small'} />

					<Card
						style={{
							flex: 1,
							justifyContent: 'center',
							minHeight: 120,
							marginLeft: 10,
							backgroundColor: '#372644',
							shadowColor: 'black',
							alignItems: 'center',
							shadowOffset: { width: 3, height: 8 },
							shadowOpacity: 0.2,
							shadowRadius: 3.84,
							borderRadius: 10,
							elevation: 8,
						}}>
						<Icon color={'white'} name={'mimir_leaderboards'} />
						<Spacer space={'small'} />
						<Text text={'Leaderboards'} typography={'h1'} />
					</Card>
				</Container>
				<Spacer space={'huge'} />
			</Screen>
		</ScreenWrapper>
	)
}
