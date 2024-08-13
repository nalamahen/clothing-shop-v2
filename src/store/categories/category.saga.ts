import { all, call, put, takeLatest } from "typed-redux-saga/macro";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase";
import {
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
} from "./category.action";

export function* fetchCategoriesAsync() {
  try {
    const categories = yield* call(getCategoriesAndDocuments, "categories");
    yield* put(fetchCategoriesSuccess(categories));
  } catch (error) {
    yield* put(fetchCategoriesFailure(error as Error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
