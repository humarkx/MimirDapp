import { all, fork } from 'redux-saga/effects'
import postsSaga from './posts/posts.sagas'
import auth from './user/sagas'

export function* rootSaga() {
	yield all([fork(postsSaga), fork(auth)])
}
