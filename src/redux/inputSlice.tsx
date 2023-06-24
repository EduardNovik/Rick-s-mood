import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type inputStateProp = {
  data: string;
};

const initialState: inputStateProp = {
  data: ''
};


export const inputSlice = createSlice({
  name: "inputState",
  initialState,
  reducers: {
    updateInputState: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
  },
});

export const { updateInputState } = inputSlice.actions;

export default inputSlice.reducer;


