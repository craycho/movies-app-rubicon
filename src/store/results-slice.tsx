import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Series, Movie } from "../util/type-definitions";

type ResultsType = (Series | Movie)[];

const initialState: ResultsType = [];

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResults(
      state: ResultsType = initialState,
      action: PayloadAction<ResultsType>
    ) {
      const currentResults = action.payload;
      return currentResults;
    },
  },
});

export const resultsActions = resultsSlice.actions;
export default resultsSlice.reducer;
