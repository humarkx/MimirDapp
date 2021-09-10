import React from 'react'
import { Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { DashboardScreenProps } from '../../@types/navigation'
import { Button, Icon, Text, Screen, Wallpaper, Spacer, Container, ScreenWrapper, Header, Card } from '../../components'
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
			<Header
				leftIcon={'switch'}
				rightIcon={'cog'}
				onLeftPress={logOut}
				onRightPress={() => Alert.alert('Profile to be implemented soon')}
			/>
			<Screen unsafe>
				<Container centerHorizontal>
					<MimirLogo source={logoMimir} />
					<Spacer space={'medium'} />
					<Text variant={'white'} typography={'h1'} text={username} />
				</Container>
				<Container centerHorizontal centerVertical>
					<Button
						variant={'secondary'}
						text={'FREE TO PLAY'}
						typography={'h2'}
						onPress={() => navigation.navigate('GameMode')}
					/>
				</Container>
				<Container>
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
						<Icon color={'white'} name={'mimir_wallet'} />
						<Spacer space={'small'} />
						<Text text={walletBalance} typography={'h1'} />
					</Card>
					<Spacer space={'small'} />

					<Card
						style={{
							flex: 1,
							justifyContent: 'center',
							minHeight: 120,
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
