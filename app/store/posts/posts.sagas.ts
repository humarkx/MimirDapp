import axios from 'axios'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { fetchPostsFailure, fetchPostsSuccess } from './posts.actions'
import { postTypes, Post } from './posts.types'

const getPosts = () => axios.get<Post[]>('https://jsonplaceholder.typicode.com/todos')

function* fetchPostsSaga() {
	try {
		const response = yield call(getPosts)
		yield put(
			fetchPostsSuccess({
				posts: response.data,
			}),
		)
	} catch (e) {
		yield put(
			fetchPostsFailure({
				error: e.message,
			}),
		)
	}
}

function* postsSaga() {
	yield all([takeLatest(postTypes.FETCH_POST_REQUEST, fetchPostsSaga)])
}

export default postsSaga
