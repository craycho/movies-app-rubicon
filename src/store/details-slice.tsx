import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Series, Movie, Details } from "../util/type-definitions";

const initialState: Details = {
  name: "",
  backdrop: "",
  overview: "",
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setCurrentDetails(state: Details, action: PayloadAction<Series | Movie>) {
      if ("name" in action.payload) {
        return {
          name: action.payload.name,
          backdrop: action.payload.backdrop_path,
          overview: action.payload.overview,
        };
      } else {
        return {
          name: action.payload.title,
          backdrop: action.payload.backdrop_path,
          overview: action.payload.overview,
        };
      }
    },
  },
});

export const detailsActions = detailsSlice.actions;
export default detailsSlice.reducer;
