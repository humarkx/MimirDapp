import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { compose, applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import { rootSaga } from './sagas'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

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
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middlewares)))
const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

const Provider = ({ children }) => {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={false} persistor={persistor}>
				{children}
			</PersistGate>
		</ReduxProvider>
	)
}

export { Provider, store, persistor }

sagaMiddleware.run(rootSaga)
