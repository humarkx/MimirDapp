import { combineReducers } from 'redux'
import postReducer from './posts/posts.reducer'
import authReducer from './user/reducers'

const rootReducer = combineReducers({
	posts: postReducer,
	user: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
