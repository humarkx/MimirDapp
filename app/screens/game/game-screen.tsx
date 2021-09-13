import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { ImageStyle, TextStyle, View, ViewStyle } from 'react-native'
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

const logoMimir2 = require('../../../assets/images/mimir_3.png')
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

const HEADER_TITLE: TextStyle = {
	...BOLD,
	fontSize: 12,
	lineHeight: 15,
	textAlign: 'center',
	letterSpacing: 1.5,
}

const TOKEN: ImageStyle = {
	alignSelf: 'center',
	width: 18,
	height: 26,
	marginRight: 10,
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
							<Text typography={'h1'} variant={'white'} text={currentGame.prize} />
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
			</Screen>
		</View>
	)
}
