import React, { useEffect } from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { initFonts } from '../app/theme/fonts'
import { ThemeDecorator } from './theme-decorator'
import './rn-addons'

declare let module
addDecorator(ThemeDecorator)
addDecorator(withKnobs)

configure(() => {
	require('./storybook-registry')
}, module)

const StorybookUI = getStorybookUI({
	port: 9001,
	host: 'localhost',
	onDeviceUI: true,
	asyncStorage: require('@react-native-async-storage/async-storage').default || null,
})

export function StorybookUIRoot() {
	useEffect(() => {
		async function prepare() {
			try {
				await initFonts()
			} catch (e) {
				console.warn(e)
			}
		}

		prepare()
	}, [])

	const style = { flex: 1 }

	return (
		<SafeAreaView style={style}>
			<StorybookUI />
		</SafeAreaView>
	)
}
