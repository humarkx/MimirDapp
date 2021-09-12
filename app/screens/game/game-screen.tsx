import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { useSelector } from 'react-redux'
import { GameScreenProps } from '../../@types'
import { GameType } from '../../@types/games'
import {
	ActivityIndicator,
	Button,
	Container,
	Header,
	Icon,
	Image,
	Screen,
	Spacer,
	Text,
	Wallpaper,
} from '../../components'
import { RootState } from '../../store'
import { colors, spacing } from '../../theme'

const logoMimir1 = require('../../../assets/images/mimir.png')
const logoMimir2 = require('../../../assets/images/mimir_3.png')
const wallet = require('../../../assets/images/mimir_wallet.png')
const logoMimir = require('../../../assets/images/mimir_white.png')

const FULL: ViewStyle = { flex: 1, backgroundColor: colors.backgroundOpacity }
const CONTAINER: ViewStyle = {
	paddingHorizontal: spacing.medium,
}

const FREE: ViewStyle = {
	borderRadius: 50,
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
	backgroundColor: '#78305F',
}

const BOLD: TextStyle = { fontWeight: 'bold' }
const DEMO_TEXT: TextStyle = {
	...BOLD,
	fontSize: 13,
	letterSpacing: 2,
}
const HEADER: TextStyle = {
	paddingTop: spacing.medium,
	paddingBottom: spacing.large,
	paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
	...BOLD,
	fontSize: 12,
	lineHeight: 15,
	textAlign: 'center',
	letterSpacing: 1.5,
}
const TITLE: TextStyle = {
	fontSize: 24,
	lineHeight: 38,
	textAlign: 'center',
	marginBottom: spacing.medium,
}

const NEXT: TextStyle = {
	fontSize: 22,
	lineHeight: 38,
	textTransform: 'uppercase',
	textAlign: 'center',
	marginVertical: spacing.large,
}

const WALLET: ImageStyle = {
	alignSelf: 'center',
	width: 30,
	height: 30,
	marginVertical: 0,
}

const TOKEN: ImageStyle = {
	alignSelf: 'center',
	width: 18,
	height: 26,
	marginRight: 10,
}

const TOKEN_SMALL: ImageStyle = {
	...TOKEN,
	width: 16,
	height: 22,
}

const MIMIR: ImageStyle = {
	alignSelf: 'center',
	width: 120,
	height: 100,
}

const POT: ViewStyle = {
	flexDirection: 'row',
	paddingVertical: spacing.tiny,
	backgroundColor: colors.palette.white,
}

const TEXT: TextStyle = {
	color: colors.palette.white,
}
const POT_BALANCE: TextStyle = {
	...TEXT,
	color: colors.palette.trueBlack,
	fontSize: 30,
	letterSpacing: 2,
}
const POT_TEXT: TextStyle = {
	...TEXT,
	fontSize: 24,
	textTransform: 'uppercase',
}
const BALANCE_TEXT: TextStyle = {
	...TEXT,
	...BOLD,
	color: colors.palette.deepPurple,
	fontSize: 20,
	letterSpacing: 2,
}

export const GameScreen = ({ navigation }: GameScreenProps) => {
	const goBack = () => navigation.goBack()
	const { currentGame } = useSelector((state: RootState) => state.games)
	const [isPaid, setIsPaid] = useState<boolean>(false)

	if (!currentGame) return <ActivityIndicator />

	useEffect(() => {
		if (currentGame) setIsPaid(currentGame.type === GameType.BET)
	}, [currentGame._id])
	return (
		<View testID="GameScreen" style={FULL}>
			<Wallpaper
				style={{ opacity: 0.5 }}
				backgroundImage={{
					uri: 'http://qqpublic.qpic.cn/qq_public/0/0-2382486706-3DA4DFAAE33D3163D5EAED99A3A29C05/900?fmt=jpg&size=273&h=1950&w=900&ppv=1',
				}}
			/>
			<Screen style={CONTAINER} preset="scroll">
				<Header leftIcon={'arrow-left2'} onLeftPress={goBack} titleStyle={HEADER_TITLE} />
				<Image source={logoMimir} style={MIMIR} />
				<Spacer space={'medium'} />
				<Container>
					<Text
						typography={'h3'}
						text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
					/>
				</Container>
				{isPaid && (
					<Container>
						<Spacer space={'medium'} />
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<View>
								<Text typography={'h2'} variant={'secondary'} text={'START TIME'} />
								<Text typography={'h1'} variant={'white'} text={dayjs(currentGame.startDate).format('HH:mm')} />
							</View>
							<View style={{ justifyContent: 'flex-start' }}>
								<Text typography={'h2'} variant={'secondary'} text={'MIN. ENTRY FEE'} />
								<View style={{ flexDirection: 'row' }}>
									<Icon name={'mimir_currency'} color={'white'} />
									<Spacer />
									<Text typography={'h1'} variant={'white'} text={currentGame.fee} />
								</View>
							</View>
						</View>
						<Spacer />
						<View>
							<Text typography={'h2'} variant={'secondary'} text={'QUIZ POT'} />
							<Text typography={'h1'} variant={'white'} text={dayjs(currentGame.startDate).format('HH:mm')} />
						</View>
						<Spacer space={'medium'} />
						<Button testID="next-screen-button" style={[POT, { marginBottom: 20 }]}>
							<Image source={logoMimir2} style={TOKEN} />
							<Text style={POT_BALANCE} text="1,000" />
						</Button>
					</Container>
				)}
				<Container centerVertical>
					{!isPaid && <Spacer space={'huge'} />}
					<Button
						style={FREE}
						textStyle={DEMO_TEXT}
						text={isPaid ? 'PLAY TO WIN' : 'FREE PLAY'}
						onPress={() => navigation.navigate('GameLobby')}
					/>
				</Container>
				{/*<View style={{ justifyContent: 'center', flexDirection: 'row', paddingBottom: 20 }}>*/}
				{/*	<AnimatedCircularProgress*/}
				{/*		size={150}*/}
				{/*		width={10}*/}
				{/*		rotation={360}*/}
				{/*		backgroundWidth={10}*/}
				{/*		fill={75}*/}
				{/*		tintColor="#0EF3C5"*/}
				{/*		backgroundColor="#fff">*/}
				{/*		{fill => <Text style={styles.points}>21:00</Text>}*/}
				{/*	</AnimatedCircularProgress>*/}
				{/*</View>*/}
				{/*<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, marginBottom: 20 }}>*/}
				{/*	<Text style={POT_TEXT} text="Today’s pot:" />*/}
				{/*	<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>*/}
				{/*		<Image source={logoMimir1} style={TOKEN_SMALL} />*/}
				{/*		<Text style={POT_TEXT} text="59 327" />*/}
				{/*	</View>*/}
				{/*</View>*/}

				{/*<Text style={TITLE} text="Play money" />*/}
			</Screen>
		</View>
	)
}

const styles = StyleSheet.create({
	actionLabel: {
		color: '#ffffff',
		fontSize: 20,
		fontWeight: '500',
		marginBottom: 30,
		marginTop: 30,
		textAlign: 'center',
	},
	container: {
		alignItems: 'center',
		backgroundColor: '#152d44',
		flex: 1,
		justifyContent: 'space-between',
		padding: 50,
	},
	points: {
		color: '#ffffff',
		fontSize: 25,
		fontWeight: '500',
		letterSpacing: 1.5,
		textAlign: 'center',
	},
	pointsDelta: {
		color: '#4c6479',
		fontSize: 50,
		fontWeight: '100',
	},
	pointsDeltaActive: {
		color: '#fff',
	},
})
