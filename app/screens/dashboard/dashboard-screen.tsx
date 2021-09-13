import React from 'react'
import { Alert, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { GameType } from '../../@types/games'
import { DashboardScreenProps } from '../../@types/navigation'
import {
	Button,
	Icon,
	Text,
	Screen,
	Wallpaper,
	Spacer,
	Container,
	ScreenWrapper,
	Header,
	Card,
	CountdownTimer,
} from '../../components'
import { RootState } from '../../store'
import { MimirLogo } from './dashboard-screen.styled'

const logoMimir = require('../../../assets/images/mimir.png')

export const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
	const { username, walletBalance } = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()

	const logOut = () => {
		dispatch({
			type: 'LOGOUT',
		})
	}

	return (
		<ScreenWrapper testID="DashboardScreen" safeAreaView>
			<Wallpaper />
			{/*TODO REMOVE THIS BUTTON*/}
			{/*<Button*/}
			{/*	variant={'secondary'}*/}
			{/*	size={'huge'}*/}
			{/*	text={'PLAY TO WIN'}*/}
			{/*	typography={'h1'}*/}
			{/*	onPress={() => navigation.navigate('final')}*/}
			{/*/>*/}
			<Header
				leftIcon={'switch'}
				rightIcon={'cog'}
				onLeftPress={logOut}
				onRightPress={() => Alert.alert('Profile to be implemented soon')}
			/>
			<Screen unsafe>
				<Container centerHorizontal hasFlex={false}>
					<MimirLogo source={logoMimir} />
					<Spacer space={'medium'} />
					<Text variant={'white'} typography={'h1'} text={username} />
				</Container>
				<Container centerHorizontal centerVertical>
					<Button
						size={'huge'}
						variant={'primary'}
						text={'FREE PLAY'}
						typography={'h1'}
						onPress={() => navigation.navigate('GameMode', { gameType: GameType.FREE })}
					/>
					<Spacer space={'small'} />
					<Button
						variant={'secondary'}
						size={'huge'}
						text={'PLAY TO WIN'}
						typography={'h1'}
						onPress={() => navigation.navigate('GameMode', { gameType: GameType.BET })}
					/>
					<Spacer space={'medium'} />
					<View style={{ flexDirection: 'row' }}>
						<Card
							style={{
								flexDirection: 'row',
								flex: 1,
								width: '100%',
								justifyContent: 'center',
								backgroundColor: '#fff',
								shadowColor: 'black',
								alignItems: 'center',
								shadowOffset: { width: 3, height: 5 },
								shadowOpacity: 0.2,
								shadowRadius: 3.84,
								borderRadius: 10,
								elevation: 5,
							}}>
							<Icon color={'black'} name={'mimir_wallet'} />
							<Spacer />
							<Text variant={'black'} text={walletBalance} typography={'h6'} />
						</Card>
						<Spacer />

						<Card
							style={{
								flexDirection: 'row',
								flex: 1,
								width: '100%',
								justifyContent: 'center',
								backgroundColor: '#fff',
								shadowColor: 'black',
								alignItems: 'center',
								shadowOffset: { width: 3, height: 8 },
								shadowOpacity: 0.2,
								shadowRadius: 3.84,
								borderRadius: 10,
								elevation: 8,
							}}>
							<Icon color={'black'} name={'mimir_leaderboards'} />
							<Spacer />
							<Text variant={'black'} text={'Leaderboards'} typography={'h6'} />
						</Card>
					</View>
				</Container>
				<Spacer space={'huge'} />
			</Screen>
		</ScreenWrapper>
	)
}
