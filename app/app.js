import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { enableScreens } from "react-native-screens";
import ListScreen from "./ListScreen";
import DetailScreen from "./Details";
enableScreens();

type SharedStackParams = {
	List: undefined;
};
const Stack = createSharedElementStackNavigator();
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="List"
					options={{ title: "Boltskills" }}
					component={ListScreen}
				/>
				<Stack.Screen name="Detail" component={DetailScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
