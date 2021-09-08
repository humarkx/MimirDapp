import * as React from 'react'
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StatusBar,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'styled-components'
import { offsets, presets } from './screen.presets'
import { ScreenProps } from './screen.props'

const isIos = Platform.OS === 'ios'

function ScreenWithoutScrolling(props: ScreenProps) {
	const { dark } = useTheme()
	const insets = useSafeAreaInsets()
	const preset = presets.fixed
	const style = props.style || {}
	const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
	const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<KeyboardAvoidingView
				style={[preset.outer, backgroundStyle]}
				behavior={isIos ? 'padding' : undefined}
				keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
				<StatusBar
					backgroundColor={props.backgroundColor ?? preset.outer.backgroundColor}
					barStyle={props.statusBar || (dark ? 'light-content' : 'dark-content')}
				/>
				<View style={[preset.inner, style, insetStyle]}>{props.children}</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
}

function ScreenWithScrolling(props: ScreenProps) {
	const { dark } = useTheme()
	const insets = useSafeAreaInsets()
	const preset = presets.scroll
	const style = props.style || {}
	const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
	const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

	return (
		<KeyboardAvoidingView
			style={[preset.outer, backgroundStyle]}
			behavior={isIos ? 'padding' : undefined}
			keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
			<StatusBar
				backgroundColor={props.backgroundColor ?? preset.outer.backgroundColor}
				barStyle={props.statusBar || (dark ? 'light-content' : 'dark-content')}
			/>
			<View style={[preset.outer, backgroundStyle, insetStyle]}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					ref={props.scrollRef}
					style={[preset.outer, backgroundStyle]}
					contentContainerStyle={[preset.inner, style]}
					keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || 'handled'}>
					{props.children}
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
	)
}

const ScreenWithKeyboardScroll = (props: ScreenProps) => {
	const { dark } = useTheme()
	const insets = useSafeAreaInsets()
	const preset = presets.fixed
	const style = props.style || {}
	const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
	const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

	return (
		<KeyboardAwareScrollView scrollEnabled={false} contentContainerStyle={[preset.outer, backgroundStyle]}>
			<StatusBar
				backgroundColor={props.backgroundColor ?? preset.outer.backgroundColor}
				barStyle={props.statusBar || (dark ? 'light-content' : 'dark-content')}
			/>
			<View style={[preset.inner, style, insetStyle]}>{props.children}</View>
		</KeyboardAwareScrollView>
	)
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export const Screen = (props: ScreenProps) => {
	switch (props.preset) {
		case 'scroll':
			return <ScreenWithScrolling {...props} />
		case 'keyboardScroll':
			return <ScreenWithKeyboardScroll {...props} />
		case 'fixed':
		default:
			return <ScreenWithoutScrolling {...props} />
	}
}
