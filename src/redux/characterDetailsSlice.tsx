import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterResultsProp } from "./charactersSlice";

type CharDetailsInitialStateProp = {
  data: CharacterResultsProp|[]
}

const initialState: CharDetailsInitialStateProp = {
  data:[]
};


export const characterDetailsSlice = createSlice({
  name: "characterDetails",
  initialState,
  reducers: {
    updateCharacterDetailsState: (state, action: PayloadAction<CharacterResultsProp>) => {
      state.data = action.payload;
    },
  },
});

export const { updateCharacterDetailsState } = characterDetailsSlice.actions;

export default characterDetailsSlice.reducer;


