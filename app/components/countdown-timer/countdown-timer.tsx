import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text } from '../text/text'
import { getRemainingTimeUntilMsTimestamp } from './countdown-timer-utils'

const defaultRemainingTime = {
	seconds: '00',
	minutes: '00',
	hours: '00',
	days: '00',
}

export const CountdownTimer = ({ countdownTimestampMs }) => {
	const [remainingTime, setRemainingTime] = useState(defaultRemainingTime)

	useEffect(() => {
		const intervalId = setInterval(() => {
			updateRemainingTime(countdownTimestampMs)
		}, 1000)
		return () => clearInterval(intervalId)
	}, [countdownTimestampMs])

	function updateRemainingTime(countdown) {
		setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown))
	}

	return (
		<View style={{ flexDirection: 'row' }}>
			<Text>{remainingTime.hours}:</Text>
			<Text>{remainingTime.minutes}:</Text>

			<Text>{remainingTime.seconds}</Text>
		</View>
	)
}
