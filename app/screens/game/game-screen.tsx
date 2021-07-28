import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { Input } from 'react-native-elements'
import { Button, Text, Screen, Wallpaper, AutoImage as Image, Header, Spacer } from '../../components'
import { color, spacing } from '../../theme'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import AsyncStorage from '@react-native-async-storage/async-storage'

const logoMimir = require('../../../assets/images/mimir_white.png')
const logoMimir2 = require('../../../assets/images/mimir_3.png')
const wallet = require('../../../assets/images/mimir_wallet.png')

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
	backgroundColor: color.transparent,
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
	...BOLD,
	fontSize: 34,
	lineHeight: 38,
	textAlign: 'center',
	marginBottom: spacing.large,
}

const NEXT: TextStyle = {
	fontSize: 28,
	lineHeight: 38,
	textTransform: 'uppercase',
	textAlign: 'center',
	marginBottom: spacing.large,
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

const MIMIR: ImageStyle = {
	marginVertical: 20,
	alignSelf: 'center',
	width: 120,
	height: 100,
}

const INPUT: TextStyle = {
	fontWeight: 'bold',
}

const POT: ViewStyle = {
	flexDirection: 'row',
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
	backgroundColor: color.palette.white,
}

const POT_SMALL: ViewStyle = {
	flexDirection: 'row',
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
	backgroundColor: color.palette.white,
	justifyContent: 'space-around',
	width: '48%'
}
const TEXT: TextStyle = {
	color: color.palette.white,
}
const POT_BALANCE: TextStyle = {
	...TEXT,
	color: color.palette.trueBlack,
	fontSize: 30,
	letterSpacing: 2,
}
const POT_TEXT: TextStyle = {
	...TEXT,
	...BOLD,
	color: color.palette.deepPurple,
	fontSize: 13,
	letterSpacing: 2,
}
const BALANCE_TEXT: TextStyle = {
	...TEXT,
	...BOLD,
	color: color.palette.deepPurple,
	fontSize: 20,
	letterSpacing: 2,
}

export const GameScreen = () => {
	const [balance, setBalance] = useState('')
	const navigation = useNavigation()
	const goBack = () => navigation.goBack()

	useEffect(() => {
		const currentBalance =  AsyncStorage.getItem('balance').then(value => {
			setBalance(value)
		})
	})

	return (
		<View testID="GameScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
				<Header leftIcon="back" onLeftPress={goBack} style={HEADER} titleStyle={HEADER_TITLE} />
				<Image source={logoMimir} style={MIMIR} />
				<Text style={NEXT} preset="default" text="Next game starts at:" />

				<View style={{ justifyContent: 'center', flexDirection: 'row', paddingBottom: 20 }}>
					<AnimatedCircularProgress
						size={150}
						width={10}
						rotation={360}
						backgroundWidth={10}
						fill={75}
						tintColor="#0EF3C5"
						backgroundColor="#fff">
						{fill => <Text style={styles.points}>21:00</Text>}
					</AnimatedCircularProgress>
				</View>

				<Text style={TITLE} preset="header" text="Place bet amount" />
				<Button
					testID="next-screen-button"
					style={[POT, { marginBottom: 20 }]}
					disabled={true}
				>
					<Image source={logoMimir2} style={TOKEN} />
					<Text style={POT_BALANCE} preset="header" text='1,000' />
				</Button>
				<Button style={FREE} textStyle={DEMO_TEXT} text="PLACE BET" onPress={() => navigation.navigate('bet')} />

				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
					<Button testID="next-screen-button" style={POT_SMALL} disabled={true} >
						<Image source={wallet} style={WALLET} />
						<Image source={logoMimir2} style={[TOKEN, {marginRight: 0}]} />
						<Text style={BALANCE_TEXT} preset="header" text={balance} />
					</Button>
					<Button testID="next-screen-button" style={POT_SMALL} textStyle={POT_TEXT} text={"TODAY'S POT"} disabled={true} />
				</View>
			</Screen>
		</View>
	)
}

const styles = StyleSheet.create({
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
	actionLabel: {
		color: '#ffffff',
		fontSize: 20,
		fontWeight: '500',
		marginBottom: 30,
		marginTop: 30,
		textAlign: 'center',
	},
})
