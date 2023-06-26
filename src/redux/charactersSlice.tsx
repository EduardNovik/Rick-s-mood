import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type CharacterResultsProp = {
  id: string;
  name: string;
  staus: string;
  species: string;
  gender: string;
  image: string;
  location: { dimension: string; type: string; name: string };
  episode: Array<{id:string, episode: string, name: string}>
};

export type CharactersDataProp = {
  info: { pages: number; count: number | null };
  results: CharacterResultsProp[];
};

type CharactersStateProp = {
  data: CharactersDataProp;
  loading: boolean;
};

type InputSearchProp = {
  page: number;
  name: string;
};

const initialState: CharactersStateProp = {
  data: { info: { pages: 0, count: null }, results: [] },
  loading: false,
};

const endpoint = "https://rickandmortyapi.com/graphql";

const headers = { "content-type": "application/json" };

const graphqlQuery = ({ page, name }: InputSearchProp) => {
  return {
    query: `query allCharacters ($page:Int, $filter:FilterCharacter){
              characters(page:$page, filter:$filter){
                info{pages, count}
                results {
                    id
                    name
                    status
                    species
                    image
                    gender
                    location {
                    name
                    type
                    dimension
                    }
                    episode{
                      id
                      name
                      episode
                    }
                }
            }
        }`,
    variables: { page: page, filter: { name: name } },
  };
};

export const fetchCharactersAsync = createAsyncThunk<
  CharactersDataProp,
  InputSearchProp,
  { rejectValue: string }
>("characters/fetchCharacters", async ({ page, name }, { rejectWithValue }) => {
  try {
    const response = await axios({
      url: endpoint,
      method: "post",
      headers: headers,
      data: graphqlQuery({ page, name }),
    });
    // console.log(response.data.data);
    return response.data.data.characters;
  } catch (error: any) {
    const errorMessage: string = error.response.data.message || "Unknown error";
    return rejectWithValue(errorMessage);
  }
});

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<CharactersDataProp>) => {
      state.data = action.payload;
    },
    updateLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCharactersAsync.fulfilled,
      (state, action: PayloadAction<CharactersDataProp>) => {
        state.loading = false;
        state.data = {
          info: action.payload.info,
          results: [...state.data.results, ...action.payload.results],
        };
      }
    );
    builder.addCase(
      fetchCharactersAsync.rejected,
      (state, action: PayloadAction<any>) => {
        console.log(action.payload, state);
      }
    );
    builder.addCase(fetchCharactersAsync.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { updateState, updateLoadingState } = charactersSlice.actions;

export default charactersSlice.reducer;
