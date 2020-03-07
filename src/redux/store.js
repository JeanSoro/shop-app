//-step 1
import { createStore, applyMiddleware } from 'redux';
//-step 2
import logger from 'redux-logger';
//-step 3
import rootReducer from './root-reducer';

import createSagaMiddleware from 'redux-saga';

import { persistStore } from 'redux-persist';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware()

//-step 4
const middlewares = [sagaMiddleware, logger];

//-step 5
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga)


export const persistor = persistStore(store);

export default { store, persistor };

