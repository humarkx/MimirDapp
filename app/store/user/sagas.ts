import { all, call, put, takeEvery, select } from 'redux-saga/effects'
import { login, register, getUser } from '../../services/auth'
import * as firebase from '../../services/firebase'
import { UserActions, UserActionsTypes, UserLoginPayload, UserPayload, UserRegisterPayload } from './types'

function* LOGIN(action: UserActionsTypes) {
	const { email, password } = action.payload as UserLoginPayload
	try {
		yield call(firebase.login, email.trim(), password)
		yield call(firebase.currentAccount)
		const userData = yield call(login)
		yield put({
			type: UserActions.LOAD_CURRENT_ACCOUNT_SUCCESS.toString(),
			payload: userData,
		})
		// notification.success({
		//   message: 'Logged In',
		//   description: 'You have successfully logged in!',
		// })
	} catch (error) {
		console.log('LOGIN ERROR', error.message, error)
	}
}

function* REGISTER(action: UserActionsTypes) {
	const { email, password, username } = action.payload as UserRegisterPayload
	try {
		yield call(firebase.register, email, password, username)
		const user = yield call(register, email, username)
		const successPayload: UserPayload = {
			...user,
			authorized: true,
			status: 'valid', // false is default value
		}
		yield put({
			type: UserActions.REGISTER_SUCCESS.toString(),
			payload: successPayload,
		})
	} catch (e) {
		console.log('REGISTRATION ERROR', e.message)

		yield put({
			type: UserActions.REGISTER_FAILED.toString(),
			payload: e.message,
		})
	}
}

function* LOAD_CURRENT_ACCOUNT() {
	const { user } = yield select(state => state)
	try {
		if (user.refId) {
			yield call(firebase.currentAccount)
			const userData = yield call(login)
			yield put({
				type: UserActions.LOAD_CURRENT_ACCOUNT_SUCCESS.toString(),
				payload: userData,
			})
		}
	} catch (error) {
		yield put({
			type: UserActions.LOAD_CURRENT_ACCOUNT_FAILED.toString(),
			payload: {
				loading: false,
				error: error.message,
			},
		})
	}
}

function* LOGOUT() {
	yield call(firebase.logout)
	yield put({
		type: UserActions.LOGOUT_SUCCESS.toString(),
	})
}

function* GET_USER() {
	try {
		const userData = yield call(getUser)
		yield put({
			type: UserActions.GET_USER_SUCCESS.toString(),
			payload: userData,
		})
	} catch (error) {
		yield put({
			type: UserActions.GET_USER_FAILED.toString(),
			payload: error,
		})
	}
}

export default function* rootSaga() {
	yield all([
		takeEvery(UserActions.LOGIN, LOGIN),
		takeEvery(UserActions.GET_USER, GET_USER),
		takeEvery(UserActions.REGISTER, REGISTER),
		takeEvery(UserActions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
		takeEvery(UserActions.LOGOUT, LOGOUT),
		LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
	])
}
