import { all, fork } from 'redux-saga/effects'
import postsSaga from './posts/posts.sagas'
import user from './user/sagas'

export function* rootSaga() {
	yield all([fork(postsSaga), fork(user)])
}
