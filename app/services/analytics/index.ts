import { AMPLITUDE_API_KEY } from '@env'
import firebaseAnalytics from '@react-native-firebase/analytics'
import amplitude from 'amplitude-js'

export const addAnalyticsEvent = async (eventName, value = {}) => {
	const eventData = {
		loggedIn: true,
		...value,
	}
	await amplitude.getInstance().logEvent(eventName, eventData)
	await firebaseAnalytics().logEvent(eventName, eventData)
}

export const addAnalyticsUserId = async userId => {
	await amplitude.getInstance().setUserId(userId)
	await firebaseAnalytics().setUserId(userId)
}

export const clearAnalyticsUserId = async () => {
	await amplitude.getInstance().setUserId(null)
	await amplitude.getInstance().regenerateDeviceId()
	await firebaseAnalytics().setUserId(null)
}

amplitude.getInstance().init(AMPLITUDE_API_KEY)
export const Amplitude = amplitude.getInstance()
