import { all, call, fork } from 'redux-saga/effects'
import games from './games/sagas'
import postsSaga from './posts/posts.sagas'
import user from './user/sagas'
import { rehydration } from './index'

export function* rootSaga() {
	yield all([yield call(rehydration), user(), games(), postsSaga()])
}
