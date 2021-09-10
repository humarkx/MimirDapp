import { combineReducers } from 'redux'
import postReducer from './posts/posts.reducer'
import authReducer from './user/reducers'
import gamesReducer from './games/reducers'

const rootReducer = combineReducers({
	posts: postReducer,
	user: authReducer,
	games: gamesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
