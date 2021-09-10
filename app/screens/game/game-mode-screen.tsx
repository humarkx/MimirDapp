import React from 'react'
import { useSelector } from 'react-redux'
import { DashboardScreenProps } from '../../@types/navigation'
import { Button, Icon, Text, Screen, Wallpaper, Spacer, Container, ScreenWrapper, Header, Card } from '../../components'
import { RootState } from '../../store'

export const GameModeScreen = ({ navigation }: DashboardScreenProps) => {
	const { walletBalance } = useSelector((state: RootState) => state.user)

	return (
		<ScreenWrapper testID="GameModeScreen" safeAreaView>
			<Wallpaper />
			<Header leftIcon={'arrow-left2'} onLeftPress={navigation.goBack} headerText={'Game Modes'} />
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
