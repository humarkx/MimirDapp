import * as React from 'react'
import { TextStyle, View } from 'react-native'
import { useTheme } from 'styled-components'
import { Icons } from '../../theme/icons'
import { IconProps } from './icon.props'

const getSize = size => {
	if (typeof size === 'number') {
		return { fontSize: size }
	}
	switch (size) {
		case 'xs':
			return { fontSize: 16 }
		case 'small':
			return { fontSize: 20 }
		case 'medium':
			return { fontSize: 24 }
		case 'large':
			return { fontSize: 32 }
		case 'xl':
			return { fontSize: 48 }
		default:
			return { fontSize: 24 }
	}
}

export const Icon = (props: IconProps) => {
	const { colors } = useTheme()
	const { style, name, color = colors.secondary, size, containerStyle } = props
	const iconStyle: TextStyle = {
		color,
		...getSize(size),
	}

	return (
		<View style={containerStyle}>
			<Icons name={name} style={[style as unknown, iconStyle]} />
		</View>
	)
}
