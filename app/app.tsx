/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import './i18n'
import './utils/ignore-warnings'
import React, { useState, useEffect } from 'react'
import AppLoading from 'expo-app-loading'
import { useColorScheme } from 'react-native'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { ThemeProvider } from 'styled-components'
import { ToggleStorybook } from '../storybook/toggle-storybook'
import { useBackButtonHandler, RootNavigator, canExit, useNavigationPersistence } from './navigators'
import { Environment } from './services/reactotron/environment'
import { store, persistor } from './store'
import { initFonts } from './theme/fonts' // expo
import { lightTheme, darkTheme } from './theme/theme'
import * as storage from './utils/storage'

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'

/**
 * This is the root component of our app.
 */
function App() {
	const [appIsReady, setAppIsReady] = useState(false)
	const scheme = useColorScheme()
	useBackButtonHandler(canExit)
	const {
		initialNavigationState,
		onNavigationStateChange,
		isRestored: isNavigationStateRestored,
	} = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

	// Kick off initial async loading actions, like loading fonts and RootStore
	useEffect(() => {
		async function prepare() {
			try {
				const env = new Environment()
				await env.setup()
				await initFonts() // expo
			} catch (e) {
				console.warn(e)
			}
		}

		prepare().then(() => setAppIsReady(true))
	}, [])

	// Before we show the app, we have to wait for our state to be ready.
	// In the meantime, don't render anything. This will be the background
	// color set in native by rootView's background color. You can replace
	// with your own loading component if you wish.
	if (!appIsReady || !isNavigationStateRestored) {
		return <AppLoading />
	}
	// otherwise, we're ready to render the app
	return (
		<Provider store={store}>
			<PersistGate loading={false} persistor={persistor}>
				<ThemeProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
					<ToggleStorybook>
						<SafeAreaProvider initialMetrics={initialWindowMetrics}>
							<RootNavigator initialState={initialNavigationState} onStateChange={onNavigationStateChange} />
						</SafeAreaProvider>
					</ToggleStorybook>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	)
}

export default App

// import React, { useEffect, useState, useRef } from 'react'
// import { HARDHAT_PORT, HARDHAT_PRIVATE_KEY } from '@env'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import auth from '@react-native-firebase/auth'
// /**
//  * Welcome to the main entry point of the app. In this file, we'll
//  * be kicking off our app.
//  *
//  * Most of this file is boilerplate and you shouldn't need to modify
//  * it very often. But take some time to look through and understand
//  * what is going on here.
//  *
//  * The app navigation resides in ./app/navigators, so head over there
//  * if you're interested in adding screens and navigators.
//  */
// import './i18n'
// import './utils/ignore-warnings'
// import React, { useState, useEffect, useRef } from 'react'
// import { NavigationContainerRef } from '@react-navigation/native'
// import { useWalletConnect, withWalletConnect } from '@walletconnect/react-native-dapp'
// import { Button, Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// import localhost from 'react-native-localhost'
// import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'
// import Web3 from 'web3'
// import { expo } from '../app.json'
// import Mimir from '../artifacts/contracts/MimirToken.sol/MimirToken.json'
// import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
// import { enableScreens } from 'react-native-screens'
// import { ToggleStorybook } from '../storybook/toggle-storybook'
// import { RootStore, RootStoreProvider, setupRootStore } from './models'
// import { useBackButtonHandler, RootNavigator, canExit, setRootNavigation, useNavigationPersistence } from './navigators'
// import { initFonts } from './theme/fonts'
// import { initFonts } from './theme/fonts' // expo
// import * as storage from './utils/storage'
//
// const styles = StyleSheet.create({
// 	center: { alignItems: 'center', justifyContent: 'center' },
// 	// eslint-disable-next-line react-native/no-color-literals
// 	white: { backgroundColor: 'white' },
// })
// // This puts screens in a native ViewController or Activity. If you want fully native
// // stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// // https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
//
// const shouldDeployContract = async (web3, abi, data, from: string) => {
// 	const deployment = new web3.eth.Contract(abi).deploy({ data })
// 	const gas = await deployment.estimateGas()
// 	const {
// 		options: { address: contractAddress },
// 	} = await deployment.send({ from, gas })
// 	return new web3.eth.Contract(abi, contractAddress)
// }
// enableScreens()
//
// export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'
//
// /**
//  * This is the root component of our app.
//  */
// function App() {
// 	const navigationRef = useRef<NavigationContainerRef>(null)
// 	const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
// 	const [initializing, setInitializing] = useState(true)
// 	const [user, setUser] = useState()
// 	const [token, setToken] = useState()
//
// 	setRootNavigation(navigationRef)
// 	useBackButtonHandler(navigationRef, canExit)
// 	const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
// 		storage,
// 		NAVIGATION_PERSISTENCE_KEY,
// 	)
//
// 	const connector = useWalletConnect()
// 	const [message, setMessage] = React.useState<string>('Loading...')
// 	const web3 = React.useMemo(
// 		() => new Web3(new Web3.providers.HttpProvider(`http://${localhost}:${HARDHAT_PORT}`)),
// 		[HARDHAT_PORT],
// 	)
//
// 	// Kick off initial async loading actions, like loading fonts and RootStore
// 	useEffect(() => {
// 		;(async () => {
// 			await initFonts() // expo
// 			setupRootStore().then(setRootStore)
// 		})()
// 	}, [])
//
// 	function onAuthStateChanged(user) {
// 		setUser(user)
// 		if (initializing) setInitializing(false)
// 	}
//
// 	useEffect(() => {
// 		const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
// 		return subscriber // unsubscribe on unmount
// 	}, [])
//
// 	useEffect(() => {
// 		;(async () => {
// 			const { address } = await web3.eth.accounts.privateKeyToAccount(HARDHAT_PRIVATE_KEY)
// 			const contract = await shouldDeployContract(web3, Mimir.abi, Mimir.bytecode, address)
// 			setMessage(await contract.methods.sayHello('React Native').call())
// 		})()
// 	}, [web3, shouldDeployContract, setMessage, HARDHAT_PRIVATE_KEY])
// 	const connectWallet = React.useCallback(() => {
// 		return connector.connect()
// 	}, [connector])
// 	const signTransaction = React.useCallback(async () => {
// 		try {
// 			await connector.signTransaction({
// 				data: '0x',
// 				from: '0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3',
// 				gas: '0x9c40',
// 				gasPrice: '0x02540be400',
// 				nonce: '0x0114',
// 				to: '0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359',
// 				value: '0x00',
// 			})
// 		} catch (e) {
// 			console.error(e)
// 		}
// 	}, [connector])
// 	const killSession = React.useCallback(() => {
// 		return connector.killSession()
// 	}, [connector])
//
// 	const signOut = async () => {
// 		await auth()
// 			.signOut()
// 			.then(() => {
// 				// Sign-out successful.
// 			})
// 			.catch(error => {
// 				// An error happened.
// 			})
// 	}
// 	// Before we show the app, we have to wait for our state to be ready.
// 	// In the meantime, don't render anything. This will be the background
// 	// color set in native by rootView's background color. You can replace
// 	// with your own loading component if you wish.
// 	if (!rootStore) return null
//
// 	const signIn = async () => {
// 		await auth()
// 			.signInWithEmailAndPassword('all@hugomarques.pt', 'asdasdasd')
// 			.then(async userCredential => {
// 				const token = await auth().currentUser.getIdTokenResult()
// 				setToken(token)
// 				console.log(userCredential.user)
// 			})
// 			.catch(error => {
// 				console.log(error.code)
// 				console.log(error.message)
// 			})
// 	}
//
// 	if (!rootStore)
// 		return (
// 			<View>
// 				<Text>No Store</Text>
// 			</View>
// 		)
//
// 	// return (
// 	//     <ToggleStorybook>
// 	//       <RootStoreProvider value={rootStore}>
// 	//         <SafeAreaProvider initialMetrics={initialWindowMetrics}>
// 	//           <RootNavigator
// 	//               ref={navigationRef}
// 	//               initialState={initialNavigationState}
// 	//               onStateChange={onNavigationStateChange}
// 	//           />
// 	//         </SafeAreaProvider>
// 	//       </RootStoreProvider>
// 	//     </ToggleStorybook>
// 	// )
//
// 	// otherwise, we're ready to render the app
// 	return (
// 		<View style={[StyleSheet.absoluteFill, styles.center, styles.white]}>
// 			<Text testID="tid-message">{message}</Text>
//
// 			{user && (
// 				<View>
// 					<Text>{user.email}</Text>
// 					<Text>{token?.token}</Text>
// 					<TouchableOpacity onPress={signOut}>
// 						<Text>Logout</Text>
// 					</TouchableOpacity>
// 				</View>
// 			)}
// 			{!user && (
// 				<View>
// 					<TouchableOpacity onPress={signIn}>
// 						<Text>Login</Text>
// 					</TouchableOpacity>
// 				</View>
// 			)}
//
// 			{!connector.connected && <Button title={'Connect a Wallet'} onPress={connectWallet} />}
// 			{!!connector.connected && (
// 				<>
// 					<Button title={'Sign a Transaction'} onPress={signTransaction} />
// 					<Button title={'Kill Session'} onPress={killSession} />
// 				</>
// 			)}
// 		</View>
// 	<ToggleStorybook>
// 		<RootStoreProvider value={rootStore}>
// 			<SafeAreaProvider initialMetrics={initialWindowMetrics}>
// 				<RootNavigator
// 					ref={navigationRef}
// 					initialState={initialNavigationState}
// 					onStateChange={onNavigationStateChange}
// 				/>
// 			</SafeAreaProvider>
// 		</RootStoreProvider>
// 	</ToggleStorybook>
// )
// }
//
// const { scheme } = expo
//
// // const renderWallets = (props) => {
// //   return props.walletServices.filter((w) => w.name === 'MetaMask')
// // }
// export default withWalletConnect(App, {
// 	// bridge: "http://0.0.0.0:5555",
// 	bridge: 'https://polygon.bridge.walletconnect.org',
// 	clientMeta: {
// 		description: 'Connect with Mimir',
// 		icons: ['https://i.ibb.co/qCsBCX9/mimir-color.png'],
// 		name: 'Mimir',
// 		url: 'https://mimir.gg',
// 	},
// 	redirectUrl: Platform.OS === 'web' ? window.location.origin : `${scheme}://`,
// 	// renderQrcodeModal: (props) => QrcodeModal({...props, division: 1,  walletServices: renderWallets(props)}),
// 	storageOptions: {
// 		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 		// @ts-ignore
// 		asyncStorage: AsyncStorage,
// 	},
// })
// export default App
