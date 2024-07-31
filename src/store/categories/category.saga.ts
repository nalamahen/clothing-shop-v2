import { all, call, put, takeLatest } from "redux-saga/effects";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase";
import {
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
} from "./category.action";

export function* fetchCategoriesAsync(): Generator<any, void, any> {
  try {
    const categories = yield call(getCategoriesAndDocuments, "categories");
    yield put(fetchCategoriesSuccess(categories));
  } catch (error: Error | any) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
