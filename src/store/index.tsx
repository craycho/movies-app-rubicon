import { configureStore } from "@reduxjs/toolkit";

import resultsReducer from "./results-slice";
import detailsReducer from "./details-slice";

const store = configureStore({
  reducer: {
    results: resultsReducer,
    currentDetails: detailsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
