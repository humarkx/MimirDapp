import { combineReducers } from 'redux'
import gamesReducer from './games/reducers'
import postReducer from './posts/posts.reducer'
import authReducer from './user/reducers'

const rootReducer = combineReducers({
	posts: postReducer,
	user: authReducer,
	games: gamesReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
