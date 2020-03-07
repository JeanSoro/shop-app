import { takeLatest, call, put, all } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'

export function* fetchCollectionsAsync() {

  try {
    //pull in collections array from firebase DB
    const collectionRef = firestore.collection('collections');
    //resolved promise using yield unlike async/await
    const snapshot = yield collectionRef.get();
    //call is effect that invoke method/function. takes some function, second argument is param passed into function
    //deffer control back to saga middleware
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

    //saga effect for creating/dispatching actions is PUT
    yield put(fetchCollectionsSuccess(collectionsMap))

  } catch (error) {
    yield put(fetchCollectionsFailure(error.message))
  }

}

export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}


export function* shopSagas() {
  yield all([call(fetchCollectionsStart)])
}
