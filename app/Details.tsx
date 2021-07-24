import * as React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	text: {
		marginTop: 20,
		color: 'white',
		fontSize: 60,
		fontWeight: 'bold',
	},
})
const DetailScreen = ({ navigation }: any) => (
	<React.Fragment>
		<View style={styles.container}>
			<SharedElement id="image" style={StyleSheet.absoluteFill}>
				<Image style={styles.image} resizeMode="cover" source={require('../assets/images/cartoon.webp')} />
			</SharedElement>
			<SharedElement id="text">
				<Text style={styles.text}>The Boys</Text>
			</SharedElement>
		</View>
	</React.Fragment>
)
DetailScreen.navigationOptions = {
	title: 'Boys will be boys',
}
DetailScreen.sharedElements = (route: any, otherRoute: any, showing: any) => [
	{ id: 'image', animation: 'move' },
	{ id: 'text', animation: 'fade' },
]
export default DetailScreen
