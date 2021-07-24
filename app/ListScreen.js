import * as React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import TouchableScale from "react-native-touchable-scale";
const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 40,
	},
	caption: {
		fontSize: 20,
		opacity: 0.5,
	},
	image: {
		width: 200,
		height: 160,
		resizeMode: "contain",
	},
});

const ListScreen= ({ modal, navigation }: any) => {
	const onPress = () => {
		navigation.navigate("Detail");
	};
	const onPressModal = () => {
		navigation.navigate("Modal");
	};
	return (
		<React.Fragment>
			<TouchableScale
				style={styles.flex}
				activeScale={0.9}
				tension={50}
				friction={7}
				useNativeDriver
				onPress={modal ? onPressModal : onPress}
			>
				<View style={styles.container}>
					<SharedElement id="image">
						<Image style={styles.image} source={require("../assets/images/mimir_white.png")} />
					</SharedElement>
					<SharedElement id="text">
						<Text style={styles.text}>The Boys</Text>
					</SharedElement>
					<Text style={styles.caption}>tap me</Text>
				</View>
			</TouchableScale>
		</React.Fragment>
	);
};
export default ListScreen;
