import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type characterDetailsProp = {
  data: Record<string, any>;
};

const initialState: characterDetailsProp = {
  data: {}
};


export const characterDetailsSlice = createSlice({
  name: "characterDetails",
  initialState,
  reducers: {
    updateCharacterDetailsState: (state, action: PayloadAction<Record<string, any>>) => {
      state.data = action.payload;
    },
  },
});

export const { updateCharacterDetailsState } = characterDetailsSlice.actions;

export default characterDetailsSlice.reducer;


