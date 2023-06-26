import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { useSelector } from "react-redux/es/exports";
import CharacterCard from "../Shared/CharacterCard";

import useLoacalStorage from "../../services/useLoacalStorage";
import { CharacterResultsProp } from "../../redux/charactersSlice";
import { fetchCharactersAsync } from "../../redux/charactersSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useCallback, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";

import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import Loader from "../Shared/Loader";
import NavBtn from "../Shared/NavBtn";
import { updateState } from "../../redux/charactersSlice";

const Characters = () => {
  const [charactersLS, setCharactersLS] = useLoacalStorage("characters");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();


  const characters = useSelector<any, CharacterResultsProp[] | []>(
    (state) => state.characters.data.results
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.characters.loading
  );

  // can be number or null if there is no more characters left after fetching
  const count = useSelector<RootState, number | null>(
    (state) => state.characters.data.info.count
  );


  const inputState = useSelector<RootState, string>(
    (state) => state.inputState.data
  );


  useEffect(() => {
    dispatch(updateState({ info: { pages: 0, count: 0 }, results: [] }));
    dispatch(fetchCharactersAsync({ page: 1, name: inputState }));
  }, []);

  useEffect(() => {
    if (page > 1) {
      dispatch(fetchCharactersAsync({ page: page, name: inputState }));
      console.log(page);
    }
  }, [page, inputState]);

  const observer: React.MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver | null>(null);

  const lastCharacter = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && count !== null) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current?.observe(node);
    },
    [loading, count, inputState]
  );

  const characterCheckedHandler = (character: CharacterResultsProp) => {
    setCharactersLS((prevState: CharacterResultsProp[] | []) => {
      const characterExist = prevState.some((item) => item.id === character.id);
      if (characterExist) {
        return prevState;
      } else {
        return [...prevState, character];
      }
    });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: "24px",
        pt:'100px',
        textAlign: "center",
        background:'linear-gradient(0deg, rgba(82,82,82,1) 76%, rgba(255,255,255,1) 100%, rgba(255,255,255,0.05646008403361347) 100%)'
      }}
    >
      <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {characters &&
          characters.map((character: CharacterResultsProp, index: number) => {
            if (index === characters.length - 1) {
              return (
                <Grid item key={character.id} xs={4} ref={lastCharacter}>
                  <CharacterCard character={character}>
                    <>
                      <Checkbox
                        icon={<FavoriteBorder />}
                        name={character.id}
                        onClick={() => {
                          characterCheckedHandler(character);
                        }}
                        checkedIcon={<Favorite sx={{ color: "red" }} />}
                      />
                      <Typography sx={{mb:"15px"}}># {character.id}</Typography>
                    </>
                  </CharacterCard>
                </Grid>
              );
            } else {
              return (
                <Grid item key={character.id} xs={4}>
                  <CharacterCard character={character}>
                    <>
                      <Checkbox
                        icon={<FavoriteBorder />}
                        name={character.id}
                        onClick={() => {
                          characterCheckedHandler(character);
                        }}
                        checkedIcon={<Favorite sx={{ color: "red" }} />}
                      />
                      <Typography sx={{mb:"15px"}}># {character.id}</Typography>
                    </>
                  </CharacterCard>
                </Grid>
              );
            }
          })}
      </Grid>
      <NavBtn />
      {loading && <Loader />}
    </Box>
  );
};
export default Characters;
