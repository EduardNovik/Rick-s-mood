import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type CharacterResultsProp = {
  id: string;
  image: string;
  location: { dimension: string; name: string };
  name: string;
};

export type CharactersDataProp = {
  info: { pages: number };
  results: CharacterResultsProp[];
};

type CharactersStateProp = {
  data: CharactersDataProp;
  loading: boolean;
};

const initialState: CharactersStateProp = {
  data: { info: { pages: 0 }, results: [] },
  loading: false,
};

type InputSearchProp = {
  page: number;
  name: string;
};
const endpoint = "https://rickandmortyapi.com/graphql";

const headers = { "content-type": "application/json" };

const graphqlQuery = ({ page, name }: InputSearchProp) => {
  return {
    query: `query allCharacters ($page:Int, $filter:FilterCharacter){
              characters(page:$page, filter:$filter){
                info{pages}
                results {
                    id
                    name
                    image
                    location {
                    name
                    dimension
                    }
                }
            }
        }`,
    variables: { page: page, filter: { name: name } },
  };
};

export const fetchCharactersAsync = createAsyncThunk(
  "characters/fetchCharacters",
  async (
    { page, name }: InputSearchProp,
    { rejectWithValue }
  ): Promise<CharactersDataProp | []> => {
    try {
      const response = await axios({
        url: endpoint,
        method: "post",
        headers: headers,
        data: graphqlQuery({ page, name }),
      });
      return response.data.data.characters;
    } catch (error: any) {
      const errorMessage: string =
        error.response.data.message || "Unknown error";
      rejectWithValue(errorMessage);
      return [];
    }
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<CharactersDataProp>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCharactersAsync.fulfilled,
    (state, action: PayloadAction<CharactersDataProp | []>) => {
      state.loading = false;
      if (Array.isArray(action.payload)) {
        state.data = [...state.data, ...action.payload];
      } else {
        state.data = {
          info: action.payload.info,
          results: [...state.data.results, ...action.payload.results],
        };
      }
    }
    );
    builder.addCase(
      fetchCharactersAsync.rejected,
      (state, action: PayloadAction<any>) => {
        console.log(action.payload);
      }
    );
    builder.addCase(fetchCharactersAsync.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { updateState } = charactersSlice.actions;

export default charactersSlice.reducer;
