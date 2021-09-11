import React from 'react'
import {  View } from 'react-native'
import { useSelector } from 'react-redux'
import { GameType } from '../../@types/games'
import { GameModeScreenProps } from '../../@types/navigation'
import { Button, Icon, Text, Screen, Wallpaper, Spacer, Container, ScreenWrapper, Header, Card } from '../../components'
import { RootState } from '../../store'
import { MimirLogo } from './game-mode-screen.styled'

const logoMimir = require('../../../assets/images/mimir.png')


export const GameModeScreen = ({ route, navigation }: GameModeScreenProps) => {
	const { gameType } = route.params
	const { walletBalance } = useSelector((state: RootState) => state.user)

	return (
		<ScreenWrapper testID="GameMode" safeAreaView>
			<Wallpaper />
			<Header leftIcon={'arrow-left2'} onLeftPress={navigation.goBack} headerText={'Game Modes'} />

			<Screen unsafe>
				<Container centerHorizontal hasFlex={false}>
					<MimirLogo source={logoMimir} />
					<Spacer space={'medium'} />
				</Container>
				<Container centerHorizontal centerVertical>
					<Button
						disabled
						size={'huge'}
						style={{ backgroundColor: '#038298'}}
						text={'1vs1'}
						typography={'h1'}
						onPress={() => navigation.navigate('Tournaments', { gameType })}
					/>
					<Spacer space={'small'} />
					<Button
						style={{ backgroundColor: '#015268'}}
						size={'huge'}
						text={'TOURNAMENTS'}
						typography={'h1'}
						onPress={() => navigation.navigate('Tournaments', { gameType })}
					/>
					<Spacer space={'medium'} />
					<View style={{ flexDirection: 'row'}}>
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
							<Text variant={'black'}  text={walletBalance} typography={'h6'} />
						</Card>
						<Spacer  />

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
							<Spacer  />
							<Text variant={'black'}  text={'Leaderboards'} typography={'h6'} />
						</Card>
					</View>

				</Container>
				<Spacer space={'huge'} />
			</Screen>
		</ScreenWrapper>

	)
}
