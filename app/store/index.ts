import AsyncStorage from '@react-native-async-storage/async-storage'
import { compose, applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import { rootSaga } from './sagas'

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	stateReconciler: autoMergeLevel2,
}

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

// if (process.env.NODE_ENV === 'development') {
// 	const { logger } = require('redux-logger')
//
// 	middlewares.push(logger)
// }

const enhancer = compose(applyMiddleware(...middlewares))
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, enhancer)
const persistor = persistStore(store)

export { store, persistor }

sagaMiddleware.run(rootSaga)
